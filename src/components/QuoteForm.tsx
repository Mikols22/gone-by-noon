"use client";

import { useState, type FormEvent } from "react";
import { site, telHref } from "@/site";

const MAX_PHOTOS = 5;
const MAX_EDGE = 1600; // px — photos are shrunk in the browser so uploads stay small and fast

async function shrinkImage(file: File): Promise<Blob> {
  if (!file.type.startsWith("image/")) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return await new Promise<Blob>((resolve) =>
      canvas.toBlob((b) => resolve(b ?? file), "image/jpeg", 0.8),
    );
  } catch {
    return file; // e.g. a HEIC the browser can't decode — send it as-is
  }
}

type Status = "idle" | "sending" | "sent" | "error";

export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const raw = new FormData(form);
    const data = new FormData();
    for (const key of ["name", "phone", "town", "details", "company"]) {
      data.set(key, String(raw.get(key) ?? ""));
    }
    const photos = raw.getAll("photos").filter((p): p is File => p instanceof File && p.size > 0);
    for (const [i, photo] of photos.slice(0, MAX_PHOTOS).entries()) {
      data.append("photos", await shrinkImage(photo), `photo-${i + 1}.jpg`);
    }
    try {
      const res = await fetch("/api/quote", { method: "POST", body: data });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="quote-done" role="status">
        <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="30" fill="#2BD46A" />
          <path d="M20 33l8 8 16-18" stroke="#1C1F24" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2>Got it!</h2>
        <p>
          Thanks. We&apos;ll text you a quote shortly. Need it faster? Call{" "}
          <a href={telHref}>{site.phoneDisplay}</a>.
        </p>
        <button type="button" className="link-button" onClick={() => setStatus("idle")}>
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={onSubmit}>
      <div>
        <h2>Get a free quote</h2>
        <p className="muted">Snap a photo, tell us what&apos;s going. We&apos;ll reply with a price.</p>
      </div>
      <label>
        Your name
        <input name="name" type="text" autoComplete="name" required maxLength={100} />
      </label>
      <div className="field-row">
        <label>
          Mobile number
          <input name="phone" type="tel" autoComplete="tel" required maxLength={30} />
        </label>
        <label>
          Town
          <input name="town" type="text" placeholder="e.g. Doylestown" maxLength={60} />
        </label>
      </div>
      <label>
        What needs to go?
        <textarea name="details" rows={3} placeholder="Old couch, fridge, garage full of boxes…" maxLength={2000} />
      </label>
      <label>
        Add photos (optional, up to {MAX_PHOTOS})
        <input name="photos" type="file" accept="image/*" multiple className="file-input" />
      </label>
      {/* Honeypot: hidden from people, bots fill it in */}
      <input name="company" type="text" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <button type="submit" className="btn btn-dark" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send my quote request"}
      </button>
      {status === "error" && (
        <p className="form-error" role="alert">
          {error} You can also call or text {site.phoneDisplay}.
        </p>
      )}
      <p className="fine">No spam. We only use your number to send your quote.</p>
    </form>
  );
}

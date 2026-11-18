import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;

function clean(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "We couldn't read that request." }, { status: 400 });
  }

  // Honeypot — quietly accept and drop bot submissions.
  if (clean(form.get("company"), 100)) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(form.get("name"), 100),
    phone: clean(form.get("phone"), 30),
    town: clean(form.get("town"), 60),
    details: clean(form.get("details"), 2000),
  };
  if (!lead.name || lead.phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Please add your name and a valid phone number." }, { status: 400 });
  }

  // Photos → Vercel Blob (only when a Blob store is connected to the project).
  const photoUrls: string[] = [];
  const photos = form.getAll("photos").filter((p): p is File => p instanceof File && p.size > 0);
  if (photos.length && process.env.BLOB_READ_WRITE_TOKEN) {
    const stamp = new Date().toISOString().slice(0, 10);
    for (const photo of photos.slice(0, MAX_PHOTOS)) {
      if (photo.size > MAX_PHOTO_BYTES || !photo.type.startsWith("image/")) continue;
      const blob = await put(`quotes/${stamp}/${photo.name}`, photo, {
        access: "public",
        addRandomSuffix: true,
        contentType: photo.type,
      });
      photoUrls.push(blob.url);
    }
  }

  const payload = {
    source: "gonebynoon.co",
    submittedAt: new Date().toISOString(),
    ...lead,
    photoUrls,
  };

  // Send the lead to the CRM. Set CRM_WEBHOOK_URL (and optionally CRM_WEBHOOK_SECRET) in Vercel.
  const webhook = process.env.CRM_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CRM_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.CRM_WEBHOOK_SECRET}` } : {}),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("CRM webhook failed", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ error: "We couldn't send your request right now." }, { status: 502 });
    }
  } else {
    console.log("New quote request (no CRM_WEBHOOK_URL set):", payload);
  }

  return NextResponse.json({ ok: true });
}

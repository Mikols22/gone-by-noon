import type { SVGProps } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

type P = SVGProps<SVGSVGElement> & { size?: number };
const make = (d: string) =>
  function Icon({ size = 24, ...rest }: P) {
    return (
      <svg width={size} height={size} {...base} {...rest}>
        <path d={d} />
      </svg>
    );
  };

export const PhoneIcon = make("M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2");
export const CheckIcon = make("M5 12l5 5 9-10");
export const SofaIcon = make("M4 18v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5M2 18h20M6 11V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M5 18v2M19 18v2");
export const HouseIcon = make("M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6");
export const GarageIcon = make("M3 20V9l9-5 9 5v11M7 20v-8h10v8M7 15h10");
export const HammerIcon = make("M14 4l6 6-3 3-6-6zM11 7L3 15l3 3 8-8");
export const LeafIcon = make("M5 19c0-8 6-14 15-14 0 9-6 15-14 15M5 19l8-8");
export const BuildingIcon = make("M4 20V4h10v16M14 9h6v11M7 8h2M7 12h2M7 16h2M17 13h1M17 16h1M2 20h20");
export const MobileIcon = make("M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM10 18h4");

export function CameraIcon({ size = 24, ...rest }: P) {
  return (
    <svg width={size} height={size} {...base} {...rest}>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <circle cx="12" cy="13" r="3.5" />
      <path d="M8 6l1.5-2h5L16 6" />
    </svg>
  );
}

export function SpeedLines({ width = 34 }: { width?: number }) {
  return (
    <svg width={width} height={(width * 16) / 34} viewBox="0 0 34 16" aria-hidden="true">
      <path d="M2 3H32M10 8H32M20 13H31" stroke="#2BD46A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

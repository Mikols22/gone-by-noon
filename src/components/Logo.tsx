type Props = {
  /** Show the "Junk removal · Bucks County, PA" line under the wordmark. */
  withTagline?: boolean;
  /** Color behind the logo, used for the clock hands. */
  background?: string;
  width?: number;
  className?: string;
};

const GREEN = "#2BD46A";
const WHITE = "#FFFFFF";

export function Logo({ withTagline = false, background = "#1C1F24", width = 140, className }: Props) {
  const viewBox = withTagline ? "0 0 480 240" : "16 30 372 166";
  const [, , vw, vh] = viewBox.split(" ").map(Number);
  return (
    <svg
      className={className}
      width={width}
      height={Math.round((width * vh) / vw)}
      viewBox={viewBox}
      role="img"
      aria-label="Gone by Noon"
    >
      <path d="M24 50H104M43 66H104M68 82H102" stroke={GREEN} strokeWidth="8" strokeLinecap="round" />
      <text x="118" y="90" fontFamily="var(--font-anton), Impact, sans-serif" fontSize="72" letterSpacing="2" fill={WHITE}>
        GONE BY
      </text>
      <text x="166" y="190" textAnchor="end" fontFamily="var(--font-anton), Impact, sans-serif" fontSize="110" fill={WHITE}>
        N
      </text>
      <circle cx="212" cy="150" r="40" fill={GREEN} />
      <path d="M212 116V122M212 178V184M178 150H184M240 150H246" stroke={background} strokeWidth="4" strokeLinecap="round" />
      <path d="M212 150V128" stroke={background} strokeWidth="7" strokeLinecap="round" />
      <circle cx="212" cy="150" r="6" fill={background} />
      <text x="258" y="190" fontFamily="var(--font-anton), Impact, sans-serif" fontSize="110" fill={WHITE}>
        ON
      </text>
      {withTagline && (
        <text
          x="240"
          y="228"
          textAnchor="middle"
          fontFamily="var(--font-inter), Arial, sans-serif"
          fontWeight="700"
          fontSize="15"
          letterSpacing="3.5"
          fill={GREEN}
        >
          JUNK REMOVAL · BUCKS COUNTY, PA
        </text>
      )}
    </svg>
  );
}

/**
 * Invisible SVG definitions used across the site:
 * - #arch / #arch-sm: the cusped Indian arch used to clip photos (class "arch" / "arch-sm")
 * - #scallop: a row of small arches used as a section divider (see Scallop.tsx)
 * Rendered once in app/layout.tsx.
 */
export function ArchDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        <clipPath id="arch" clipPathUnits="objectBoundingBox">
          <path d="M0,1 L0,0.34 C0,0.16 0.09,0.09 0.19,0.085 C0.28,0.08 0.36,0.06 0.43,0.025 Q0.5,-0.01 0.57,0.025 C0.64,0.06 0.72,0.08 0.81,0.085 C0.91,0.09 1,0.16 1,0.34 L1,1 Z" />
        </clipPath>
        <clipPath id="arch-sm" clipPathUnits="objectBoundingBox">
          <path d="M0,1 L0,0.3 C0,0.14 0.1,0.08 0.2,0.075 C0.3,0.07 0.38,0.05 0.44,0.02 Q0.5,-0.008 0.56,0.02 C0.62,0.05 0.7,0.07 0.8,0.075 C0.9,0.08 1,0.14 1,0.3 L1,1 Z" />
        </clipPath>
        <symbol id="scallop" viewBox="0 0 120 22" preserveAspectRatio="none">
          <path d="M0 22V10c5-13 15-13 20 0 5-13 15-13 20 0 5-13 15-13 20 0 5-13 15-13 20 0 5-13 15-13 20 0 5-13 15-13 20 0v12z" />
        </symbol>
      </defs>
    </svg>
  );
}

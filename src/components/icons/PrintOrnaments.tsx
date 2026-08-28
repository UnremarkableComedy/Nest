import type { SVGProps } from 'react';

/** Cross-shaped registration mark used by printers for color alignment. */
export function RegistrationMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} {...props}>
      <circle cx="12" cy="12" r="5.5" />
      <line x1="12" y1="1" x2="12" y2="23" />
      <line x1="1" y1="12" x2="23" y2="12" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Small ornamental flourish / divider rule. */
export function Ornament(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 16" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <line x1="0" y1="8" x2="40" y2="8" />
      <line x1="80" y1="8" x2="120" y2="8" />
      <path d="M48 8 L60 2 L72 8 L60 14 Z" fill="currentColor" stroke="none" />
      <circle cx="44" cy="8" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="76" cy="8" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Star burst — used sparingly as an accent stamp. */
export function StarBurst(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" {...props}>
      <path d="M24 2 L27 16 L41 12 L31 22 L46 24 L31 26 L41 36 L27 32 L24 46 L21 32 L7 36 L17 26 L2 24 L17 22 L7 12 L21 16 Z" />
    </svg>
  );
}

/** Simple engraved-style microphone icon. */
export function MicIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

/** Decorative corner ornament for framed blocks. */
export function CornerOrnament(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path d="M2 2 L2 10 M2 2 L10 2" />
      <circle cx="2" cy="2" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

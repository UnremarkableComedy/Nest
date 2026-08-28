import type { ReactNode } from 'react';
import { Ornament } from '@/components/icons/PrintOrnaments';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  className?: string;
  children?: ReactNode;
}

/**
 * A framed section header in the letterpress tradition:
 * a small label, a heavy rule, oversized display type, and an ornamental divider.
 */
export function SectionHeader({ eyebrow, title, className = '', children }: SectionHeaderProps) {
  return (
    <header className={`flex flex-col items-center text-center ${className}`}>
      <span className="label text-xs text-ink-mute">{eyebrow}</span>
      <div className="mt-3 w-full max-w-xs">
        <Ornament className="w-full text-ink-faded" />
      </div>
      <h2 className="display mt-4 text-5xl text-ink sm:text-6xl md:text-7xl">
        {title}
      </h2>
      {children && <div className="mt-4">{children}</div>}
    </header>
  );
}

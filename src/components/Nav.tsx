import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site } from '@/lib/content';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Shows', href: '#shows' },
  { label: 'Videos', href: '#videos' },
  { label: 'Contact', href: '#contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`border-b-2 border-ink transition-colors duration-nav ${
          scrolled ? 'bg-paper/95 backdrop-blur-sm' : 'bg-paper/80'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8" aria-label="Primary">
          <a href="#top" className="display text-2xl leading-none text-ink">
            {site.name}
          </a>

          <ul className="hidden items-center gap-7 sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="label text-xs text-ink-soft transition-colors hover:text-oxblood"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="border-2 border-ink p-1.5 text-ink sm:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {open && (
        <div className="border-b-2 border-ink bg-paper sm:hidden">
          <ul className="flex flex-col px-5 py-2">
            {links.map((l) => (
              <li key={l.href} className="border-b border-ink/15 last:border-0">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="label block py-3 text-sm text-ink-soft"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

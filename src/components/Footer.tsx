import { SocialLinks } from '@/components/SocialLinks';
import { RegistrationMark } from '@/components/icons/PrintOrnaments';
import { site } from '@/lib/content';

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <RegistrationMark className="h-5 w-5 text-ink/30" />

          <a href="#top" className="display text-3xl text-ink">
            {site.name}
          </a>

          <SocialLinks size="sm" />

          <div className="mt-2 flex items-center gap-3">
            <span className="h-px w-12 bg-ink/30" />
            <span className="label text-[0.55rem] text-ink-mute">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </span>
            <span className="h-px w-12 bg-ink/30" />
          </div>
        </div>
      </div>
    </footer>
  );
}

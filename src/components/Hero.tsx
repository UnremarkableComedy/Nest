import { useEffect, useRef } from 'react';
import { SocialLinks } from '@/components/SocialLinks';
import { RegistrationMark } from '@/components/icons/PrintOrnaments';
import { site } from '@/lib/content';

export function Hero() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const { headshot } = site.images;
  const { followLabel } = site.sections.hero;

  useEffect(() => {
    const media = mediaRef.current;
    const img = imgRef.current;
    if (!media || !img) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;

    const update = () => {
      raf = 0;
      if (reduced.matches) {
        img.style.transform = 'translate3d(0, 0, 0) scale(1.12)';
        return;
      }
      const rect = media.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const progress = (viewH / 2 - (rect.top + rect.height / 2)) / viewH;
      const shift = progress * 48;
      img.style.transform = `translate3d(0, ${shift}px, 0) scale(1.12)`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    reduced.addEventListener('change', update);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      reduced.removeEventListener('change', update);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-paper pt-20 sm:pt-24">
      <RegistrationMark className="pointer-events-none absolute left-3 top-24 z-10 h-6 w-6 text-ink/30" />
      <RegistrationMark className="pointer-events-none absolute right-3 top-24 z-10 h-6 w-6 text-ink/30" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-center justify-center gap-4 pb-6">
          <span className="h-px w-16 bg-ink/40" />
          <span className="label text-[0.65rem] text-ink-mute">{site.tagline}</span>
          <span className="h-px w-16 bg-ink/40" />
        </div>

        <h1 className="slab text-center leading-[0.78] text-ink">
          <span className="block text-[18vw] sm:text-[15vw] md:text-[13rem]">{site.firstName}</span>
          <span className="block -mt-2 text-[18vw] text-oxblood sm:text-[15vw] md:text-[13rem]">
            {site.lastName}
          </span>
        </h1>
      </div>

      <figure className="relative mt-8">
        <div
          ref={mediaRef}
          className="relative h-[48vw] max-h-[380px] min-h-[200px] w-full overflow-hidden border-y-4 border-ink bg-ink sm:max-h-[440px]"
        >
          <img
            ref={imgRef}
            src={headshot.src}
            alt={headshot.alt}
            className="absolute left-0 top-[-12%] h-[124%] w-full object-cover object-center grayscale-[0.15] contrast-110 will-change-transform"
            loading="eager"
          />
        </div>
      </figure>

      <div className="mx-auto max-w-6xl px-5 pb-10 pt-8 sm:px-8">
        <div className="flex flex-col items-center gap-3">
          <span className="label text-[0.6rem] text-ink-mute">{followLabel}</span>
          <SocialLinks size="lg" />
        </div>
      </div>

      <div className="h-2 bg-ink" />
    </section>
  );
}

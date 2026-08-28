import { SectionHeader } from '@/components/SectionHeader';
import { Ornament } from '@/components/icons/PrintOrnaments';
import { bio, site } from '@/lib/content';

export function About() {
  const { about: aboutImg } = site.images;
  const copy = site.sections.about;

  return (
    <section id="about" className="relative bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader eyebrow={copy.eyebrow} title={copy.headline} />

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <figure className="md:col-span-5">
            <div className="press-border overflow-hidden bg-ink">
              <img
                src={aboutImg.src}
                alt={aboutImg.alt}
                className="aspect-[4/5] w-full object-cover grayscale-[0.2] contrast-110"
                loading="lazy"
              />
            </div>
            {copy.photoCaption && (
              <figcaption className="mt-3 text-center">
                <span className="label text-[0.6rem] text-ink-mute">{copy.photoCaption}</span>
              </figcaption>
            )}
          </figure>

          <div className="md:col-span-7">
            <div className="flex items-center gap-3">
              <span className="slab text-2xl text-oxblood">{site.firstName}</span>
              <span className="slab text-2xl text-ink">{site.lastName}</span>
            </div>

            <Ornament className="mt-4 h-3 w-40 text-ink-faded" />

            {bio.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mt-5 text-lg leading-relaxed text-ink-soft first:mt-6">
                {paragraph}
              </p>
            ))}

            {copy.pullQuote && (
              <blockquote className="mt-8 border-l-4 border-oxblood pl-5">
                <p className="slab text-xl leading-tight text-ink">{copy.pullQuote}</p>
                {copy.pullQuoteAttribution && (
                  <footer className="label mt-2 text-[0.6rem] text-ink-mute">
                    {copy.pullQuoteAttribution}
                  </footer>
                )}
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

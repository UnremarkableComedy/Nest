import { useState } from 'react';
import { Play } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { site, videos } from '@/lib/content';
import { youtubeEmbedSrc, youtubeThumb } from '@/lib/youtube';
import type { Video } from '@/types/content';

function VideoCard({ video, large = false }: { video: Video; large?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const thumb = youtubeThumb(video.youtubeUrl);
  const embed = youtubeEmbedSrc(video.youtubeUrl, true);

  return (
    <figure className="group relative overflow-hidden border-2 border-ink bg-ink">
      <div className="relative aspect-video">
        {playing && embed ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embed}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 h-full w-full"
            aria-label={`Play video: ${video.title}`}
          >
            {thumb ? (
              <img
                src={thumb}
                alt={video.title}
                className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                loading="lazy"
              />
            ) : (
              <span className="block h-full w-full bg-ink" />
            )}
            <span className="absolute inset-0 flex items-center justify-center bg-ink/30 transition-colors group-hover:bg-ink/20">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-paper bg-ink/70 text-paper transition-transform group-hover:scale-110 sm:h-16 sm:w-16">
                <Play className="ml-0.5 h-6 w-6 fill-paper" />
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="border-t-2 border-ink bg-paper px-4 py-3">
        <h3 className={`slab leading-tight text-ink ${large ? 'text-xl' : 'text-base'}`}>
          {video.title}
        </h3>
        {video.description && (
          <p className="label mt-1 text-[0.55rem] text-ink-mute">{video.description}</p>
        )}
      </figcaption>
    </figure>
  );
}

export function Videos() {
  const copy = site.sections.videos;
  const { featured, additional } = videos;

  return (
    <section id="videos" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader eyebrow={copy.eyebrow} title={copy.headline} />

        <div className="mt-14">
          <div className="mb-4 flex items-center gap-3">
            <span className="label border-2 border-ink bg-oxblood px-3 py-1 text-[0.55rem] text-paper">
              {copy.featuredLabel ?? 'Featured'}
            </span>
            <span className="h-px flex-1 bg-ink/30" />
          </div>
          <VideoCard video={featured} large />
        </div>

        {additional.length > 0 && (
          <div className="mt-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="label text-[0.6rem] text-ink-mute">
                {copy.moreLabel ?? 'More'}
              </span>
              <span className="h-px flex-1 bg-ink/30" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {additional.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

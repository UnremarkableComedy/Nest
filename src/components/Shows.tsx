import { SectionHeader } from '@/components/SectionHeader';
import { RegistrationMark } from '@/components/icons/PrintOrnaments';
import {
  getDateDay,
  getDateMonth,
  getDayOfWeek,
  shows,
  site,
} from '@/lib/content';
import type { ShowStatus } from '@/types/content';

const statusColor: Record<ShowStatus, string> = {
  'Sold Out': 'bg-ink text-paper',
  'Low Tickets': 'bg-oxblood text-paper',
  'Added Show': 'bg-forest text-paper',
  New: 'bg-ink text-paper',
};

export function Shows() {
  const copy = site.sections.shows;

  return (
    <section id="shows" className="relative bg-paper-deep py-20 sm:py-28">
      <div className="h-1.5 bg-ink" />

      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeader eyebrow={copy.eyebrow} title={copy.headline} />

        <ul className="mt-12 flex flex-col gap-0">
          {shows.map((show, idx) => {
            const soldOut = show.status === 'Sold Out';

            return (
              <li
                key={show.id}
                className={`relative border-t-2 border-ink py-6 ${
                  idx === shows.length - 1 ? 'border-b-2' : ''
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-5">
                  <div className="flex w-[4.75rem] shrink-0 flex-col items-center border-r-2 border-ink sm:w-24">
                    <span className="label w-full text-center text-[0.6rem] text-ink-mute [text-indent:0.3em]">
                      {getDayOfWeek(show.date)}
                    </span>
                    <span className="display w-full text-center text-4xl leading-none text-ink tabular-nums sm:text-5xl">
                      {getDateDay(show.date)}
                    </span>
                    <span className="label w-full text-center text-[0.6rem] text-ink-mute [text-indent:0.3em]">
                      {getDateMonth(show.date)}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="slab text-base leading-tight text-ink sm:text-xl">
                      {show.venue}
                    </h3>
                    <p className="mt-1 text-xs text-ink-soft sm:text-sm">
                      {show.city}, {show.state}
                      {show.time ? (
                        <>
                          <span className="mx-2 text-ink-mute">·</span>
                          {show.time}
                        </>
                      ) : null}
                    </p>
                    {show.detail && (
                      <p className="mt-2 text-sm text-ink-soft sm:text-base">{show.detail}</p>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    {show.status && !soldOut ? (
                      <span
                        className={`label px-1.5 py-0.5 text-[0.45rem] tracking-wider opacity-80 sm:text-[0.5rem] ${
                          statusColor[show.status]
                        }`}
                      >
                        {show.status}
                      </span>
                    ) : null}
                    {show.ticketUrl ? (
                      <a
                        href={show.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`label inline-flex items-center border-2 border-ink px-3 py-1.5 text-[0.55rem] transition-colors sm:px-4 sm:py-2 sm:text-[0.6rem] ${
                          soldOut
                            ? 'cursor-not-allowed bg-ink/10 text-ink-mute hover:bg-ink/10'
                            : 'bg-ink text-paper hover:bg-paper hover:text-ink'
                        }`}
                        aria-disabled={soldOut}
                        onClick={soldOut ? (e) => e.preventDefault() : undefined}
                      >
                        {soldOut ? 'Sold Out' : 'Tickets'}
                      </a>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {copy.moreDates && (
          <div className="mt-10 flex items-center justify-center gap-6">
            <RegistrationMark className="h-5 w-5 text-ink/30" />
            <span className="label text-[0.55rem] text-ink-mute">{copy.moreDates}</span>
            <RegistrationMark className="h-5 w-5 text-ink/30" />
          </div>
        )}
      </div>

      <div className="h-1.5 bg-ink" />
    </section>
  );
}

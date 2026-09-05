import siteJson from '../../content/site.json';
import showsJson from '../../content/shows.json';
import videosJson from '../../content/videos.json';
import bioRaw from '../../content/bio.md?raw';
import type {
  Show,
  SiteContent,
  SocialPlatform,
  VideosContent,
} from '@/types/content';

export const site = {
  lastName: '',
  siteUrl: 'https://gandercomedy.com',
  ...(siteJson as SiteContent),
} as SiteContent;

export const bio: string[] = bioRaw
  .trim()
  .split(/\n\s*\n/)
  .map((p) => p.replace(/\n/g, ' ').trim())
  .filter(Boolean);

function todayIsoUtc(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const shows: Show[] = [...(showsJson as Show[])]
  .filter((show) => show.date >= todayIsoUtc())
  .sort((a, b) => a.date.localeCompare(b.date));

export const videos = videosJson as VideosContent;

const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  x: 'X',
  threads: 'Threads',
  youtube: 'YouTube',
  tiktok: 'TikTok',
};

const SOCIAL_ORDER: SocialPlatform[] = [
  'instagram',
  'facebook',
  'x',
  'threads',
  'youtube',
  'tiktok',
];

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  url: string;
};

export function getSocialLinks(social: SiteContent['social']): SocialLink[] {
  return SOCIAL_ORDER.flatMap((platform) => {
    const url = social[platform]?.trim();
    if (!url) return [];
    return [{ platform, label: SOCIAL_LABELS[platform], url }];
  });
}

/** Parse ISO date (YYYY-MM-DD) to a noon-UTC Date to avoid timezone day shifts. */
function parseIsoDate(isoDate: string): Date | null {
  const [year, month, day] = isoDate.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(Date.UTC(year, month - 1, day, 12));
}

/** Short weekday derived from ISO date — date is the single source of truth. */
export function getDayOfWeek(isoDate: string, style: 'short' | 'long' = 'short'): string {
  const date = parseIsoDate(isoDate);
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', {
    weekday: style,
    timeZone: 'UTC',
  }).format(date);
}

/** Day of month from ISO date. */
export function getDateDay(isoDate: string): number {
  const date = parseIsoDate(isoDate);
  return date ? date.getUTCDate() : 0;
}

/** Short month from ISO date. */
export function getDateMonth(isoDate: string): string {
  const date = parseIsoDate(isoDate);
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    timeZone: 'UTC',
  }).format(date);
}

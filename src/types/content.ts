export type SocialPlatform =
  | 'instagram'
  | 'facebook'
  | 'x'
  | 'threads'
  | 'youtube'
  | 'tiktok';

export type ShowStatus = 'Sold Out' | 'Low Tickets' | 'Added Show' | 'New';

export type SiteImage = {
  src: string;
  alt: string;
};

export type SiteContent = {
  name: string;
  firstName: string;
  lastName: string;
  tagline: string;
  email: string;
  /** Production origin for absolute share URLs (not CMS-editable). */
  siteUrl: string;
  seo: {
    title: string;
    description: string;
  };
  images: {
    headshot: SiteImage;
    about: SiteImage;
  };
  social: Partial<Record<SocialPlatform, string>>;
  sections: {
    hero: {
      followLabel: string;
    };
    about: {
      eyebrow: string;
      headline: string;
      photoCaption?: string;
      pullQuote?: string;
      pullQuoteAttribution?: string;
    };
    shows: {
      eyebrow: string;
      headline: string;
      moreDates?: string;
    };
    videos: {
      eyebrow: string;
      headline: string;
      featuredLabel?: string;
      moreLabel?: string;
    };
    contact: {
      eyebrow: string;
      headline: string;
      blurb: string;
      success: string;
    };
  };
};

export type Show = {
  id: string;
  date: string;
  time: string;
  city: string;
  state: string;
  venue: string;
  detail?: string;
  status?: ShowStatus;
  ticketUrl?: string;
};

export type Video = {
  id: string;
  title: string;
  youtubeUrl: string;
  description?: string;
};

export type VideosContent = {
  featured: Video;
  additional: Video[];
};

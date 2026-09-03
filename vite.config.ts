import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

const SHARE_IMAGE_PATH = '/og-share.jpg';

type SiteSeo = {
  siteUrl?: string;
  seo: {
    title: string;
    description: string;
  };
  images: {
    headshot: {
      alt: string;
    };
  };
};

const FALLBACK_SITE_URL = 'https://goosecomedy.com';

function loadSiteSeo(): SiteSeo {
  const sitePath = fileURLToPath(new URL('./content/site.json', import.meta.url));
  return JSON.parse(readFileSync(sitePath, 'utf-8')) as SiteSeo;
}

function originFromSiteUrl(siteUrl: string | undefined): string {
  return (siteUrl || FALLBACK_SITE_URL).replace(/\/+$/, '');
}

function injectSeoFromContent() {
  return {
    name: 'inject-seo-from-content',
    transformIndexHtml(html: string) {
      const site = loadSiteSeo();
      const origin = originFromSiteUrl(site.siteUrl);
      const { title, description } = site.seo;
      const imageUrl = `${origin}${SHARE_IMAGE_PATH}`;
      const imageAlt = site.images.headshot.alt;

      return html
        .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
        .replace(
          /<meta name="description" content=".*?"\s*\/>/,
          `<meta name="description" content="${description}" />`
        )
        .replace(
          /<meta property="og:url" content=".*?"\s*\/>/,
          `<meta property="og:url" content="${origin}/" />`
        )
        .replace(
          /<meta property="og:title" content=".*?"\s*\/>/,
          `<meta property="og:title" content="${title}" />`
        )
        .replace(
          /<meta property="og:description" content=".*?"\s*\/>/,
          `<meta property="og:description" content="${description}" />`
        )
        .replace(
          /<meta property="og:image" content=".*?"\s*\/>/,
          `<meta property="og:image" content="${imageUrl}" />`
        )
        .replace(
          /<meta property="og:image:alt" content=".*?"\s*\/>/,
          `<meta property="og:image:alt" content="${imageAlt}" />`
        )
        .replace(
          /<meta name="twitter:title" content=".*?"\s*\/>/,
          `<meta name="twitter:title" content="${title}" />`
        )
        .replace(
          /<meta name="twitter:description" content=".*?"\s*\/>/,
          `<meta name="twitter:description" content="${description}" />`
        )
        .replace(
          /<meta name="twitter:image" content=".*?"\s*\/>/,
          `<meta name="twitter:image" content="${imageUrl}" />`
        )
        .replace(
          /<meta name="twitter:image:alt" content=".*?"\s*\/>/,
          `<meta name="twitter:image:alt" content="${imageAlt}" />`
        );
    },
  };
}

export default defineConfig({
  plugins: [react(), injectSeoFromContent()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

# template-tennessee

Letterpress-style comedian marketing template (Vite + React). Deployable on Cloudflare Pages.

Internal package / local Wrangler name: `comedian-template-tennessee` (development identifier only — not a production Cloudflare project name).

## Create a new client site

1. Copy this repository.
2. Replace content files in `content/`:
   - `site.json` — name, SEO, images, social links, section copy
   - `bio.md` — biography paragraphs
   - `shows.json` — tour dates (each show needs a unique `id`; ISO `date` only — weekday is derived)
   - `videos.json` — featured + additional videos (each needs a unique `id` and a full YouTube URL)
3. Replace images under `public/uploads/` (demo/placeholder assets only).
4. Update theme tokens in `src/styles/tokens.css` (colors, fonts, widths).
5. Configure the contact form (Resend + Turnstile) — see [CONTACT-FORM.md](CONTACT-FORM.md).
6. Make only minor layout tweaks in components if needed.

## Development

```bash
npm install
npm run dev
```

UI-only Vite server. Contact API requires Wrangler (`.dev.vars` + build):

```bash
npm run pages:dev
```

```bash
npm run build
npm run preview
npm test
```

## Contact form

Browser UI → `submitContact()` in `src/lib/contact/` → `POST /api/contact` (Cloudflare Pages Function) → Turnstile verify → Resend email.

Prefer **Invisible** Turnstile in production. Full setup: [CONTACT-FORM.md](CONTACT-FORM.md).

## Pages CMS

Content lives at the repo root in `content/` and uploads in `public/uploads/`. Configuration is in `.pages.yml`.

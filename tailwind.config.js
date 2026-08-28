/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Semantic tokens */
        background: {
          DEFAULT: 'rgb(var(--color-background) / <alpha-value>)',
          light: 'rgb(var(--color-background-light) / <alpha-value>)',
          dark: 'rgb(var(--color-background-dark) / <alpha-value>)',
        },
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        foreground: {
          DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
          soft: 'rgb(var(--color-text-soft) / <alpha-value>)',
          faded: 'rgb(var(--color-text-faded) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          contrast: 'rgb(var(--color-accent-contrast) / <alpha-value>)',
        },
        link: 'rgb(var(--color-link) / <alpha-value>)',
        tag: {
          DEFAULT: 'rgb(var(--color-tag) / <alpha-value>)',
          secondary: 'rgb(var(--color-tag-secondary) / <alpha-value>)',
        },
        highlight: 'rgb(var(--color-highlight) / <alpha-value>)',

        /* Letterpress palette aliases → same tokens (existing class names) */
        paper: {
          DEFAULT: 'rgb(var(--color-background) / <alpha-value>)',
          light: 'rgb(var(--color-background-light) / <alpha-value>)',
          dark: 'rgb(var(--color-background-dark) / <alpha-value>)',
          deep: 'rgb(var(--color-surface) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
          soft: 'rgb(var(--color-text-soft) / <alpha-value>)',
          faded: 'rgb(var(--color-text-faded) / <alpha-value>)',
          mute: 'rgb(var(--color-text-muted) / <alpha-value>)',
        },
        oxblood: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
        },
        burnt: {
          DEFAULT: 'rgb(var(--color-burnt) / <alpha-value>)',
        },
        mustard: {
          DEFAULT: 'rgb(var(--color-highlight) / <alpha-value>)',
        },
        forest: {
          DEFAULT: 'rgb(var(--color-tag-secondary) / <alpha-value>)',
        },
        teal: {
          DEFAULT: 'rgb(var(--color-teal) / <alpha-value>)',
        },
        indigo: {
          DEFAULT: 'rgb(var(--color-indigo) / <alpha-value>)',
        },
        brick: {
          DEFAULT: 'rgb(var(--color-brick) / <alpha-value>)',
          light: 'rgb(var(--color-brick-light) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        slab: ['var(--font-slab)'],
        cond: ['var(--font-cond)'],
        body: ['var(--font-sans)'],
        sans: ['var(--font-sans)'],
      },
      letterSpacing: {
        wood: '0.02em',
        wide2: '0.18em',
        widest2: '0.3em',
      },
      maxWidth: {
        content: 'var(--max-width-content)',
        prose: 'var(--max-width-prose)',
      },
      transitionDuration: {
        nav: 'var(--duration-nav)',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
      },
    },
  },
  plugins: [],
};

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { Ornament } from '@/components/icons/PrintOrnaments';
import { submitContact } from '@/lib/contact/client';
import { site } from '@/lib/content';

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export function Contact() {
  const copy = site.sections.contact;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const turnstileConfigured = Boolean(TURNSTILE_SITE_KEY?.trim());

  useEffect(() => {
    if (!turnstileConfigured || !widgetRef.current) return;

    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || !widgetRef.current || !window.turnstile || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITE_KEY!.trim(),
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      });
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-turnstile-script="true"]'
    );

    if (window.turnstile) {
      renderWidget();
    } else if (existing) {
      window.onTurnstileLoad = renderWidget;
    } else {
      const script = document.createElement('script');
      script.src =
        'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad';
      script.async = true;
      script.defer = true;
      script.dataset.turnstileScript = 'true';
      window.onTurnstileLoad = renderWidget;
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
      }
      widgetIdRef.current = null;
    };
  }, [turnstileConfigured]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setError('');

    if (!turnstileConfigured) {
      setStatus('error');
      setError('Contact form is not configured yet.');
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const result = await submitContact({
      name,
      email,
      message,
      website: String(data.get('website') ?? ''),
      turnstileToken,
    });

    if (!result.ok) {
      setStatus('error');
      setError(result.error);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
        setTurnstileToken('');
      }
      return;
    }

    setStatus('success');
    setName('');
    setEmail('');
    setMessage('');
    setTurnstileToken('');
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }

  const formDisabled = !turnstileConfigured || status === 'submitting';

  return (
    <section id="contact" className="relative z-[41] overflow-hidden bg-ink py-20 text-paper sm:py-28">
      <div className="paper-grain paper-grain-screen" aria-hidden="true" />
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="label text-xs text-paper/50">{copy.eyebrow}</span>
          <div className="mt-3 w-full max-w-xs">
            <Ornament className="w-full text-paper/30" />
          </div>
          <h2 className="display mt-4 text-5xl text-paper sm:text-6xl md:text-7xl">
            {copy.headline}
          </h2>
          <p className="mt-4 max-w-md text-sm text-paper/60">{copy.blurb}</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-12 flex flex-col gap-5">
          <div
            aria-hidden="true"
            className="absolute left-[-9999px] h-px w-px overflow-hidden"
          >
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col">
              <label htmlFor="name" className="label mb-2 text-[0.6rem] text-paper/60">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={formDisabled}
                autoComplete="name"
                className="border-2 border-paper/30 bg-transparent px-4 py-3 text-paper placeholder-paper/30 outline-none transition-colors focus:border-paper disabled:opacity-50"
                placeholder="Your name"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="label mb-2 text-[0.6rem] text-paper/60">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={formDisabled}
                autoComplete="email"
                className="border-2 border-paper/30 bg-transparent px-4 py-3 text-paper placeholder-paper/30 outline-none transition-colors focus:border-paper disabled:opacity-50"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="label mb-2 text-[0.6rem] text-paper/60">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={formDisabled}
              className="resize-none border-2 border-paper/30 bg-transparent px-4 py-3 text-paper placeholder-paper/30 outline-none transition-colors focus:border-paper disabled:opacity-50"
              placeholder="Your message"
            />
          </div>

          {turnstileConfigured ? (
            <div ref={widgetRef} />
          ) : (
            <p className="label text-center text-[0.65rem] text-paper/50" role="status">
              Contact form is not configured yet.
            </p>
          )}

          <div className="mt-2 flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={formDisabled}
              className="label flex items-center gap-2 border-2 border-paper bg-paper px-8 py-3 text-[0.7rem] text-ink transition-colors hover:bg-transparent hover:text-paper disabled:opacity-50"
            >
              {status === 'submitting' ? 'Sending…' : 'Send Message'}
              {status !== 'submitting' && <Send className="h-4 w-4" />}
            </button>

            {status === 'success' && (
              <p className="label text-[0.65rem] text-mustard" role="status">
                {copy.success}
              </p>
            )}
            {error && (
              <p className="label text-[0.65rem] text-brick-light" role="alert" aria-live="assertive">
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

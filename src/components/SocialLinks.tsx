import { getSocialLinks, site } from '@/lib/content';
import { socialIcons } from '@/components/icons/SocialIcons';

interface SocialLinksProps {
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
  iconClassName?: string;
}

const sizeMap = {
  sm: { icon: 'h-4 w-4', gap: 'gap-3', pad: 'p-2' },
  md: { icon: 'h-5 w-5', gap: 'gap-4', pad: 'p-2.5' },
  lg: { icon: 'h-6 w-6', gap: 'gap-5', pad: 'p-3' },
};

export function SocialLinks({
  size = 'md',
  showLabels = false,
  className = '',
  iconClassName = '',
}: SocialLinksProps) {
  const s = sizeMap[size];
  const links = getSocialLinks(site.social);

  return (
    <ul className={`flex flex-wrap items-center justify-center ${s.gap} ${className}`}>
      {links.map((link) => {
        const Icon = socialIcons[link.platform];
        return (
          <li key={link.platform}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={`group flex items-center ${s.pad} border-2 border-transparent transition-colors hover:border-ink hover:bg-ink hover:text-paper`}
            >
              <Icon className={`${s.icon} ${iconClassName}`} />
              {showLabels && <span className="label ml-2 text-xs">{link.label}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

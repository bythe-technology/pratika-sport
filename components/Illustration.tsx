import { illustrations, type IllustrationId } from '@/lib/illustrations';

interface IllustrationProps {
  id: IllustrationId;
  className?: string;
  priority?: boolean;
  caption?: boolean;
  sizes?: string;
  appearance?: 'default' | 'cutout';
}

export default function Illustration({ id, className = '', priority = false, caption = true, sizes = '(max-width: 640px) 100vw, 50vw', appearance = 'default' }: IllustrationProps) {
  const item = illustrations[id];
  const asset = appearance === 'cutout' && 'hero' in item ? item.hero : item;
  const sources = (format: string) => [360, 720, 1080].map(width => `${asset.base}-${width}.${format} ${width}w`).join(', ');
  return (
    <figure className={`concept-figure ${className}`}>
      <picture>
        <source type="image/avif" srcSet={sources('avif')} sizes={sizes} />
        {/* oxlint-disable-next-line next/no-img-element -- Static responsive assets are shared with the legacy HTML build. */}
        <img src={asset.src} srcSet={sources('webp')} sizes={sizes} width={item.width} height={item.height} alt={item.alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />
      </picture>
      {caption ? <figcaption>Ilustração conceitual</figcaption> : null}
    </figure>
  );
}

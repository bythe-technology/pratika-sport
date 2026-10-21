import photos from '@/data/project-photos.json';

export type ProjectPhotoId = keyof typeof photos;

interface ProjectPhotoProps {
  id: ProjectPhotoId;
  className?: string;
  sizes?: string;
}

/** Original photographs stay separate from conceptual/generated artwork. */
export default function ProjectPhoto({ id, className = '', sizes = '(max-width: 640px) 100vw, 33vw' }: ProjectPhotoProps) {
  const photo = photos[id];
  const base = `/images/projects/${id}`;
  const srcSet = (format: string) => [360, 720, 1080].map(width => `${base}-${width}.${format} ${width}w`).join(', ');
  return (
    <picture className={`project-photo ${className}`}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      {/* oxlint-disable-next-line next/no-img-element -- Pre-encoded responsive photos; no runtime image service required. */}
      <img src={`${base}-1080.webp`} srcSet={srcSet('webp')} sizes={sizes} width={1080} height={720} alt={photo.alt} loading="lazy" decoding="async" />
    </picture>
  );
}

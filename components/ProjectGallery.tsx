import Link from 'next/link';
import { ArrowRight, Camera, MapPin } from 'lucide-react';
import photos from '@/data/project-photos.json';
import ProjectPhoto, { type ProjectPhotoId } from './ProjectPhoto';
import completedProjects from '@/data/completed-projects.json';

const gallery: ProjectPhotoId[] = ['poliesportiva', 'tenis', 'beach', 'society'];

export function ProjectPhotoPreview() {
  return (
    <a className="project-preview" href="#quadras-reais">
      <ProjectPhoto id="poliesportiva" sizes="112px" />
      <span><small>Do desenho à realidade</small><strong>Conheça nossas quadras <ArrowRight size={15} aria-hidden="true" /></strong><span>Fotos reais do acervo Pratika Sport</span></span>
    </a>
  );
}

export default function ProjectGallery() {
  const projects = Object.entries(completedProjects);

  return (
    <section className="project-gallery-section" id="quadras-reais" aria-labelledby="project-gallery-title">
      <div className="section-container">
        <div className="project-gallery-heading">
          <div><span className="section-eyebrow"><Camera size={16} aria-hidden="true" /> Pratika na prática</span><h2 id="project-gallery-title">Projetos reais. Espaços para viver o esporte.</h2></div>
          <p>As ilustrações explicam o processo. Aqui, as fotos do nosso acervo mostram as quadras de verdade.</p>
        </div>
        <div className="project-gallery-grid">
          {gallery.map(id => (
            <figure className="project-gallery-item" key={id}>
              <Link href={photos[id].href}>
                <ProjectPhoto id={id} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                <figcaption><span>{photos[id].label}</span><ArrowRight size={18} aria-hidden="true" /></figcaption>
              </Link>
            </figure>
          ))}
        </div>
        <div className="project-case-list">
          {projects.map(([id, project]) => (
            <article className="project-case-card" id={`quadras-reais-${id}`} key={id}>
              <div className="project-case-photo-grid">
                {project.photos.map((photo, index) => {
                  const base = `/images/project-cases/${id}/${photo.id}`;
                  const srcSet = (format: string) => [360, 720, 1080]
                    .map(width => `${base}-${width}.${format} ${width}w`)
                    .join(', ');

                  return (
                    <figure className="project-case-photo" key={photo.id}>
                      <picture>
                        <source type="image/avif" srcSet={srcSet('avif')} sizes="(max-width: 700px) 50vw, 32vw" />
                        {/* oxlint-disable-next-line next/no-img-element -- Responsive pre-encoded WebP and AVIF assets. */}
                        <img
                          src={`${base}-1080.webp`}
                          srcSet={srcSet('webp')}
                          sizes="(max-width: 700px) 50vw, 32vw"
                          width={1080}
                          height={810}
                          alt={photo.alt}
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                      <figcaption>Vista {index + 1}</figcaption>
                    </figure>
                  );
                })}
              </div>
              <div className="project-case-copy">
                <span className="project-case-status">{project.status}</span>
                <p className="project-case-location"><MapPin size={16} aria-hidden="true" />{project.location}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <small className="project-case-note">Fotos reais com tratamento visual digital; arquivos originais preservados.</small>
              </div>
            </article>
          ))}
        </div>
        <a className="project-instagram-link" href="https://www.instagram.com/pratikasport.com.br/" target="_blank" rel="noopener noreferrer">Mais registros no Instagram <ArrowRight size={16} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

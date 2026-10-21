import Link from 'next/link';
import { ArrowRight, Camera } from 'lucide-react';
import photos from '@/data/project-photos.json';
import ProjectPhoto, { type ProjectPhotoId } from './ProjectPhoto';

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
        <a className="project-instagram-link" href="https://www.instagram.com/pratikasport.com.br/" target="_blank" rel="noopener noreferrer">Mais registros no Instagram <ArrowRight size={16} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

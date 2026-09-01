import Image from 'next/image';
import { ArrowRight, CheckCircle2, Clock3, MapPin, Phone } from 'lucide-react';

const services = [
  { title: 'Quadras poliesportivas', image: '/images/hero-quadra.jpg' },
  { title: 'Quadras de tênis', image: '/images/quadra-tenis.jpg' },
  { title: 'Beach tennis', image: '/images/beach-tennis.jpeg' },
  { title: 'Campos de futebol', image: '/images/campo-futebol.jpg' },
];

export default function Home() {
  return <main>
    <div className="maintenance-bar"><Clock3 aria-hidden="true" size={17}/><span><strong>Site em manutenção.</strong> Estamos preparando uma experiência nova e mais completa.</span></div>
    <header className="site-header">
      <a href="#inicio" aria-label="Pratika Sport - início"><Image src="/images/logo-header.png" alt="Pratika Sport" width={206} height={50} priority/></a>
      <nav aria-label="Navegação principal"><a href="#servicos">Serviços</a><a href="#empresa">A empresa</a><a className="nav-cta" href="https://wa.me/551391919194">Solicitar orçamento</a></nav>
    </header>
    <section className="hero" id="inicio">
      <Image className="hero-image" src="/images/hero-quadra.jpg" alt="Quadra poliesportiva construída pela Pratika Sport" fill priority sizes="100vw"/><div className="hero-overlay"/>
      <div className="hero-content"><p className="eyebrow">Construção e reforma de quadras esportivas</p><h1>Seu projeto esportivo começa com uma base bem construída.</h1><p className="hero-copy">Soluções completas para condomínios, clubes, escolas, empresas e espaços públicos em todo o Brasil.</p><div className="hero-actions"><a className="button button-primary" href="https://wa.me/551391919194">Falar com a Pratika <ArrowRight aria-hidden="true" size={18}/></a><a className="button button-secondary" href="#servicos">Conhecer serviços</a></div></div>
    </section>
    <section className="trust-strip" aria-label="Diferenciais"><span><CheckCircle2 aria-hidden="true"/> Construção e reforma</span><span><CheckCircle2 aria-hidden="true"/> Atendimento nacional</span><span><CheckCircle2 aria-hidden="true"/> Projeto sob medida</span></section>
    <section className="section" id="servicos"><div className="section-heading"><div><p className="eyebrow dark">Nossas especialidades</p><h2>Estruturas feitas para durar e performar.</h2></div><p>Do planejamento à entrega, reunimos experiência técnica, materiais adequados e execução cuidadosa para cada modalidade.</p></div><div className="service-grid">{services.map(service=><article className="service-card" key={service.title}><Image src={service.image} alt={service.title} fill sizes="(max-width: 760px) 100vw, 25vw"/><div className="service-shade"/><h3>{service.title}</h3></article>)}</div></section>
    <section className="about" id="empresa"><div><p className="eyebrow">Pratika Sport</p><h2>Uma nova presença digital está em construção.</h2></div><div className="about-copy"><p>Enquanto nosso novo site fica pronto, a equipe da Pratika Sport continua atendendo normalmente. Conte-nos sobre o espaço, a modalidade e o objetivo do seu projeto.</p><div className="contact-row"><a href="https://wa.me/551391919194"><Phone aria-hidden="true"/> (13) 9191-9194</a><span><MapPin aria-hidden="true"/> Pariquera-Açu, SP · atendimento nacional</span></div></div></section>
    <footer><Image src="/images/logo-header.png" alt="Pratika Sport" width={180} height={44}/><p>© 2026 Pratika Sport. Todos os direitos reservados.</p><p className="bythe">Novo site em produção pela BYTHE.</p></footer>
  </main>;
}

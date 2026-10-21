import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  MapPin,
  Phone,
  ShieldCheck,
  Award,
  Layers,
  Users,
  Building2,
  HardHat,
  Compass,
  FileCheck2,
  Camera,
  MessageCircle,
} from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import QuoteForm from '@/components/QuoteForm';
import FaqSection from '@/components/FaqSection';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import StructuredData from '@/components/StructuredData';
import Illustration from '@/components/Illustration';
import ConstructionStory from '@/components/ConstructionStory';
import { faqSchema, serviceSchema } from '@/lib/seo';

const services = [
  {
    title: 'Quadras Poliesportivas',
    category: 'Multiuso & Condomínios',
    description:
      'Projetadas para futsal, basquete, vôlei e handebol com piso de alta absorção de impacto, iluminação LED e alambrados reforçados.',
    illustration: 'servico-poliesportiva' as const,
    href: '/pages/servicos/quadras-poliesportivas.html',
    waText:
      'Olá! Gostaria de um orçamento para construção ou reforma de Quadra Poliesportiva.',
  },
  {
    title: 'Quadras de Tênis',
    category: 'Oficial & Recreativo',
    description:
      'Superfícies em saibro tradicional, piso rápido acrílico ou grama sintética, respeitando normas técnicas da CBT e ITF.',
    illustration: 'servico-tenis' as const,
    href: '/pages/servicos/quadra-de-tenis.html',
    waText: 'Olá! Gostaria de um orçamento para Quadra de Tênis.',
  },
  {
    title: 'Beach Tennis & Areia',
    category: 'Modalidades de Areia',
    description:
      'Sistema completo com drenagem profunda, areia tratada de granulometria ideal, cercamentos e postes oficiais.',
    illustration: 'servico-beach' as const,
    href: '/pages/servicos/quadra-de-beach-tennis.html',
    waText: 'Olá! Gostaria de um orçamento para Quadra de Beach Tennis.',
  },
  {
    title: 'Campos de Futebol Society',
    category: 'Grama Sintética',
    description:
      'Grama sintética monofilamento de alta densidade com base amortecedora, drenagem ágil e fechamento perimetral com redes.',
    illustration: 'servico-society' as const,
    href: '/pages/servicos/campo-de-futebol.html',
    waText: 'Olá! Gostaria de um orçamento para Campo de Futebol Society.',
  },
  {
    title: 'Pisos Modulares Esportivos',
    category: 'Interno e Externo',
    description:
      'Placas modulares em polipropileno de alta resistência, antiderrapantes, com drenagem instantânea e proteção UV.',
    illustration: 'material-modular' as const,
    href: '/pages/blog/melhor-piso-para-quadra-esportiva.html',
    waText: 'Olá! Gostaria de informações sobre Piso Modular Esportivo.',
  },
  {
    title: 'Reforma e Revitalização',
    category: 'Manutenção & Pintura',
    description:
      'Correção de fissuras, regularização de base, pintura epóxi/acrílica, demarcação técnica e troca de acessórios esportivos.',
    illustration: 'servico-reforma' as const,
    href: '/pages/servicos/reforma-de-quadras.html',
    waText:
      'Olá! Gostaria de um diagnóstico e orçamento para Reforma de Quadra.',
  },
];

const surfaces = [
  {
    name: 'Piso Modular Esportivo',
    illustration: 'material-modular' as const,
    type: 'Polipropileno Alto Impacto',
    desc: 'Excelente amortecimento para articulações, drenagem automática contra chuva e custo de manutenção mínimo. Ideal para áreas externas e internas.',
    tag: 'Alta Durabilidade',
  },
  {
    name: 'Piso Acrílico / Asfáltico',
    illustration: 'material-acrilico' as const,
    type: 'Piso Rápido / Emborrachado',
    desc: 'Camadas de resina acrílica sobre asfalto ou concreto nivelado. Velocidade de jogo uniforme, estética vibrante e alta resistência climática.',
    tag: 'Padrão Oficial',
  },
  {
    name: 'Saibro Clássico',
    illustration: 'material-saibro' as const,
    type: 'Composto Cerâmico & Pó de Telha',
    desc: 'Piso tradicional para tênis com deslizamento controlado, conforto muscular e sistema de irrigação/drenagem especializada.',
    tag: 'Máximo Conforto',
  },
  {
    name: 'Grama Sintética Esportiva',
    illustration: 'material-grama' as const,
    type: 'Fibras Fibriladas / Monofilamento',
    desc: 'Uso contínuo para campos society e minicampos, dispensando corte e irrigação constante com excelente tração e segurança.',
    tag: 'Society & Futebol',
  },
  {
    name: 'Areia Tratada e Selecionada',
    illustration: 'material-areia' as const,
    type: 'Granulometria Especial',
    desc: 'Areia lavada e selecionada para Beach Tennis, Futevôlei e Vôlei de Praia, sem aquecimento excessivo nem acúmulo de poeira.',
    tag: 'Beach Sports',
  },
  {
    name: 'Bases Estruturais em Concreto / Asfalto',
    illustration: 'material-base' as const,
    type: 'Fundação e Regularização',
    desc: 'Engenharia de base com caimento perfeito para escoamento de água, juntas de dilatação e armaduras de reforço estrutural.',
    tag: 'Base Construtiva',
  },
];

const steps = [
  {
    step: '01',
    title: 'Diagnóstico & Briefing',
    desc: 'Entendemos seu espaço, modalidade desejada, público-alvo e condições do terreno (terraplanagem, drenagem e medidas).',
  },
  {
    step: '02',
    title: 'Projeto & Orçamento Transparente',
    desc: 'Elaboramos uma proposta técnica detalhada com especificação de materiais, etapas de execução e cronograma acordado.',
  },
  {
    step: '03',
    title: 'Execução e Engenharia',
    desc: 'Nossa equipe especializada executa a obra com rigor técnico: fundação, nivelamento, aplicação de piso, iluminação e alambrado.',
  },
  {
    step: '04',
    title: 'Entrega, Demarcação & Garantia',
    desc: 'Pintura técnica nas medidas oficiais, conferência de acabamentos e entrega com certificado de garantia e manual de conservação.',
  },
];

export default function Home() {
  return (
    <div className="site-wrapper">
      <StructuredData data={[serviceSchema, faqSchema]} />
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo principal
      </a>
      {/* Responsive Sticky Header */}
      <SiteHeader />

      <main id="conteudo-principal">
        {/* HERO SECTION */}
        <section className="hero" id="inicio">
          <div className="hero-overlay" />

          <div className="hero-container illustrated-hero-grid">
            <div className="hero-copy">
            <div className="hero-badge"><span>Construção · Reforma · Manutenção</span></div>

            <h1 className="hero-title">
              <span>Sua quadra.</span> Do projeto ao <em>primeiro jogo.</em>
            </h1>

            <p className="hero-description">
              Transformamos espaços em quadras para condomínios, clubes e escolas.
              Construção, reforma e manutenção em todo o Brasil, com prioridade em <strong>São Paulo.</strong>
            </p>

            <div className="hero-actions">
              <a
                className="btn btn-primary"
                href="https://wa.me/5515997157642?text=Ol%C3%A1%21%20Gostaria%20de%20solicitar%20uma%20avalia%C3%A7%C3%A3o%20e%20or%C3%A7amento%20para%20meu%20projeto."
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Solicitar orçamento</span>
                <ArrowRight aria-hidden="true" size={18} />
              </a>

              <a className="btn btn-glass" href="#servicos">
                <span>Ver soluções</span><ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>

            <div className="hero-highlights">
              <div className="hero-proof"><strong>+850</strong><span>projetos realizados</span></div>
              <div className="hero-proof"><strong>10+ anos</strong><span>de operação</span></div>
            </div>
            </div>
            <ConstructionStory />
          </div>
        </section>

        {/* VERIFIED SERVICE DIFFERENTIATORS */}
        <section
          className="trust-strip"
          id="diferenciais"
          aria-label="Diferenciais de atendimento"
        >
          <div className="trust-grid">
            <div className="trust-card">
              <div className="trust-icon-box">
                <Award size={24} />
              </div>
              <div>
                <strong className="trust-number">Construção</strong>
                <p className="trust-label">Do terreno à demarcação</p>
              </div>
            </div>

            <div className="trust-card">
              <div className="trust-icon-box">
                <FileCheck2 size={24} />
              </div>
              <div>
                <strong className="trust-number">Reforma</strong>
                <p className="trust-label">Recuperação do seu espaço</p>
              </div>
            </div>

            <div className="trust-card">
              <div className="trust-icon-box">
                <MapPin size={24} />
              </div>
              <div>
                <strong className="trust-number">Manutenção</strong>
                <p className="trust-label">Cuidado em cada detalhe</p>
              </div>
            </div>

            <div className="trust-card">
              <div className="trust-icon-box">
                <ShieldCheck size={24} />
              </div>
              <div>
                <strong className="trust-number">Atendimento nacional</strong>
                <p className="trust-label">Prioridade em São Paulo</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES / ESPECIALIDADES */}
        <section className="section" id="servicos">
          <div className="section-container">
            <div className="section-header-block">
              <div>
                <span className="section-eyebrow">Nossas Especialidades</span>
                <h2 className="section-title">
                  Estruturas feitas para durar, jogar e encantar.
                </h2>
              </div>
              <p className="section-subtitle">
                Do planejamento inicial à demarcação final: oferecemos soluções
                completas com materiais certificados e mão de obra especializada
                para cada modalidade.
              </p>
            </div>

            <div className="service-grid">
              {services.map((service, index) => (
                <article className="service-card" key={index}>
                  <div className="service-image-wrapper">
                    <Illustration id={service.illustration} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="service-badge-pill">{service.category}</div>
                    <div className="service-overlay-gradient" />
                  </div>

                  <div className="service-card-body">
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-desc">{service.description}</p>

                    <Link className="service-details-link" href={service.href}>
                      Ver detalhes técnicos sobre {service.title.toLowerCase()}
                    </Link>

                    <a
                      href={`https://wa.me/5515997157642?text=${encodeURIComponent(service.waText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="service-card-action"
                    >
                      <span>Orçar esta modalidade</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SURFACES & PISOS GUIDE */}
        <section className="surfaces-section" id="superficies">
          <div className="section-container">
            <div className="section-header-block text-light">
              <div>
                <span className="section-eyebrow text-accent">
                  Pisos & Revestimentos
                </span>
                <h2 className="section-title text-white">
                  A superfície certa para cada intensidade de jogo.
                </h2>
              </div>
              <p className="section-subtitle text-slate-300">
                A escolha do piso define a drenagem, amortecimento, manutenção e
                a velocidade da partida. Conheça as opções que instalamos:
              </p>
            </div>

            <div className="surfaces-grid">
              {surfaces.map((surf, idx) => (
                <div className="surface-card" key={idx}>
                  <Illustration id={surf.illustration} sizes="(max-width: 640px) 100vw, 33vw" />
                  <div className="surface-top">
                    <span className="surface-tag">{surf.tag}</span>
                    <Layers size={20} className="surface-icon" />
                  </div>
                  <h3 className="surface-title">{surf.name}</h3>
                  <p className="surface-type">{surf.type}</p>
                  <p className="surface-desc">{surf.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS / COMO FUNCIONA */}
        <section className="section process-section" id="processo">
          <div className="section-container">
            <div className="section-header-block">
              <div>
                <span className="section-eyebrow">Metodologia Construtiva</span>
                <h2 className="section-title">
                  Da primeira conversa à quadra pronta para o jogo.
                </h2>
              </div>
              <p className="section-subtitle">
                Nosso processo evita retrabalho, surpresas orçamentárias e
                garante conformidade com as dimensões e normas das federações
                esportivas.
              </p>
            </div>

            <div className="steps-grid">
              {steps.map((item, idx) => (
                <div className="step-card" key={idx}>
                  <Illustration id={(['institucional-planejamento', 'etapa-terreno', 'etapa-base', 'etapa-pronta'] as const)[idx]} sizes="(max-width: 640px) 100vw, 25vw" />
                  <div className="step-badge">{item.step}</div>
                  <h3 className="step-title">{item.title}</h3>
                  <p className="step-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AUDIENCE / PARA QUEM FAZEMOS */}
        <section className="audience-section">
          <div className="section-container">
            <Illustration id="institucional-complexo" className="audience-illustration" />
            <div className="audience-card-wrapper">
              <div className="audience-header">
                <span className="section-eyebrow">Segmentos Atendidos</span>
                <h2 className="audience-title">
                  Projetos sob medida para cada tipo de cliente
                </h2>
              </div>

              <div className="audience-tags">
                <div className="audience-pill">
                  <Building2 size={16} /> Condomínios Residenciais
                </div>
                <div className="audience-pill">
                  <Users size={16} /> Clubes Esportivos & Associações
                </div>
                <div className="audience-pill">
                  <Award size={16} /> Arenas & Centros de Treinamento
                </div>
                <div className="audience-pill">
                  <HardHat size={16} /> Construtoras & Incorporadoras
                </div>
                <div className="audience-pill">
                  <Compass size={16} /> Escolas, Faculdades & Universidades
                </div>
                <div className="audience-pill">
                  <MapPin size={16} /> Hotéis, Resorts & Espaços Públicos
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE FAQ */}
        <FaqSection />

        {/* QUOTE FORM & DIRECT CONTACT */}
        <section className="section quote-section-wrapper" id="contato">
          <div className="section-container">
            <QuoteForm />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="footer-top">
          <div className="footer-brand-col">
            <Image
              src="/images/logo-header.png"
              alt="Pratika Sport"
              width={204}
              height={68}
              className="footer-logo"
            />
            <p className="footer-brand-desc">
              Especialistas em construção, reforma e revitalização de quadras
              esportivas, campos society e pisos modulares em todo o Brasil.
            </p>
            <div className="footer-contact-items">
              <a href="tel:+5515997157642" className="footer-contact-link">
                <Phone size={15} /> (15) 99715-7642
              </a>
              <span className="footer-contact-link">
                <MapPin size={15} /> São Paulo · Atendimento Nacional
              </span>
            </div>

            <div
              className="footer-social-links"
              aria-label="Redes sociais da Pratika Sport"
            >
              <a
                href="https://www.instagram.com/pratikasport.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                <Camera size={17} />
              </a>
              <a
                href="https://wa.me/5515997157642?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20equipe%20da%20Pratika%20Sport."
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="WhatsApp"
              >
                <MessageCircle size={17} />
              </a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Navegação</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#inicio">Início</a>
              </li>
              <li>
                <a href="#servicos">Especialidades</a>
              </li>
              <li>
                <a href="#superficies">Guia de Pisos</a>
              </li>
              <li>
                <a href="#processo">Como Funciona</a>
              </li>
              <li>
                <a href="#faq">Perguntas Frequentes</a>
              </li>
              <li>
                <a href="#orcamento">Solicitar Orçamento</a>
              </li>
              {/* oxlint-disable-next-line next/no-html-link-for-pages -- Legal pages are static HTML, outside the React router. */}
              <li><a href="/politica-privacidade.html">Privacidade</a></li>
              {/* oxlint-disable-next-line next/no-html-link-for-pages -- Legal pages are static HTML, outside the React router. */}
              <li><a href="/termos-servico.html">Termos de uso</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Modalidades</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/pages/servicos/quadras-poliesportivas.html">
                  Quadras Poliesportivas
                </Link>
              </li>
              <li>
                <Link href="/pages/servicos/quadra-de-tenis.html">
                  Quadras de Tênis
                </Link>
              </li>
              <li>
                <Link href="/pages/servicos/quadra-de-beach-tennis.html">
                  Beach Tennis
                </Link>
              </li>
              <li>
                <Link href="/pages/servicos/campo-de-futebol.html">
                  Campos de Futebol Society
                </Link>
              </li>
              <li>
                <Link href="/pages/blog/melhor-piso-para-quadra-esportiva.html">
                  Pisos Esportivos
                </Link>
              </li>
              <li>
                <Link href="/pages/servicos/reforma-de-quadras.html">
                  Reforma & Pintura
                </Link>
              </li>
              <li>
                <Link href="/pages/estados/sao-paulo">
                  Atendimento em São Paulo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-credits">
          <div className="footer-divider" />
          <div className="footer-bythe-promo">
            <a
              href="https://bythe.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-bythe-link"
              aria-label="Visitar o site da BYTHE Tech"
            >
              <span className="footer-bythe-label">Desenvolvido por</span>
              <Image
                src="/images/bythe-logo.svg"
                alt="BYTHE Tech"
                width={74}
                height={24}
                className="footer-bythe-logo"
              />
            </a>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Pratika Sport. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTON (WHATSAPP FAB) */}
      <FloatingWhatsApp />
    </div>
  );
}

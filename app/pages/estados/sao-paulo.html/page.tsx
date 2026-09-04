import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import QuoteForm from '@/components/QuoteForm';
import StructuredData from '@/components/StructuredData';
import {
  contact,
  organizationSchema,
  serviceSchema,
  siteUrl,
  websiteSchema,
} from '@/lib/seo';

const pageTitle = 'Construção, Reforma e Manutenção de Quadras em SP | Pratika Sport';
const pageDescription = 'Construção, reforma e manutenção de quadras esportivas em São Paulo. Poliesportivas, tênis, beach tennis, society e pisos. Solicite uma avaliação técnica.';

const localFaqItems = [
  {
    question: 'Quanto custa construir ou reformar uma quadra em São Paulo?',
    answer: 'O valor depende da modalidade, dimensões, base, drenagem, piso, iluminação, alambrados e condições de acesso. A estimativa é preparada para cada espaço.',
  },
  {
    question: 'A Pratika Sport atende capital, Grande SP e interior?',
    answer: 'Sim. A viabilidade de atendimento é confirmada conforme o endereço e o escopo, com prioridade operacional no estado de São Paulo.',
  },
  {
    question: 'É possível recuperar uma quadra com trincas e poças?',
    answer: 'Em muitos casos, sim. Primeiro é necessário identificar a origem das fissuras, dos desníveis e do acúmulo de água para definir a correção adequada.',
  },
  {
    question: 'Vocês fazem projetos para condomínios e clubes?',
    answer: 'Sim. O projeto considera múltiplas modalidades, segurança, facilidade de limpeza, drenagem e manutenção futura.',
  },
];

const serviceCards = [
  {
    title: 'Quadras Poliesportivas',
    eyebrow: 'Multiuso e condomínios',
    description: 'Estruturas para futsal, basquete, vôlei e handebol com piso de alta performance, iluminação LED e alambrados reforçados.',
    icon: Building2,
  },
  {
    title: 'Quadras de Tênis',
    eyebrow: 'Oficial e recreativo',
    description: 'Saibro, piso rápido acrílico e grama sintética, sempre ajustados ao perfil do espaço e ao padrão de uso.',
    icon: Star,
  },
  {
    title: 'Beach Tennis & Areia',
    eyebrow: 'Modalidades de areia',
    description: 'Sistema com drenagem, areia tratada, cercamentos e postes oficiais para quadras de beach tennis e esportes similares.',
    icon: Sparkles,
  },
  {
    title: 'Campos de Futebol Society',
    eyebrow: 'Grama sintética',
    description: 'Solução completa com base amortecedora, drenagem e fechamento perimetral para uso intenso e seguro.',
    icon: Users,
  },
  {
    title: 'Reforma e Revitalização',
    eyebrow: 'Manutenção & pintura',
    description: 'Correção de fissuras, regularização de base, pintura técnica, demarcação e troca de acessórios esportivos.',
    icon: ShieldCheck,
  },
  {
    title: 'Pisos Modulares Esportivos',
    eyebrow: 'Interno e externo',
    description: 'Placas de alta resistência, drenagem instantânea e proteção UV para áreas que exigem durabilidade e baixa manutenção.',
    icon: CheckCircle2,
  },
];

const surfaceCards = [
  {
    name: 'Piso Modular Esportivo',
    type: 'Polipropileno Alto Impacto',
    desc: 'Amortecimento, drenagem automática e manutenção reduzida para áreas internas e externas.',
  },
  {
    name: 'Piso Acrílico / Asfáltico',
    type: 'Piso Rápido / Emborrachado',
    desc: 'Camadas uniformes com boa velocidade de jogo, estética forte e resistência climática.',
  },
  {
    name: 'Saibro Clássico',
    type: 'Composto Cerâmico & Pó de Telha',
    desc: 'Piso tradicional para tênis com conforto, deslizamento controlado e manutenção específica.',
  },
  {
    name: 'Grama Sintética Esportiva',
    type: 'Fibras Fibriladas / Monofilamento',
    desc: 'Excelente para campos society e minicampos, com tração, baixa irrigação e uso contínuo.',
  },
  {
    name: 'Areia Tratada e Selecionada',
    type: 'Granulometria Especial',
    desc: 'Areia lavada para beach tennis e esportes de praia, com conforto e menor acúmulo de poeira.',
  },
  {
    name: 'Bases em Concreto / Asfalto',
    type: 'Fundação e Regularização',
    desc: 'Camadas estruturais com caimento correto, juntas de dilatação e reforço para escoamento de água.',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Diagnóstico técnico',
    desc: 'Cidade, modalidade, medidas, uso previsto e estado atual do espaço.',
  },
  {
    step: '02',
    title: 'Escopo e proposta',
    desc: 'Base, drenagem, piso, iluminação, alambrado e cronograma definidos com clareza.',
  },
  {
    step: '03',
    title: 'Execução acompanhada',
    desc: 'Obra orientada por processo técnico, com comunicação objetiva e controle de qualidade.',
  },
  {
    step: '04',
    title: 'Entrega e orientação',
    desc: 'Conferência final, recomendações de conservação e próximos passos para uso seguro.',
  },
];

const testimonials = [
  {
    name: 'Carlos Silva',
    role: 'Síndico — Condomínio Residencial',
    text: 'A quadra do condomínio ficou com acabamento muito superior ao esperado. A equipe foi organizada e entregou dentro do combinado.',
  },
  {
    name: 'Ana Paula Mendes',
    role: 'Diretora Esportiva — Clube Campestre',
    text: 'Contratamos para duas quadras de beach tennis e o resultado ficou consistente em drenagem, nivelamento e iluminação.',
  },
  {
    name: 'Roberto Costa',
    role: 'Centro de Treinamento de Tênis',
    text: 'A reforma devolveu padrão técnico ao espaço e melhorou muito a experiência de jogo para os atletas.',
  },
];

const localFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: localFaqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteUrl}/pages/estados/sao-paulo#webpage`,
  name: pageTitle,
  description: pageDescription,
  url: `${siteUrl}/pages/estados/sao-paulo`,
  inLanguage: 'pt-BR',
  isPartOf: { '@id': `${siteUrl}/#website` },
  about: { '@id': `${siteUrl}/#organization` },
};

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: '/pages/estados/sao-paulo',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteUrl}/pages/estados/sao-paulo`,
    siteName: 'Pratika Sport',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/images/construcao-de-quadras-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Quadra esportiva construída pela Pratika Sport em São Paulo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['/images/construcao-de-quadras-1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'BR-SP',
    'geo.placename': 'São Paulo',
  },
};

export default function SaoPauloPage() {
  return (
    <div className="site-wrapper">
      <StructuredData data={[organizationSchema, websiteSchema, serviceSchema, pageSchema, localFaqSchema]} />
      <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a>
      <SiteHeader />

      <main id="conteudo-principal">
        <section className="hero" id="inicio">
          <Image
            className="hero-image"
            src="/images/construcao-de-quadras-1.jpg"
            alt="Quadra esportiva profissional em São Paulo"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-overlay" />

          <div className="hero-container">
            <div className="hero-badge">
              <Sparkles size={15} />
              <span>São Paulo • Atendimento prioritário</span>
            </div>

            <h1 className="hero-title">
              Construção, reforma e manutenção de quadras em São Paulo com padrão técnico.
            </h1>

            <p className="hero-description">
              Projetos para condomínios, clubes, escolas, hotéis, arenas e centros de treinamento.
              A Pratika Sport atua com foco em desempenho, drenagem, segurança e durabilidade.
            </p>

            <div className="hero-actions">
              <a
                className="btn btn-primary"
                href={`https://wa.me/${contact.phone.replace('+', '')}?text=${encodeURIComponent('Olá! Gostaria de uma avaliação técnica para um projeto de quadra em São Paulo.')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Solicitar avaliação técnica</span>
                <ArrowRight aria-hidden="true" size={18} />
              </a>

              <a className="btn btn-glass" href="#orcamento">
                <span>Ver formulário de orçamento</span>
              </a>
            </div>

            <div className="hero-highlights" aria-label="Destaques do atendimento em São Paulo">
              <div className="hero-highlight-item">
                <CheckCircle2 size={16} />
                <span>Construção, reforma e manutenção</span>
              </div>
              <div className="hero-highlight-item">
                <MapPin size={16} />
                <span>Capital, Grande SP, interior e litoral</span>
              </div>
              <div className="hero-highlight-item">
                <ShieldCheck size={16} />
                <span>Escopo técnico e atendimento consultivo</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="servicos">
          <div className="container">
            <div className="section-heading">
              <div>
                <small className="section-eyebrow">SOLUÇÕES PARA SÃO PAULO</small>
                <h2>Soluções completas para diferentes projetos esportivos.</h2>
              </div>
              <p>
                Construção, reforma e manutenção planejadas conforme a modalidade, o espaço disponível e a intensidade de uso.
              </p>
            </div>

            <div className="services-grid">
              {serviceCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article key={card.title} className="service-card">
                    <div className="service-card-icon">
                      <Icon size={22} />
                    </div>
                    <p className="service-card-category">{card.eyebrow}</p>
                    <h3 className="service-card-title">{card.title}</h3>
                    <p className="service-card-description">{card.description}</p>
                    <a className="service-card-action" href="#orcamento">
                      Solicitar orçamento para este tipo de obra
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" id="diferenciais">
          <div className="container">
            <div className="section-heading">
              <div>
                <small className="section-eyebrow">POR QUE A PRATIKA</small>
                <h2>Decisões técnicas que protegem o investimento na quadra.</h2>
              </div>
              <p>
                Cada recomendação considera a estrutura existente, a rotina do espaço e o custo de conservação ao longo do tempo.
              </p>
            </div>

            <div className="surface-grid">
              <div className="surface-card">
                <div className="surface-icon">
                  <Building2 size={22} />
                </div>
                <h3>Diagnóstico antes da proposta</h3>
                <p>O orçamento começa pela análise do terreno, da base existente, da drenagem e da modalidade desejada.</p>
              </div>
              <div className="surface-card">
                <div className="surface-icon">
                  <ShieldCheck size={22} />
                </div>
                <h3>Segurança e durabilidade</h3>
                <p>As escolhas priorizam conforto de uso, manutenção previsível e resistência ao uso intenso.</p>
              </div>
              <div className="surface-card">
                <div className="surface-icon">
                  <MapPin size={22} />
                </div>
                <h3>Atuação no estado de SP</h3>
                <p>Capital, Grande São Paulo, ABC, litoral e interior entram no planejamento conforme a viabilidade da obra.</p>
              </div>
              <div className="surface-card">
                <div className="surface-icon">
                  <Users size={22} />
                </div>
                <h3>Atendimento consultivo</h3>
                <p>Condomínios, clubes, escolas, hotéis e arenas recebem recomendações diferentes porque o uso também é diferente.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="superficies">
          <div className="container">
            <div className="section-heading">
              <div>
                <small className="section-eyebrow">PISOS E SUPERFÍCIES</small>
                <h2>Em São Paulo, a superfície certa muda o desempenho e o custo de manutenção.</h2>
              </div>
              <p>
                A decisão técnica precisa considerar chuva, drenagem, intensidade de uso e expectativa de manutenção. Aqui estão as combinações mais buscadas.
              </p>
            </div>

            <div className="surface-grid">
              {surfaceCards.map((surface) => (
                <div key={surface.name} className="surface-card">
                  <div className="surface-icon">
                    <CheckCircle2 size={22} />
                  </div>
                  <h3>{surface.name}</h3>
                  <p className="surface-type">{surface.type}</p>
                  <p>{surface.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dark-section" id="processo">
          <div className="container">
            <div className="section-heading light">
              <div>
                <small className="section-eyebrow">COMO FUNCIONA</small>
                <h2>Processo simples para o usuário e rigoroso para a obra.</h2>
              </div>
              <p>
                Cada etapa é explicada com clareza para que o cliente acompanhe o projeto do diagnóstico à entrega.
              </p>
            </div>

            <ol className="steps">
              {processSteps.map((step) => (
                <li key={step.step} className="step-card">
                  <b>{step.step}</b>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="depoimentos">
          <div className="container">
            <div className="section-heading">
              <div>
                <small className="section-eyebrow">PROVA SOCIAL</small>
                <h2>Experiências de quem já transformou seu espaço esportivo.</h2>
              </div>
              <p>
                Conheça a experiência de clientes atendidos em diferentes tipos de quadras e empreendimentos.
              </p>
            </div>

            <div className="testimonials-grid">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="testimonial-card">
                  <div className="testimonial-rating" aria-label="5 estrelas">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <blockquote>{testimonial.text}</blockquote>
                  <div className="testimonial-meta">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="faq-wrapper">
            <div className="faq-header">
              <div className="faq-badge">
                <Sparkles size={16} />
                <span>Perguntas frequentes em SP</span>
              </div>
              <h2 className="faq-title">Dúvidas comuns antes do orçamento</h2>
              <p className="faq-desc">
                Respostas diretas para ajudar o usuário a avançar sem ruído e sem promessas genéricas.
              </p>
            </div>

            <div className="faq-list">
              {localFaqItems.map((item, index) => (
                <details key={item.question} className="faq-item" open={index === 0}>
                  <summary className="faq-question-btn">
                    <span className="faq-q-text">{item.question}</span>
                  </summary>
                  <div className="faq-answer-collapse show">
                    <div className="faq-answer-content">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="section-heading">
              <div>
                <small className="section-eyebrow">ORÇAMENTO EM SÃO PAULO</small>
                <h2>Fale com a equipe e receba uma direção técnica para o seu espaço.</h2>
              </div>
              <p>
                Conte onde será a obra, qual modalidade deseja e as condições atuais do espaço para receber uma orientação inicial.
              </p>
            </div>

            <QuoteForm />
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <div className="footer-top container">
          <div className="footer-brand-block">
            <Link href="/" className="footer-logo-link" aria-label="Ir para a página inicial da Pratika Sport">
              <Image src="/images/logo-header.png" alt="Pratika Sport" width={186} height={62} className="footer-logo" />
            </Link>
            <p className="footer-brand-desc">
              Construção, reforma e manutenção de quadras esportivas em São Paulo e todo o Brasil.
            </p>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Navegação</h4>
            <ul className="footer-links-list">
              <li><a href="#inicio">Início</a></li>
              <li><a href="#servicos">Serviços</a></li>
              <li><a href="#diferenciais">Diferenciais</a></li>
              <li><a href="#orcamento">Orçamento</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Contato</h4>
            <ul className="footer-links-list">
              <li><a href={`tel:${contact.phone}`}>{contact.displayPhone}</a></li>
              <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><a href={contact.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-credits">
          <div className="footer-divider" />
          <div className="footer-bottom container">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Pratika Sport · Página dedicada a São Paulo.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
  Star,
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

const services = [
  {
    title: 'Quadras Poliesportivas',
    category: 'Multiuso & Condomínios',
    description: 'Projetadas para futsal, basquete, vôlei e handebol com piso de alta absorção de impacto, iluminação LED e alambrados reforçados.',
    image: '/images/hero-quadra.jpg',
    waText: 'Olá! Gostaria de um orçamento para construção ou reforma de Quadra Poliesportiva.',
  },
  {
    title: 'Quadras de Tênis',
    category: 'Oficial & Recreativo',
    description: 'Superfícies em saibro tradicional, piso rápido acrílico ou grama sintética, respeitando normas técnicas da CBT e ITF.',
    image: '/images/quadra-tenis.jpg',
    waText: 'Olá! Gostaria de um orçamento para Quadra de Tênis.',
  },
  {
    title: 'Beach Tennis & Areia',
    category: 'Modalidades de Areia',
    description: 'Sistema completo com drenagem profunda, areia tratada de granulometria ideal, cercamentos e postes oficiais.',
    image: '/images/beach-tennis.jpeg',
    waText: 'Olá! Gostaria de um orçamento para Quadra de Beach Tennis.',
  },
  {
    title: 'Campos de Futebol Society',
    category: 'Grama Sintética',
    description: 'Grama sintética monofilamento de alta densidade com base amortecedora, drenagem ágil e fechamento perimetral com redes.',
    image: '/images/campo-futebol.jpg',
    waText: 'Olá! Gostaria de um orçamento para Campo de Futebol Society.',
  },
  {
    title: 'Pisos Modulares Esportivos',
    category: 'Interno e Externo',
    description: 'Placas modulares em polipropileno de alta resistência, antiderrapantes, com drenagem instantânea e proteção UV.',
    image: '/images/piso-modular-esportivo-area-externa-2.jpg',
    waText: 'Olá! Gostaria de informações sobre Piso Modular Esportivo.',
  },
  {
    title: 'Reforma e Revitalização',
    category: 'Manutenção & Pintura',
    description: 'Correção de fissuras, regularização de base, pintura epóxi/acrílica, demarcação técnica e troca de acessórios esportivos.',
    image: '/images/construcao-de-quadras-4.jpg',
    waText: 'Olá! Gostaria de um diagnóstico e orçamento para Reforma de Quadra.',
  },
];

const surfaces = [
  {
    name: 'Piso Modular Esportivo',
    type: 'Polipropileno Alto Impacto',
    desc: 'Excelente amortecimento para articulações, drenagem automática contra chuva e custo de manutenção mínimo. Ideal para áreas externas e internas.',
    tag: 'Alta Durabilidade',
  },
  {
    name: 'Piso Acrílico / Asfáltico',
    type: 'Piso Rápido / Emborrachado',
    desc: 'Camadas de resina acrílica sobre asfalto ou concreto nivelado. Velocidade de jogo uniforme, estética vibrante e alta resistência climática.',
    tag: 'Padrão Oficial',
  },
  {
    name: 'Saibro Clássico',
    type: 'Composto Cerâmico & Pó de Telha',
    desc: 'Piso tradicional para tênis com deslizamento controlado, conforto muscular e sistema de irrigação/drenagem especializada.',
    tag: 'Máximo Conforto',
  },
  {
    name: 'Grama Sintética Esportiva',
    type: 'Fibras Fibriladas / Monofilamento',
    desc: 'Uso contínuo para campos society e minicampos, dispensando corte e irrigação constante com excelente tração e segurança.',
    tag: 'Society & Futebol',
  },
  {
    name: 'Areia Tratada e Selecionada',
    type: 'Granulometria Especial',
    desc: 'Areia lavada e selecionada para Beach Tennis, Futevôlei e Vôlei de Praia, sem aquecimento excessivo nem acúmulo de poeira.',
    tag: 'Beach Sports',
  },
  {
    name: 'Bases Estruturais em Concreto / Asfalto',
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

const testimonials = [
  {
    name: 'Carlos Silva',
    role: 'Síndico — Condomínio Residencial',
    image: '/images/9-300x300.png',
    text: 'A Pratika Sport superou todas as nossas expectativas. A quadra poliesportiva do nosso condomínio ficou perfeita, com acabamento impecável e entrega antes do prazo acordado.',
  },
  {
    name: 'Ana Paula Mendes',
    role: 'Diretora Esportiva — Clube Campestre',
    image: '/images/11-300x300.png',
    text: 'Contratamos para construir duas quadras de beach tennis e o resultado foi excepcional. Profissionalismo absoluto desde o projeto de drenagem até a iluminação em LED.',
  },
  {
    name: 'Roberto Costa',
    role: 'Proprietário — Centro de Treinamento de Tênis',
    image: '/images/7-300x300.png',
    text: 'Reformamos nossa quadra de tênis que estava deteriorada há anos. A equipe da Pratika fez uma recuperação de base impecável e a pintura ficou padrão de torneio internacional.',
  },
  {
    name: 'Fernando Oliveira',
    role: 'Gestor — Arena de Futebol Society',
    image: '/images/12-300x300.png',
    text: 'O campo society construído pela Pratika é referência na nossa cidade. A grama sintética de alta densidade e o amortecimento recebem elogios diários dos clientes.',
  },
  {
    name: 'Mariana Santos',
    role: 'Administradora — Hotel Fazenda',
    image: '/images/13-300x300.png',
    text: 'Profissionalismo exemplar! Desde o primeiro contato até a entrega, tudo foi feito com muita competência. Nossa quadra de tênis ficou incrível!',
  },
  {
    name: 'Paulo Ricardo',
    role: 'Presidente — Country Club',
    image: '/images/14-300x300.png',
    text: 'Construímos três quadras de beach tennis e o retorno foi imediato. Os associados adoraram! A Pratika Sport entregou tudo conforme prometido.',
  },
];

export default function Home() {
  return (
    <div className="site-wrapper">
      <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a>
      {/* Responsive Sticky Header */}
      <SiteHeader />

      <main id="conteudo-principal">
        {/* HERO SECTION */}
        <section className="hero" id="inicio">
          <Image
            className="hero-image"
            src="/images/hero-quadra.jpg"
            alt="Quadra poliesportiva profissional construída pela Pratika Sport"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-overlay" />

          <div className="hero-container">
            <div className="hero-badge">
              <Sparkles size={15} />
              <span>Construção • Reforma • Manutenção</span>
            </div>

            <h1 className="hero-title">
              Espaços esportivos de alta performance, do projeto à entrega.
            </h1>

            <p className="hero-description">
              Soluções completas de engenharia esportiva para condomínios, clubes, escolas, centros de treinamento, empresas e residências em todo o Brasil.
            </p>

            <div className="hero-actions">
              <a
                className="btn btn-primary"
                href="https://wa.me/551391919194?text=Ol%C3%A1%21%20Gostaria%20de%20solicitar%20uma%20avalia%C3%A7%C3%A3o%20e%20or%C3%A7amento%20para%20meu%20projeto."
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Solicitar Orçamento Grátis</span>
                <ArrowRight aria-hidden="true" size={18} />
              </a>

              <a className="btn btn-glass" href="#servicos">
                <span>Conhecer Soluções</span>
              </a>
            </div>

            <div className="hero-socials" aria-label="Redes sociais da Pratika Sport">
              <a
                href="https://www.instagram.com/pratikasport.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="Instagram da Pratika Sport"
              >
                <Camera size={18} />
                <span>Instagram</span>
              </a>

              <a
                href="https://wa.me/551391919194?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20equipe%20da%20Pratika%20Sport."
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="WhatsApp da Pratika Sport"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="hero-highlights">
              <div className="hero-highlight-item">
                <ShieldCheck size={18} className="text-accent" />
                <span>Garantia de Obra Estrutural</span>
              </div>
              <div className="hero-highlight-item">
                <CheckCircle2 size={18} className="text-accent" />
                <span>Medidas & Normas Oficiais</span>
              </div>
              <div className="hero-highlight-item">
                <MapPin size={18} className="text-accent" />
                <span>Atendimento Nacional</span>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP METRICS */}
        <section className="trust-strip" id="diferenciais" aria-label="Métricas e Diferenciais">
          <div className="trust-grid">
            <div className="trust-card">
              <div className="trust-icon-box"><Award size={24} /></div>
              <div>
                <strong className="trust-number">+20 Anos</strong>
                <p className="trust-label">De experiência e solidez técnica</p>
              </div>
            </div>

            <div className="trust-card">
              <div className="trust-icon-box"><FileCheck2 size={24} /></div>
              <div>
                <strong className="trust-number">+850 Obras</strong>
                <p className="trust-label">Quadras e campos entregues</p>
              </div>
            </div>

            <div className="trust-card">
              <div className="trust-icon-box"><MapPin size={24} /></div>
              <div>
                <strong className="trust-number">26 Estados</strong>
                <p className="trust-label">Atendimento em todo o Brasil</p>
              </div>
            </div>

            <div className="trust-card">
              <div className="trust-icon-box"><ShieldCheck size={24} /></div>
              <div>
                <strong className="trust-number">100% Garantia</strong>
                <p className="trust-label">Materiais homologados de alta durabilidade</p>
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
                <h2 className="section-title">Estruturas feitas para durar, jogar e encantar.</h2>
              </div>
              <p className="section-subtitle">
                Do planejamento inicial à demarcação final: oferecemos soluções completas com materiais certificados e mão de obra especializada para cada modalidade.
              </p>
            </div>

            <div className="service-grid">
              {services.map((service, index) => (
                <article className="service-card" key={index}>
                  <div className="service-image-wrapper">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="service-img"
                    />
                    <div className="service-badge-pill">{service.category}</div>
                    <div className="service-overlay-gradient" />
                  </div>

                  <div className="service-card-body">
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-desc">{service.description}</p>

                    <a
                      href={`https://wa.me/551391919194?text=${encodeURIComponent(service.waText)}`}
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
                <span className="section-eyebrow text-accent">Pisos & Revestimentos</span>
                <h2 className="section-title text-white">A superfície certa para cada intensidade de jogo.</h2>
              </div>
              <p className="section-subtitle text-slate-300">
                A escolha do piso define a drenagem, amortecimento, manutenção e a velocidade da partida. Conheça as opções que instalamos:
              </p>
            </div>

            <div className="surfaces-grid">
              {surfaces.map((surf, idx) => (
                <div className="surface-card" key={idx}>
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
                <h2 className="section-title">Da primeira conversa à quadra pronta para o jogo.</h2>
              </div>
              <p className="section-subtitle">
                Nosso processo evita retrabalho, surpresas orçamentárias e garante conformidade com as dimensões e normas das federações esportivas.
              </p>
            </div>

            <div className="steps-grid">
              {steps.map((item, idx) => (
                <div className="step-card" key={idx}>
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
            <div className="audience-card-wrapper">
              <div className="audience-header">
                <span className="section-eyebrow">Segmentos Atendidos</span>
                <h2 className="audience-title">Projetos sob medida para cada tipo de cliente</h2>
              </div>

              <div className="audience-tags">
                <div className="audience-pill"><Building2 size={16} /> Condomínios Residenciais</div>
                <div className="audience-pill"><Users size={16} /> Clubes Esportivos & Associações</div>
                <div className="audience-pill"><Award size={16} /> Arenas & Centros de Treinamento</div>
                <div className="audience-pill"><HardHat size={16} /> Construtoras & Incorporadoras</div>
                <div className="audience-pill"><Compass size={16} /> Escolas, Faculdades & Universidades</div>
                <div className="audience-pill"><MapPin size={16} /> Hotéis, Resorts & Espaços Públicos</div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section testimonials-section" id="depoimentos">
          <div className="section-container">
            <div className="section-header-block">
              <div>
                <span className="section-eyebrow">Depoimentos & Confiança</span>
                <h2 className="section-title">O que dizem os clientes da Pratika Sport.</h2>
              </div>
              <p className="section-subtitle">
                Mais de duas décadas construindo parcerias duradouras com síndicos, diretores de clubes e investidores esportivos.
              </p>
            </div>

            <div className="testimonials-marquee" aria-label="Carrossel de depoimentos">
              <div className="testimonials-track">
                {[...testimonials, ...testimonials].map((test, index) => (
                  <div className="testimonial-card" key={`${test.name}-${index}`}>
                    <div className="stars-row" aria-label="Avaliação 5 estrelas">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={17} className="star-icon" fill="currentColor" />
                      ))}
                    </div>

                    <p className="testimonial-text">“{test.text}”</p>

                    <div className="testimonial-author">
                      <div className="author-avatar-box">
                        <Image
                          src={test.image}
                          alt={test.name}
                          width={46}
                          height={46}
                          className="author-avatar"
                        />
                      </div>
                      <div>
                        <strong className="author-name">{test.name}</strong>
                        <span className="author-role">{test.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
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
              src="/images/logo-footer-colored-globe.png"
              alt="Pratika Sport"
              width={204}
              height={68}
              className="footer-logo"
            />
            <p className="footer-brand-desc">
              Especialistas em construção, reforma e revitalização de quadras esportivas, campos society e pisos modulares em todo o Brasil.
            </p>
            <div className="footer-contact-items">
              <a href="tel:+551391919194" className="footer-contact-link">
                <Phone size={15} /> (13) 9191-9194
              </a>
              <span className="footer-contact-link">
                <MapPin size={15} /> São Paulo · Atendimento Nacional
              </span>
            </div>

            <div className="footer-social-links" aria-label="Redes sociais da Pratika Sport">
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
                href="https://wa.me/551391919194?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20equipe%20da%20Pratika%20Sport."
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
              <li><a href="#inicio">Início</a></li>
              <li><a href="#servicos">Especialidades</a></li>
              <li><a href="#superficies">Guia de Pisos</a></li>
              <li><a href="#processo">Como Funciona</a></li>
              <li><a href="#depoimentos">Depoimentos</a></li>
              <li><a href="#faq">Perguntas Frequentes</a></li>
              <li><a href="#orcamento">Solicitar Orçamento</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Modalidades</h4>
            <ul className="footer-links-list">
              <li><a href="#servicos">Quadras Poliesportivas</a></li>
              <li><a href="#servicos">Quadras de Tênis</a></li>
              <li><a href="#servicos">Beach Tennis</a></li>
              <li><a href="#servicos">Campos de Futebol Society</a></li>
              <li><a href="#servicos">Pisos Modulares</a></li>
              <li><a href="#servicos">Reforma & Pintura</a></li>
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
            <p className="footer-copyright">© {new Date().getFullYear()} Pratika Sport. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTON (WHATSAPP FAB) */}
      <FloatingWhatsApp />
    </div>
  );
}

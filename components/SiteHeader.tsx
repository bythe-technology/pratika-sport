'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, MessageCircle, Phone, ArrowUpRight, Sparkles } from 'lucide-react';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className={`floating-header-wrapper ${isScrolled ? 'is-scrolled' : ''}`}>
      <header className="floating-header-pill">
        {/* Brand Logo with Glow */}
        <a href="#inicio" className="floating-brand-link" onClick={closeMenu} aria-label="Pratika Sport - Início">
          <Image
            src="/images/logo-header.png"
            alt="Pratika Sport"
            width={186}
            height={62}
            priority
            className="floating-brand-logo"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="floating-desktop-nav" aria-label="Navegação principal">
          <a href="#servicos" className="floating-nav-link">
            <span>Serviços</span>
          </a>
          <a href="#diferenciais" className="floating-nav-link">
            <span>Diferenciais</span>
          </a>
          <a href="#superficies" className="floating-nav-link">
            <span>Superfícies</span>
          </a>
          <a href="#processo" className="floating-nav-link">
            <span>Como Funciona</span>
          </a>
          <a href="#depoimentos" className="floating-nav-link">
            <span>Depoimentos</span>
          </a>
          <a href="#faq" className="floating-nav-link">
            <span>Dúvidas</span>
          </a>
          <Link href="/pages/estados/sao-paulo" className="floating-nav-link">
            <span>São Paulo</span>
          </Link>
        </nav>

        {/* CTA Button & Mobile Toggle */}
        <div className="floating-actions">
          <a
            href="https://wa.me/5515997157642?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20quadra%20esportiva."
            target="_blank"
            rel="noopener noreferrer"
            className="floating-cta-btn"
          >
            <MessageCircle size={17} aria-hidden="true" className="shrink-0" />
            <span className="cta-text">Solicitar Orçamento</span>
          </a>

          <button
            type="button"
            className="floating-mobile-toggle"
            onClick={toggleMenu}
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={mobileMenuOpen}
            aria-controls="menu-navegacao-mobile"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Floating Mobile Menu Dropdown */}
      <div id="menu-navegacao-mobile" className={`floating-mobile-menu ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <div className="floating-mobile-card">
          <div className="mobile-card-gradient-bar" />
          
          <nav className="floating-mobile-nav" aria-label="Navegação mobile">
            <a href="#inicio" onClick={closeMenu} className="floating-mobile-link">
              <span>Início</span>
              <ArrowUpRight size={17} className="mobile-link-arrow" />
            </a>
            <a href="#servicos" onClick={closeMenu} className="floating-mobile-link">
              <span>Especialidades & Quadras</span>
              <ArrowUpRight size={17} className="mobile-link-arrow" />
            </a>
            <a href="#diferenciais" onClick={closeMenu} className="floating-mobile-link">
              <span>Por que a Pratika</span>
              <ArrowUpRight size={17} className="mobile-link-arrow" />
            </a>
            <a href="#superficies" onClick={closeMenu} className="floating-mobile-link">
              <span>Pisos & Superfícies</span>
              <ArrowUpRight size={17} className="mobile-link-arrow" />
            </a>
            <a href="#processo" onClick={closeMenu} className="floating-mobile-link">
              <span>Como Funciona (Etapas)</span>
              <ArrowUpRight size={17} className="mobile-link-arrow" />
            </a>
            <a href="#depoimentos" onClick={closeMenu} className="floating-mobile-link">
              <span>Depoimentos de Clientes</span>
              <ArrowUpRight size={17} className="mobile-link-arrow" />
            </a>
            <a href="#faq" onClick={closeMenu} className="floating-mobile-link">
              <span>Perguntas Frequentes</span>
              <ArrowUpRight size={17} className="mobile-link-arrow" />
            </a>
            <Link href="/pages/estados/sao-paulo" onClick={closeMenu} className="floating-mobile-link">
              <span>São Paulo</span>
              <ArrowUpRight size={17} className="mobile-link-arrow" />
            </Link>
            <a href="#orcamento" onClick={closeMenu} className="floating-mobile-link highlight-gradient">
              <span className="flex items-center gap-2">
                <Sparkles size={16} />
                Fazer Orçamento Online
              </span>
              <ArrowUpRight size={17} />
            </a>
          </nav>

          <div className="floating-mobile-footer">
            <div className="mobile-contact-chips">
              <a href="tel:+5515997157642" className="mobile-chip phone-chip">
                <Phone size={15} />
                <span>(15) 99715-7642</span>
              </a>
              <a
                href="https://wa.me/5515997157642?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20equipe%20da%20Pratika%20Sport."
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-chip wa-chip"
              >
                <MessageCircle size={15} />
                <span>Falar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

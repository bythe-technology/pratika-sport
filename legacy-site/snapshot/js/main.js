/**
 * PRATIKA SPORT - JavaScript Principal
 * Construcao e Reforma de Quadras Esportivas
 */

(function() {
  'use strict';

  // Utilitarios
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const on = (element, event, handler, options = false) => {
    if (element) element.addEventListener(event, handler, options);
  };

  // Header Scroll Effect
  const initHeaderScroll = () => {
    const header = $('.header');
    if (!header) return;

    const handleScroll = () => {
      if (window.pageYOffset > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    };

    on(window, 'scroll', handleScroll, { passive: true });
  };

  // Menu Mobile
  const initMobileMenu = () => {
    const menuToggle = $('.menu-toggle');
    const navMobile = $('.nav-mobile');
    
    if (!menuToggle || !navMobile) return;

const toggleMenu = () => {
  menuToggle.classList.toggle('active');
  navMobile.classList.toggle('active');

  const expanded = menuToggle.classList.contains('active');
  menuToggle.setAttribute("aria-expanded", expanded);
};
    on(menuToggle, 'click', toggleMenu);

    // Fechar menu ao clicar em link
    const navLinks = $$('.nav-mobile .nav-link');
    navLinks.forEach(link => {
      on(link, 'click', () => {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });

    // Fechar ao pressionar ESC
    on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && navMobile.classList.contains('active')) {
        toggleMenu();
      }
    });
  };

  // FAQ Accordion
  const initFaq = () => {
    const faqItems = $$('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      on(question, 'click', () => {
        const isActive = item.classList.contains('active');
        
        // Fechar todos os outros
        faqItems.forEach(otherItem => {
          if (otherItem !== item) otherItem.classList.remove('active');
        });
        
        item.classList.toggle('active', !isActive);
      });
    });
  };

  // Lazy Loading de Imagens
  const initLazyLoading = () => {
    const lazyImages = $$('img[data-src]');
    if (!lazyImages.length) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  };

  // Smooth Scroll para Ancoras
  const initSmoothScroll = () => {
    const anchorLinks = $$('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      on(link, 'click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        const target = $(href);
        if (!target) return;
        
        e.preventDefault();
        
        const headerOffset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  };

  // Contador de Numeros
  const initCounter = () => {
    const counters = $$('[data-counter]');
    if (!counters.length) return;

    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.counter, 10);
          const suffix = counter.dataset.suffix || '';
          const duration = parseInt(counter.dataset.duration, 10) || 2000;
          
          let start = 0;
          const increment = target / (duration / 16);
          
          const updateCounter = () => {
            start += increment;
            if (start < target) {
              counter.textContent = Math.floor(start) + suffix;
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + suffix;
            }
          };
          
          updateCounter();
          countObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => countObserver.observe(counter));
  };

// Formularios
const initForms = () => {
  const forms = $$('form[data-form]');
  
  forms.forEach(form => {
    on(form, 'submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : 'Enviar';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
      }

      const data = new FormData(form);

      const nome = data.get('nome') || '';
      const telefone = data.get('telefone') || '';
      const mensagem = data.get('mensagem') || '';

      const texto = `Olá! Vim pelo site da Pratika Sport.

Nome: ${nome}
Telefone: ${telefone}
Mensagem: ${mensagem}`;

      const numero = '551391919194';
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

      window.open(url, '_blank');

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }

      form.reset();
    });
  });
};

// Mascara de Telefone
const initPhoneMask = () => {
  const phoneInputs = $$('input[data-mask="phone"]');
  
  phoneInputs.forEach(input => {
    on(input, 'input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length > 11) value = value.slice(0, 11);
      
      if (value.length > 10) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (value.length > 6) {
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      } else if (value.length > 2) {
        value = value.replace(/(\d{2})(\d+)/, '($1) $2');
      }
      
      e.target.value = value;
    });
  });
};

// Inicializacao
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initFaq();
  initLazyLoading();
  initSmoothScroll();
  initCounter();
  initForms();
  initPhoneMask();
  
  console.log('%c Pratika Sport ', 'background: #00a651; color: #fff; padding: 8px 16px; font-size: 16px; font-weight: bold; border-radius: 4px;');
  console.log('%c Construcao e Reforma de Quadras Esportivas ', 'color: #00a651; font-size: 12px;');
});

})();
'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqItems } from '@/lib/seo';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-wrapper">
        <div className="faq-header">
          <div className="faq-badge">
            <HelpCircle size={16} />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="faq-title">Perguntas Frequentes</h2>
          <p className="faq-desc">
            Confira as principais respostas sobre planejamento, custos, prazos e materiais para o seu projeto esportivo.
          </p>
        </div>

        <div className="faq-list">
          {faqItems.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="faq-question-btn"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                >
                  <span className="faq-q-text">{faq.question}</span>
                  <span className={`faq-icon-wrapper ${isOpen ? 'rotate' : ''}`} aria-hidden="true">
                    <ChevronDown size={20} />
                  </span>
                </button>
                <section id={`faq-answer-${idx}`} aria-labelledby={`faq-question-${idx}`} className={`faq-answer-collapse ${isOpen ? 'show' : ''}`}>
                  <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                  </div>
                </section>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

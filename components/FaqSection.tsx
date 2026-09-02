'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'A Pratika Sport atende em quais regiões e estados?',
    answer: 'Atendemos em todo o território nacional. Desenvolvemos projetos em condomínios, clubes, centros de treinamento, escolas e residências particulares nos 26 estados brasileiros e Distrito Federal, com logística e equipes técnicas preparadas para deslocamento.',
  },
  {
    question: 'Quanto custa para construir uma quadra esportiva?',
    answer: 'O investimento varia conforme a modalidade (tênis, futebol society, beach tennis ou poliesportiva), as dimensões do terreno, as condições da base (terraplanagem e drenagem), tipo de piso escolhido, iluminação em LED e fechamentos (alambrados/redes). Fornecemos orçamentos sob medida detalhando cada etapa técnica.',
  },
  {
    question: 'É possível reformar ou revitalizar uma quadra antiga sem precisar refazer do zero?',
    answer: 'Sim! Realizamos um diagnóstico completo da base estrutural existente. Em grande parte dos casos, é possível recuperar trincas, corrigir desníveis, aplicar novo revestimento em piso acrílico ou modular e substituir redes, alambrados e iluminação com excelente custo-benefício.',
  },
  {
    question: 'Qual é o melhor piso para condomínios e áreas externas?',
    answer: 'Para áreas externas compartilhadas com alta intensidade de uso, os pisos modulares esportivos com amortecimento e os pisos asfálticos/acrílicos multicamadas são as melhores opções devido à durabilidade, secagem rápida após chuva e baixa necessidade de manutenção.',
  },
  {
    question: 'Qual o tempo médio de execução de uma quadra?',
    answer: 'Uma quadra padrão leva em média de 15 a 45 dias úteis para entrega completa (dependendo da complexidade da base, condições climáticas e tipo de piso escolhido). Nosso cronograma é acordado previamente em contrato.',
  },
  {
    question: 'Vocês oferecem garantia e laudo técnico da obra?',
    answer: 'Sim, todas as obras da Pratika Sport contam com garantia formal de execução estrutural, especificação técnica de materiais certificados e orientações completas para conservação e durabilidade prolongada.',
  },
];

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
          {faqs.map((faq, idx) => {
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

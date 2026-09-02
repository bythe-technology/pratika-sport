'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, MapPin, Sparkles } from 'lucide-react';

const sportsOptions = [
  'Quadra Poliesportiva',
  'Quadra de Tênis (Piso Rápido)',
  'Quadra de Tênis (Saibro)',
  'Quadra de Beach Tennis / Areia',
  'Campo de Futebol Society',
  'Piso Modular Esportivo',
  'Reforma / Pintura / Revitalização',
  'Outro Projeto Personalizado',
];

export default function QuoteForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [sport, setSport] = useState(sportsOptions[0]);
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `*Solicitação de Orçamento - Pratika Sport*\n\n` +
      `👤 *Nome:* ${name || 'Não informado'}\n` +
      `📱 *Telefone/WhatsApp:* ${phone || 'Não informado'}\n` +
      `📍 *Cidade/Estado:* ${city || 'Não informado'}\n` +
      `🏆 *Tipo de Projeto:* ${sport}\n` +
      `📝 *Detalhes:* ${details || 'Gostaria de saber mais sobre prazos, custos e opções.'}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/551391919194?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="quote-container" id="orcamento">
      <div className="quote-header-box">
        <div className="quote-eyebrow">
          <Sparkles size={16} />
          <span>Atendimento Rápido e Consultivo</span>
        </div>
        <h2 className="quote-title">Solicite uma proposta personalizada para sua obra.</h2>
        <p className="quote-subtitle">
          Preencha as informações básicas para que nossa equipe técnica prepare uma estimativa detalhada e sem compromisso para o seu espaço.
        </p>

        <div className="quote-direct-cards">
          <a href="tel:+551391919194" className="direct-card">
            <div className="direct-icon"><Phone size={20} /></div>
            <div>
              <span className="direct-label">Ligue agora</span>
              <strong className="direct-val">(13) 9191-9194</strong>
            </div>
          </a>

          <a href="mailto:contatosuperquadras@gmail.com" className="direct-card">
            <div className="direct-icon"><Mail size={20} /></div>
            <div>
              <span className="direct-label">E-mail Comercial</span>
              <strong className="direct-val">contatosuperquadras@gmail.com</strong>
            </div>
          </a>

          <div className="direct-card">
            <div className="direct-icon"><MapPin size={20} /></div>
            <div>
              <span className="direct-label">Atendimento</span>
              <strong className="direct-val">São Paulo e Todo o Brasil</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="quote-form-card">
        <form onSubmit={handleSubmit} className="custom-quote-form">
          <div className="form-group-grid">
            <div className="form-field">
              <label htmlFor="quote-name">Nome / Empresa / Condomínio *</label>
              <input
                id="quote-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Ex.: Carlos Silva / Condomínio Palmeiras"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-field">
              <label htmlFor="quote-phone">WhatsApp ou Telefone *</label>
              <input
                id="quote-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                placeholder="(13) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group-grid">
            <div className="form-field">
              <label htmlFor="quote-city">Cidade e Estado (UF) *</label>
              <input
                id="quote-city"
                name="city"
                type="text"
                required
                autoComplete="address-level2"
                placeholder="Ex.: Santos / SP"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-field">
              <label htmlFor="quote-sport">Modalidade do Projeto *</label>
              <select
                id="quote-sport"
                name="sport"
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="form-select"
              >
                {sportsOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="quote-details">
              Detalhes adicionais (dimensões aproximadas, solo, prazos desejados)
            </label>
            <textarea
              id="quote-details"
              name="details"
              rows={3}
              placeholder="Ex.: terreno plano de 18 × 36 m para condomínio residencial, com início previsto em 30 dias…"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="form-textarea"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-quote-btn"
          >
            <Send size={18} />
            <span>{isSubmitting ? 'Gerando mensagem...' : 'Enviar Proposta pelo WhatsApp'}</span>
          </button>

          <p className="form-privacy-note">
            <CheckCircle2 size={15} />
            <span>Resposta rápida por consultores técnicos especializados em engenharia esportiva.</span>
          </p>
        </form>
      </div>
    </div>
  );
}

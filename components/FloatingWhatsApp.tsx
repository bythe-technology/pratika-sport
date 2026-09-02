'use client';

import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <aside aria-label="Atendimento Rápido via WhatsApp" className="fab-whatsapp-container">
      <a
        href="https://wa.me/551391919194?text=Ol%C3%A1%21%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20quadra%20esportiva."
        target="_blank"
        rel="noopener noreferrer"
        className="fab-whatsapp-btn"
        aria-label="Falar com um consultor no WhatsApp"
      >
        <div className="fab-pulse-ring" />
        <MessageCircle size={28} className="fab-icon" />
        <span className="fab-tooltip">Orçamento no WhatsApp</span>
      </a>
    </aside>
  );
}

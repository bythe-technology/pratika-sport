'use client';

import { useEffect, useRef, useState } from 'react';
import { constructionStages } from '@/lib/illustrations';
import Illustration from './Illustration';

export default function ConstructionStory() {
  const [active, setActive] = useState(3);
  const [playing, setPlaying] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(0);
        setPlaying(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    if (panel.current) observer.observe(panel.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (active === constructionStages.length - 1) setPlaying(false);
      else setActive(current => current + 1);
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [active, playing]);

  const stage = constructionStages[active];
  return (
    <div className="construction-story" ref={panel}>
      <div className="story-topline"><span>DO TERRENO AO JOGO</span><span className="story-live-dot" aria-hidden="true" /></div>
      <div className="story-visual" id="construction-visual" role="tabpanel" aria-labelledby={`stage-${active}`}>
        {constructionStages.map((item, index) => (
          <div className={`story-frame ${index === active ? 'is-active' : ''}`} key={item.id} aria-hidden={index !== active}>
            <Illustration id={item.id} priority={index === 3} caption={false} sizes="(max-width: 767px) 100vw, 48vw" />
          </div>
        ))}
      </div>
      <div className="story-controls" role="tablist" aria-label="Etapas ilustradas da construção">
        {constructionStages.map((item, index) => (
          <button type="button" role="tab" id={`stage-${index}`} key={item.id} aria-selected={active === index} aria-controls="construction-visual" className={active === index ? 'is-active' : ''} onClick={() => { setPlaying(false); setActive(index); }} onKeyDown={event => {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            const next = event.key === 'Home' ? 0 : event.key === 'End' ? 3 : (index + (event.key === 'ArrowRight' ? 1 : 3)) % 4;
            setPlaying(false); setActive(next);
            document.getElementById(`stage-${next}`)?.focus();
          }}><span>0{index + 1}</span>{item.title}</button>
        ))}
      </div>
      <p className="story-description">{stage.description}</p>
      <div className="story-bottom"><small>Ilustração conceitual · etapas esquemáticas</small><button type="button" onClick={() => { setActive(0); setPlaying(true); }}>↻ Repetir etapas</button><button type="button" aria-pressed={!playing} onClick={() => { if (!playing && active === 3) setActive(0); setPlaying(current => !current); }}>{playing ? 'Pausar' : 'Continuar'}</button></div>
    </div>
  );
}

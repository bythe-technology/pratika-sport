'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { constructionStages } from '@/lib/illustrations';
import Illustration from './Illustration';

export default function ConstructionStory() {
  const [active, setActive] = useState(3);
  const [playing, setPlaying] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const introductionTimer = useRef<number | null>(null);
  const interacted = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (interacted.current) return;
      introductionTimer.current = window.setTimeout(() => {
        introductionTimer.current = null;
        setActive(0);
        setPlaying(true);
      }, 1800);
    }, { threshold: 0.25 });
    if (panel.current) observer.observe(panel.current);
    return () => {
      observer.disconnect();
      if (introductionTimer.current !== null) window.clearTimeout(introductionTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (active === constructionStages.length - 1) setPlaying(false);
      else setActive(current => current + 1);
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [active, playing]);

  const takeControl = () => {
    interacted.current = true;
    if (introductionTimer.current !== null) window.clearTimeout(introductionTimer.current);
    introductionTimer.current = null;
  };
  const selectStage = (index: number) => {
    takeControl();
    setPlaying(false);
    setActive(index);
  };
  const replay = () => { takeControl(); setActive(0); setPlaying(true); };
  const stage = constructionStages[active];

  return (
    <div className="construction-story" ref={panel}>
      <div className="story-topline">
        <span>Do terreno ao primeiro jogo</span>
        <span className="story-count" aria-hidden="true">0{active + 1} <span>/ 04</span></span>
      </div>
      <div className="story-visual" id="construction-visual" role="tabpanel" aria-labelledby={`stage-${active}`}>
        {constructionStages.map((item, index) => (
          <div className={`story-frame ${index === active ? 'is-active' : ''}`} key={item.id} aria-hidden={index !== active}>
            <Illustration id={item.id} appearance="cutout" priority={index === 3} caption={false} sizes="(max-width: 900px) 100vw, 58vw" />
          </div>
        ))}
      </div>
      <div className="story-controls" role="tablist" aria-label="Etapas ilustradas da construção">
        {constructionStages.map((item, index) => (
          <button
            type="button" role="tab" id={`stage-${index}`} key={item.id}
            aria-selected={active === index} aria-controls="construction-visual"
            tabIndex={active === index ? 0 : -1}
            className={active === index ? 'is-active' : ''}
            onClick={() => selectStage(index)}
            onKeyDown={event => {
              if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
              event.preventDefault();
              const next = event.key === 'Home' ? 0 : event.key === 'End' ? 3 : (index + (event.key === 'ArrowRight' ? 1 : 3)) % 4;
              selectStage(next);
              document.getElementById(`stage-${next}`)?.focus();
            }}
          ><span>0{index + 1}</span>{item.title}</button>
        ))}
      </div>
      <p className="story-description" aria-live={playing ? 'off' : 'polite'}>{stage.description}</p>
      <div className="story-bottom">
        <small>Ilustração conceitual · etapas esquemáticas</small>
        <div className="story-playback">
          <button type="button" onClick={replay}><RotateCcw size={14} aria-hidden="true" />Repetir etapas</button>
          <button type="button" aria-pressed={!playing} onClick={() => {
            takeControl();
            if (!playing && active === 3) setActive(0);
            setPlaying(current => !current);
          }}>{playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}{playing ? 'Pausar' : 'Continuar'}</button>
        </div>
      </div>
    </div>
  );
}

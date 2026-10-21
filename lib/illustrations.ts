import catalog from '@/data/illustrations.json';

export type IllustrationId = keyof typeof catalog;
export const illustrations = catalog;
export const constructionStages = [
  { id: 'etapa-terreno', title: 'Preparar', description: 'O projeto começa com a avaliação do terreno, das medidas e do uso do espaço.' },
  { id: 'etapa-base', title: 'Estruturar', description: 'Base e drenagem são definidas conforme as condições e necessidades de cada local.' },
  { id: 'etapa-revestimento', title: 'Revestir', description: 'A superfície é escolhida para a modalidade, a rotina de uso e a conservação.' },
  { id: 'etapa-pronta', title: 'Finalizar', description: 'Demarcação, equipamentos e conferência dos acabamentos completam o conjunto.' },
] as const satisfies readonly { id: IllustrationId; title: string; description: string }[];

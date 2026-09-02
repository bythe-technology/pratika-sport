export const siteUrl = 'https://www.pratikasport.com.br';

export const contact = {
  phone: '+551391919194',
  displayPhone: '(13) 9191-9194',
  email: 'contatosuperquadras@gmail.com',
  instagram: 'https://www.instagram.com/pratikasport.com.br/',
};

export const faqItems = [
  {
    question: 'A Pratika Sport atende em quais regiões e estados?',
    answer: 'Atendemos em todo o território nacional, com prioridade operacional no estado de São Paulo. Desenvolvemos projetos para condomínios, clubes, centros de treinamento, escolas, empresas e residências.',
  },
  {
    question: 'Quanto custa para construir uma quadra esportiva?',
    answer: 'O investimento varia conforme modalidade, dimensões, condições do terreno e da base, drenagem, piso, iluminação, alambrados, redes e acessórios. A proposta é preparada após um diagnóstico técnico do espaço.',
  },
  {
    question: 'É possível reformar uma quadra antiga sem refazer tudo?',
    answer: 'Sim. Depois da avaliação da base, pode ser possível recuperar fissuras e desníveis, renovar o revestimento, refazer a demarcação e substituir iluminação, alambrados, redes e acessórios.',
  },
  {
    question: 'Qual é o melhor piso para condomínios e áreas externas?',
    answer: 'A escolha depende da modalidade, intensidade de uso, exposição à chuva, conforto desejado e orçamento. Pisos modulares e sistemas acrílicos são alternativas frequentes, mas a especificação deve considerar a base e a drenagem existentes.',
  },
  {
    question: 'Qual é o prazo para executar uma quadra?',
    answer: 'O prazo depende do escopo, do estado do terreno ou da estrutura existente, dos materiais e das condições climáticas. A Pratika Sport informa o cronograma na proposta técnica de cada projeto.',
  },
  {
    question: 'A Pratika Sport faz manutenção preventiva?',
    answer: 'Sim. O atendimento pode incluir inspeção, limpeza técnica, correção de fissuras e desníveis, pintura e demarcação, revisão de drenagem, redes, alambrados, iluminação e acessórios esportivos.',
  },
] as const;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': `${siteUrl}/#organization`,
  name: 'Pratika Sport',
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  image: `${siteUrl}/images/construcao-de-quadras-1.jpg`,
  description: 'Empresa especializada em construção, reforma, revitalização e manutenção de quadras esportivas, campos society e pisos esportivos.',
  telephone: contact.phone,
  email: contact.email,
  sameAs: [contact.instagram],
  areaServed: [
    { '@type': 'State', name: 'São Paulo' },
    { '@type': 'Country', name: 'Brasil' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: contact.phone,
    contactType: 'sales',
    areaServed: 'BR',
    availableLanguage: 'Portuguese',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'Pratika Sport',
  inLanguage: 'pt-BR',
  publisher: { '@id': `${siteUrl}/#organization` },
};

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteUrl}/#servico`,
  name: 'Construção, reforma e manutenção de quadras esportivas',
  serviceType: 'Engenharia e execução de espaços esportivos',
  provider: { '@id': `${siteUrl}/#organization` },
  areaServed: [
    { '@type': 'State', name: 'São Paulo' },
    { '@type': 'Country', name: 'Brasil' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Soluções para quadras e campos esportivos',
    itemListElement: [
      'Construção de quadras poliesportivas',
      'Construção de quadras de tênis',
      'Construção de quadras de beach tennis',
      'Construção de campos de futebol society',
      'Reforma e revitalização de quadras',
      'Manutenção preventiva e corretiva de quadras',
      'Instalação de pisos esportivos',
    ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
  },
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

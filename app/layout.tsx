import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import StructuredData from '@/components/StructuredData';
import { organizationSchema, siteUrl, websiteSchema } from '@/lib/seo';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#0078d4',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Pratika Sport',
  title: {
    default: 'Construção e Reforma de Quadras em SP | Pratika Sport',
    template: '%s | Pratika Sport',
  },
  description: 'Construção, reforma e manutenção de quadras esportivas em São Paulo e todo o Brasil. Poliesportivas, tênis, beach tennis, society e pisos. Peça uma avaliação.',
  keywords: [
    'Pratika Sport',
    'construção de quadra esportiva',
    'reforma de quadra esportiva',
    'quadra poliesportiva',
    'quadra de tênis',
    'beach tennis',
    'campo de futebol society',
    'piso esportivo',
    'construção de quadras em São Paulo',
    'reforma de quadras em São Paulo',
    'manutenção de quadras em São Paulo',
    'atendimento nacional',
  ],
  authors: [{ name: 'Pratika Sport', url: siteUrl }],
  creator: 'Pratika Sport',
  publisher: 'Pratika Sport',
  category: 'Construção e manutenção de instalações esportivas',
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: '/',
    languages: { 'pt-BR': '/' },
  },
  openGraph: {
    title: 'Construção e Reforma de Quadras em SP | Pratika Sport',
    description: 'Projetos completos de construção, reforma e manutenção de quadras esportivas em São Paulo e todo o Brasil.',
    url: siteUrl,
    siteName: 'Pratika Sport',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/images/construcao-de-quadras-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Quadra esportiva construída pela Pratika Sport',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Construção e Reforma de Quadras em SP | Pratika Sport',
    description: 'Projetos completos de quadras esportivas em São Paulo e todo o Brasil.',
    images: ['/images/construcao-de-quadras-1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/pratika-sport-favicon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'geo.region': 'BR-SP',
    'geo.placename': 'São Paulo',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <StructuredData data={[organizationSchema, websiteSchema]} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

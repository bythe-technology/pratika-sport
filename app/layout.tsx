import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#0078d4',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pratikasport.com.br'),
  applicationName: 'Pratika Sport',
  title: 'Pratika Sport | Construção e Reforma de Quadras Esportivas',
  description: 'Construção, reforma e manutenção de quadras poliesportivas, tênis, beach tennis e campos de futebol society. Atendimento em todo o Brasil.',
  keywords: [
    'Pratika Sport',
    'construção de quadra esportiva',
    'reforma de quadra esportiva',
    'quadra poliesportiva',
    'quadra de tênis',
    'beach tennis',
    'campo de futebol society',
    'piso esportivo',
    'atendimento nacional',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Pratika Sport | Construção e Reforma de Quadras Esportivas',
    description: 'Especialistas em construção, reforma e manutenção de quadras esportivas em todo o Brasil.',
    url: 'https://www.pratikasport.com.br',
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
    title: 'Pratika Sport | Construção e Reforma de Quadras Esportivas',
    description: 'Especialistas em construção, reforma e manutenção de quadras esportivas em todo o Brasil.',
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
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

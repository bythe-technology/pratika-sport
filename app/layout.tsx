import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
export const metadata: Metadata = { title:'Pratika Sport | Construção e Reforma de Quadras Esportivas', description:'Construção e reforma de quadras poliesportivas, tênis, beach tennis e campos de futebol. Atendimento em todo o Brasil.', robots:{index:false,follow:false} };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pt-BR"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>}

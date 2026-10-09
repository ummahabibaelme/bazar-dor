import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { getCategories } from '@/lib/api';
import { Toaster } from 'react-hot-toast';
export const metadata: Metadata = { title: 'বাজার দর | নিত্যপণ্যের দাম', description: 'বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে দেখুন।' };
export default async function RootLayout({ children }: Readonly<{children:React.ReactNode}>) { let categories=[]; try { categories=await getCategories(); } catch {} return <html lang="bn"><body><SiteHeader categories={categories}/><main>{children}</main><SiteFooter/><Toaster position="top-right" toastOptions={{duration:3200}}/></body></html>; }


import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/header';
import { SiteFooter } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getDictionary } from '@/lib/get-dictionary';
import { i18n, type Locale } from '@/i18n-config';
import { attractions } from '@/lib/attractions';

// This function is commented out because generateStaticParams is not supported in the root layout
// when using the app router with internationalization in this way.
// export async function generateStaticParams() {
//   return i18n.locales.map((locale) => ({ lang: locale }));
// }

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  // Ensure a default locale if params.lang is not available
  const lang = params.lang && i18n.locales.includes(params.lang) ? params.lang : i18n.defaultLocale;
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  // Ensure a default locale if params.lang is not available
  const lang = params.lang && i18n.locales.includes(params.lang) ? params.lang : i18n.defaultLocale;
  const dictionary = await getDictionary(lang);
  const allImages = [...PlaceHolderImages.map(img => img.imageUrl), ...attractions.map(attr => attr.image)];


  return (
    <html lang={lang} className="font-body antialiased" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
          {allImages.map((imageUrl) => (
            <link
              key={imageUrl}
              rel="preload"
              href={imageUrl}
              as="image"
            />
          ))}
        </head>
      <body className="scroll-smooth">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-dvh flex-col bg-background">
            <SiteHeader lang={lang} dictionary={dictionary} />
            <main className="flex-1">
              {children}
            </main>
            <SiteFooter dictionary={dictionary.footer} />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

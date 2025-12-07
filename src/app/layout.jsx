
'use client';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Playfair_Display, PT_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import Clarity from '@/components/clarity';
import { useEffect, useState } from 'react';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-headline',
});

const COOKIE_CONSENT_KEY = 'cookie_consent';

export default function RootLayout({ children }) {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (storedConsent) {
        setConsent(JSON.parse(storedConsent));
      }
    } catch (e) {
      // Failed to parse, do nothing
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('scroll-smooth font-body', ptSans.variable, playfairDisplay.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
      {consent?.analytics && <Clarity />}
    </html>
  );
}

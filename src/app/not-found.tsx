// src/app/not-found.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, redirect } from 'next/navigation';
import { i18n, type Locale } from '@/i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';

// This component is a workaround to redirect from the root 404 to a localized one.
export default function GlobalNotFound() {
  const pathname = usePathname();

  useEffect(() => {
    const getLocale = (): Locale => {
      // Logic to determine locale from browser settings if not available in path
      if (typeof window !== 'undefined') {
        const userLanguages = navigator.languages || [i18n.defaultLocale];
        // @ts-ignore locales are readonly
        const locales: string[] = i18n.locales;
        return matchLocale(userLanguages, locales, i18n.defaultLocale) as Locale;
      }
      return i18n.defaultLocale;
    };
    
    const locale = getLocale();
    
    // Redirect to the same path but with the determined locale prefix
    redirect(`/${locale}${pathname}`);

  }, [pathname]);

  return null;
}

// src/app/not-found.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, redirect } from 'next/navigation';
import { i18n } from '@/i18n-config';
import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';

// This component is a workaround to redirect from the root 404 to a localized one.
export default function GlobalNotFound() {
  const pathname = usePathname();

  useEffect(() => {
    // This is a placeholder for the request object that middleware would have.
    // In a client component, we don't have direct access to request headers.
    // We'll rely on the browser's language.
    const userLanguages = typeof window !== 'undefined' ? navigator.languages : [i18n.defaultLocale];
    
    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;
    const locale = matchLocale(userLanguages, locales, i18n.defaultLocale);

    redirect(`/${locale}/404`);
  }, [pathname]);

  return null;
}

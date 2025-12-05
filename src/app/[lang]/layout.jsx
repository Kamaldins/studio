import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/header';
import { SiteFooter } from '@/components/footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getDictionary } from '@/lib/get-dictionary';
import { i18n } from '@/i18n-config';
import StructuredData from '@/components/structured-data';
import { CookieBanner } from '@/components/cookie-banner';

const defaultUrl = process.env.VERCEL_URL
  ? `https://mezlici.lv`
  : 'http://localhost:3000';

export async function generateMetadata({ params }) {
  const lang = params.lang && i18n.locales.includes(params.lang) ? params.lang : i18n.defaultLocale;
  const dictionary = await getDictionary(lang);

  const siteName = dictionary.siteName;
  const title = dictionary.meta.title;
  const description = dictionary.meta.description;
  const keywords = [
    'brīvdienu māja',
    'atpūta pie dabas',
    'pirts',
    'kubls',
    'atpūta pie upes',
    'viesu nams',
    'holiday house',
    'vacation rental',
    'latvia',
    'tome',
    'ķegums',
    'daugava',
  ];

  const ogImage = PlaceHolderImages.find((img) => img.id === 'mezlici-9')?.imageUrl || `${defaultUrl}/og-image.png`;

  return {
    metadataBase: new URL(defaultUrl),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description: description,
    keywords: keywords,
    authors: [{ name: dictionary.footer.owner, url: defaultUrl }],
    creator: dictionary.footer.owner,
    publisher: siteName,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: title,
      description: description,
      url: `${defaultUrl}/${lang}`,
      siteName: siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: description,
        },
      ],
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImage],
      creator: '@andrejs',
    },
    alternates: {
      canonical: `${defaultUrl}/${lang}`,
      languages: {
        'en-US': `${defaultUrl}/en`,
        'lv-LV': `${defaultUrl}/lv`,
        'ru-RU': `${defaultUrl}/ru`,
        'x-default': `${defaultUrl}/lv`,
      },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: `${defaultUrl}/site.webmanifest`,
  };
}

export default async function LangLayout({ children, params }) {
  const lang = params.lang && i18n.locales.includes(params.lang) ? params.lang : i18n.defaultLocale;
  const dictionary = await getDictionary(lang);

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <StructuredData dictionary={dictionary} />
      <SiteHeader lang={lang} dictionary={dictionary} />
      <main className="flex-1">{children}</main>
      <SiteFooter dictionary={dictionary.footer} />
      <CookieBanner dictionary={dictionary.cookieBanner} />
    </div>
  );
}

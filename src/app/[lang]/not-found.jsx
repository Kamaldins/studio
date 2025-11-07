import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, TriangleAlert } from 'lucide-react';
import { getDictionary } from '@/lib/get-dictionary';
import { i18n } from '@/i18n-config';

export default async function NotFound({ params }) {
  const lang = params?.lang && i18n.locales.includes(params.lang) ? params.lang : i18n.defaultLocale;
  const dictionary = await getDictionary(lang);
  const { notFoundPage } = dictionary;

  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center space-y-8 bg-background text-center text-foreground">
      <div className="flex items-center space-x-4">
        <TriangleAlert className="h-16 w-16 text-primary" />
        <h1 className="text-8xl font-black tracking-tighter text-primary">
          404
        </h1>
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {notFoundPage.title}
        </h2>
        <p className="text-muted-foreground">{notFoundPage.message}</p>
      </div>
      <Button asChild>
        <Link href={`/${lang}`}>
          <>
            <Home className="mr-2 h-4" />
            {notFoundPage.buttonText}
          </>
        </Link>
      </Button>
    </div>
  );
}

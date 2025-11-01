
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, TriangleAlert } from 'lucide-react';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';

type Props = {
  params: { lang: Locale };
};

// This page will be rendered when a route is not found within the [lang] segment.
// It automatically gets the site header and footer from the layout.
export default async function NotFound({ params }: Props) {
  const dictionary = await getDictionary(params.lang);
  const { notFoundPage } = dictionary;

  return (
    <div className="flex min-h-[calc(100vh-20rem)] flex-col items-center justify-center space-y-8 text-center">
      <div className="flex items-center space-x-4">
        <TriangleAlert className="h-16 w-16 text-primary" />
        <h1 className="text-8xl font-black tracking-tighter text-primary">
          404
        </h1>
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {notFoundPage.title}
        </h2>
        <p className="text-muted-foreground">
          {notFoundPage.message}
        </p>
      </div>
      <Button asChild>
        <Link href={`/${params.lang}`}>
          <Home className="mr-2 h-4 w-4" />
          {notFoundPage.buttonText}
        </Link>
      </Button>
    </div>
  );
}

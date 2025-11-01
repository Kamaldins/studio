
import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n-config';

export default async function PrivacyPolicyPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  const { privacyPage } = dictionary;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-8">
      <h1 className="font-headline text-4xl font-bold mb-8 text-center">{privacyPage.title}</h1>
      <div className="prose prose-lg dark:prose-invert mx-auto space-y-6 text-muted-foreground">
        {privacyPage.content.map((section: string, index: number) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: section }} />
        ))}
      </div>
    </div>
  );
}

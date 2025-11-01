
import * as React from 'react';
import ContactSection from '../contact-section';
import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n-config';

type Props = {
  params: { lang: Locale };
};

export default async function ContactPage({ params }: Props) {
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
      <ContactSection dictionary={dictionary.contact} />
    </div>
  );
}

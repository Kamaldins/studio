
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

export function CookieBanner({ dictionary }) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== 'given') {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'given');
    setShowBanner(false);
  };
  
  const handleDeny = () => {
    localStorage.setItem('cookie_consent', 'denied');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-8">
      <div className="container mx-auto max-w-7xl px-4 pb-4 md:px-8">
        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-lg sm:p-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex-shrink-0">
              <Cookie className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
            </div>
            <div className="flex-grow">
              <h3 className="text-base font-semibold sm:text-lg">{dictionary.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {dictionary.text}{' '}
                <Link href="/privacy" className="font-semibold text-primary hover:underline">
                  {dictionary.privacyLink}
                </Link>
                .
              </p>
            </div>
            <div className="flex w-full flex-shrink-0 flex-col gap-2 sm:w-auto">
              <Button onClick={handleAccept} className="w-full sm:w-auto">
                {dictionary.accept}
              </Button>
              <Button onClick={handleDeny} variant="outline" className="w-full sm:w-auto">
                {dictionary.deny}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

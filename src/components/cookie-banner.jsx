
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CookieBanner({ dictionary }) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookie_consent');
      if (consent !== 'true') {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-8">
      <div className="container mx-auto max-w-7xl px-4 pb-4 md:px-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-lg border bg-card p-4 text-card-foreground shadow-lg sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {dictionary.text}{' '}
            <Link href="/privacy" className="font-semibold text-primary hover:underline">
              {dictionary.privacyLink}
            </Link>
            .
          </p>
          <Button onClick={handleAccept} size="sm">
            {dictionary.accept}
          </Button>
        </div>
      </div>
    </div>
  );
}

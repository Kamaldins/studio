
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Cookie, Settings, Check, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const COOKIE_CONSENT_KEY = 'cookie_consent';

const initialConsent = {
  given: false,
  denied: false,
  necessary: true,
  analytics: false,
};

export function CookieBanner({ dictionary }) {
  const [consent, setConsent] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (storedConsent) {
        setConsent(JSON.parse(storedConsent));
      } else {
        setConsent(initialConsent);
      }
    } catch (e) {
      setConsent(initialConsent);
    }
  }, []);

  const saveConsent = (newConsent) => {
    setConsent(newConsent);
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newConsent));
    setDialogOpen(false);
  };
  
  const handleAcceptAll = () => {
    saveConsent({ given: true, denied: false, necessary: true, analytics: true });
  };
  
  const handleDenyAll = () => {
    saveConsent({ given: false, denied: true, necessary: true, analytics: false });
  };
  
  const handleSavePreferences = () => {
    saveConsent({
      given: true,
      denied: false,
      necessary: true,
      analytics: analyticsEnabled,
    });
  };

  if (!consent || consent.given || consent.denied) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-8">
        <div className="container mx-auto max-w-7xl px-4 pb-4 md:px-8">
          <div className="rounded-2xl border bg-card/80 p-4 text-card-foreground shadow-lg backdrop-blur-lg sm:p-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <div className="flex-shrink-0">
                <Cookie className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-base font-semibold sm:text-lg">{dictionary.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {dictionary.text}{' '}
                  <Link href="/privacy" className="font-semibold text-primary hover:underline">
                    {dictionary.privacyLink}
                  </Link>
                  .
                </p>
              </div>
              <div className="flex w-full flex-shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
                <Button onClick={handleAcceptAll} className="w-full sm:w-auto">
                  <Check className="mr-2 h-4 w-4" />
                  {dictionary.accept}
                </Button>
                <Button onClick={() => setDialogOpen(true)} variant="secondary" className="w-full sm:w-auto">
                   <Settings className="mr-2 h-4 w-4" />
                  {dictionary.customize}
                </Button>
                <Button onClick={handleDenyAll} variant="outline" className="w-full sm:w-auto">
                   <X className="mr-2 h-4 w-4" />
                  {dictionary.deny}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {dictionary.settings.title}
            </DialogTitle>
            <DialogDescription>
                {dictionary.settings.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Separator />
            <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
              <div className="space-y-0.5">
                <h4 className="font-semibold">{dictionary.settings.necessary.title}</h4>
                <p className="text-sm text-muted-foreground">{dictionary.settings.necessary.description}</p>
              </div>
              <Switch checked disabled />
            </div>
            <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
               <div className="space-y-0.5">
                <h4 className="font-semibold">{dictionary.settings.analytics.title}</h4>
                <p className="text-sm text-muted-foreground">{dictionary.settings.analytics.description}</p>
              </div>
              <Switch 
                checked={analyticsEnabled}
                onCheckedChange={setAnalyticsEnabled}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button onClick={handleSavePreferences} className="w-full">
              {dictionary.settings.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

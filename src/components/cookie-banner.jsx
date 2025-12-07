'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Cookie, Settings, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
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
        const parsedConsent = JSON.parse(storedConsent);
        setConsent(parsedConsent);
        setAnalyticsEnabled(parsedConsent.analytics);
      } else {
        setConsent(initialConsent);
      }
    } catch (e) {
      setConsent(initialConsent);
    }
  }, []);

  const saveConsent = (newConsent) => {
    const currentConsent = consent;
    setConsent(newConsent);
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newConsent));
    setDialogOpen(false);

    if (currentConsent && currentConsent.analytics !== newConsent.analytics) {
      window.location.reload();
    }
  };

  const handleAcceptAll = () => {
    saveConsent({
      given: true,
      denied: false,
      necessary: true,
      analytics: true,
    });
  };

  const handleDenyAll = () => {
    saveConsent({
      given: false,
      denied: true,
      necessary: true,
      analytics: false,
    });
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
      <div className="fixed bottom-4 left-4 z-50 w-full max-w-sm animate-in slide-in-from-bottom-8">
        <div className="rounded-2xl border bg-card/80 p-4 text-card-foreground shadow-lg backdrop-blur-lg sm:p-6">
          <div className="flex items-start gap-4">
            <Cookie className="h-6 w-6 flex-shrink-0 text-primary" />
            <div className="flex-grow">
              <h3 className="text-base font-semibold sm:text-lg">
                {dictionary.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {dictionary.text}{' '}
                <Link
                  href="/privacy"
                  className="font-semibold text-primary hover:underline"
                >
                  {dictionary.privacyLink}
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2">
            <Button
                onClick={() => setDialogOpen(true)}
                variant="link"
                className="p-0 text-muted-foreground"
            >
                {dictionary.customize}
            </Button>
            <div className='flex gap-2'>
                 <Button onClick={handleDenyAll} variant="outline" size="sm">
                    {dictionary.deny}
                </Button>
                <Button onClick={handleAcceptAll} size="sm">
                    {dictionary.accept}
                </Button>
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
                <h4 className="font-semibold">
                  {dictionary.settings.necessary.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {dictionary.settings.necessary.description}
                </p>
              </div>
              <Switch checked disabled />
            </div>
            <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
              <div className="space-y-0.5">
                <h4 className="font-semibold">
                  {dictionary.settings.analytics.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {dictionary.settings.analytics.description}
                </p>
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

'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const COOKIE_CONSENT_KEY = 'cookie_consent';

export default function Clarity() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (storedConsent) {
        setConsent(JSON.parse(storedConsent));
      }
    } catch (e) {
      // Failed to parse, do nothing
    }
  }, []);

  const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  // Only render script if consent for analytics is given and a project ID is available
  if (!consent?.analytics || !clarityProjectId || clarityProjectId === 'YOUR_CLARITY_PROJECT_ID') {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityProjectId}");
        `,
      }}
    />
  );
}

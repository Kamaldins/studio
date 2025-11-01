
// This file is intentionally left empty. 
// The root layout at src/app/layout.tsx handles the main HTML structure.
// Next.js will automatically use the root layout for this route.
import * as React from 'react';

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

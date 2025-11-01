
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mežlīči Retreat',
  description: 'A quiet place in the forest by the Daugava river to relax and rejuvenate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The lang prop will be picked up by the [lang]/layout.tsx
    <html className="scroll-smooth" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}


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
    <html className="scroll-smooth" suppressHydrationWarning>
      {children}
    </html>
  );
}

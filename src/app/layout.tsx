import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/header';
import { SiteFooter } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Brīvdienu māja "Mežlīči"',
  description: 'Klusa vieta mežā pie Daugavas, kur atgūt spēkus un relaksēties',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

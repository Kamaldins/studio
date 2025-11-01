
'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Camera, Moon, Sun, Globe, Menu, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from 'next/navigation';
import { i18n, type Locale } from '@/i18n-config';
import { type getDictionary } from '@/lib/get-dictionary';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import Link from 'next/link';

interface SiteHeaderProps {
  lang: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}

export function SiteHeader({ lang, dictionary }: SiteHeaderProps) {
  const { setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const redirectedPathName = (locale: Locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };
  
  const isHomePage = pathname === `/${lang}` || pathname === '/';

  const navLinksConfig = [
    { href: '/', icon: Home, label: dictionary.navigation.home, anchor: false },
    { href: '/gallery', icon: Camera, label: dictionary.navigation.gallery, anchor: false },
  ];

  const NavLink = ({ href, icon: Icon, label, isMobile = false, anchor = false }: { href: string; icon: React.ElementType; label: string, isMobile?: boolean, anchor?: boolean }) => {
    const fullHref = anchor ? (isHomePage ? href : `/${lang}/${href}`) : `/${lang}${href === '/' ? '' : href}`;
    
    if (anchor && !isHomePage) {
        return (
             <Link href={`/${lang}/${href}`} className="group flex items-center gap-3 px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:text-primary sm:text-sm sm:gap-2">
                <Icon className="h-5 w-5 transition-transform group-hover:scale-110 sm:h-4 sm:w-4" />
                {label}
            </Link>
        )
    }

    const linkContent = (
      <div
        className="group flex items-center gap-3 px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:text-primary sm:text-sm sm:gap-2"
      >
        <Icon className="h-5 w-5 transition-transform group-hover:scale-110 sm:h-4 sm:w-4" />
        {label}
      </div>
    );

    if (isMobile) {
      return (
        <SheetClose asChild>
          <Link href={fullHref}>
            {linkContent}
          </Link>
        </SheetClose>
      )
    }

    return (
      <Link href={fullHref}>
        {linkContent}
      </Link>
    );
  }

  const renderNavLinks = (isMobile = false) => (
    <nav className={isMobile ? "flex flex-col gap-2 p-4" : "hidden items-center gap-1 lg:gap-2 md:flex"}>
       <Link href={`/${lang}`} className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">
              {dictionary.siteName}
            </span>
          </Link>
      {navLinksConfig.map(link => (
        <NavLink key={link.href} {...link} isMobile={isMobile} />
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {isMobile ? (
          <>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                {renderNavLinks(true)}
              </SheetContent>
            </Sheet>
             <Link href={`/${lang}`} className="ml-4 flex items-center space-x-2">
                <span className="font-bold">
                {dictionary.siteName}
                </span>
            </Link>
          </>
        ) : (
          renderNavLinks()
        )}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {i18n.locales.map(locale => (
                <DropdownMenuItem key={locale} onClick={() => router.push(redirectedPathName(locale))}>
                  {dictionary.locales[locale as keyof typeof dictionary.locales]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                {dictionary.theme.light}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                {dictionary.theme.dark}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                {dictionary.theme.system}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

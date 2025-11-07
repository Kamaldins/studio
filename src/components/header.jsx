
'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Camera, Moon, Sun, Globe, Menu, Home, Bath, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from 'next/navigation';
import { i18n } from '@/i18n-config';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Link from 'next/link';
import { Logo } from './logo';

export function SiteHeader({ lang, dictionary }) {
  const { setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const navLinksConfig = [
    { href: '/', icon: Home, label: dictionary.navigation.home },
    { href: '/gallery', icon: Camera, label: dictionary.navigation.gallery },
    { href: '/sauna', icon: Bath, label: dictionary.gallery.categories.sauna },
    { href: '/pricing', icon: DollarSign, label: dictionary.gallery.categories.pricing },
  ];

  const redirectedPathName = (locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const NavLink = ({ href, icon: Icon, label, isMobile = false }) => {
    const fullHref = `/${lang}${href === '/' ? '' : href}`;
    
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

  const renderDesktopNav = () => (
    <nav className="hidden md:flex md:items-center md:gap-1">
      {navLinksConfig.map(link => (
        <NavLink key={link.href} {...link} />
      ))}
    </nav>
  );

  const renderMobileNav = () => (
    <nav className={"flex flex-col gap-2 pt-4"}>
      {navLinksConfig.map(link => (
        <NavLink key={link.href} {...link} isMobile={true} />
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-start">
          {isMobile ? (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                </SheetHeader>
                <Link href={`/${lang}`} className="mb-4 flex items-center space-x-2" onClick={() => setIsSheetOpen(false)}>
                  <Logo className="fill-foreground" />
                  <span className="font-bold sm:inline-block">
                    {dictionary.siteName}
                  </span>
                </Link>
                {renderMobileNav()}
              </SheetContent>
            </Sheet>
          ) : (
            <>
              <Link href={`/${lang}`} className="mr-6 flex items-center space-x-2">
                <Logo className="fill-foreground" />
                <span className="font-bold sm:inline-block">
                  {dictionary.siteName}
                </span>
              </Link>
              {renderDesktopNav()}
            </>
          )}
        </div>
        
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
                  {dictionary.locales[locale]}
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

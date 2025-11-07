
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
import Link from 'next/link';
import { Logo } from './logo';

export function SiteHeader({ lang, dictionary }) {
  const { setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();

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

  const NavLink = ({ href, icon: Icon, label }) => {
    const fullHref = `/${lang}${href === '/' ? '' : href}`;
    const isActive = pathname === fullHref || (href === '/' && pathname === `/${lang}`);
    
    return (
      <Link
        href={fullHref}
        className={`group relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-accent/80 hover:text-primary active:scale-95 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
      >
        <Icon className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-primary' : ''}`} />
        <span className="relative">
          {label}
          <span className={`absolute -bottom-1 left-0 h-0.5 w-full scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100 ${isActive ? 'scale-x-100' : ''}`}></span>
        </span>
      </Link>
    );
  };
  
  const DropdownNavLink = ({ href, icon: Icon, label }) => {
    const fullHref = `/${lang}${href === '/' ? '' : href}`;
    return (
      <DropdownMenuItem asChild>
        <Link href={fullHref} className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Link>
      </DropdownMenuItem>
    );
  };

  const renderMobileNav = () => (
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
           {navLinksConfig.map(link => (
            <DropdownNavLink key={link.href} {...link} />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
  );

  const renderDesktopNav = () => (
    <nav className="hidden md:flex md:items-center md:gap-1">
      {navLinksConfig.map(link => (
        <NavLink key={link.href} {...link} />
      ))}
    </nav>
  );

  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-start gap-4">
          {isMobile ? renderMobileNav() : null}
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <Logo className="fill-foreground" />
            <span className="font-bold sm:inline-block">
              {dictionary.siteName}
            </span>
          </Link>
           {!isMobile ? renderDesktopNav() : null}
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-1">
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

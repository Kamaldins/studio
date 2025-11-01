
'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Camera, Euro, Navigation as NavigationIcon, Moon, Sun, Phone, Calendar, Globe } from 'lucide-react';
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

interface SiteHeaderProps {
  lang: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}

export function SiteHeader({ lang, dictionary }: SiteHeaderProps) {
  const { setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const redirectedPathName = (locale: Locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const navLinksConfig = [
    { href: '#foto', icon: Camera, label: dictionary.navigation.photos },
    { href: '#cenas', icon: Euro, label: dictionary.navigation.prices },
    { href: '#objekti', icon: NavigationIcon, label: dictionary.navigation.map },
    { href: '#kalendars', icon: Calendar, label: dictionary.navigation.calendar },
    { href: '#sazinities', icon: Phone, label: dictionary.navigation.contact },
];

  const NavLink = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => (
    <a
      href={href}
      className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
      {label}
    </a>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center gap-4 lg:gap-6">
          <a href={`/${lang}`} className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">
              {dictionary.siteName}
            </span>
          </a>
          {navLinksConfig.map(link => (
            <NavLink key={link.href} href={link.href} icon={link.icon} label={link.label} />
          ))}
        </nav>
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

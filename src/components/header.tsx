
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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';

const locales = [
  { code: 'lv', name: 'Latviešu' },
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
];

const navLinksConfig = [
    { href: '#foto', icon: Camera, label: 'Foto' },
    { href: '#cenas', icon: Euro, label: 'Cenas' },
    { href: '#objekti', icon: NavigationIcon, label: 'Karte' },
    { href: '#kalendars', icon: Calendar, label: 'Kalendārs' },
    { href: '#sazinities', icon: Phone, label: 'Saziņa' },
];


export function SiteHeader() {
  const { setTheme } = useTheme();
  const [currentLocale, setCurrentLocale] = React.useState('lv');

  const NavLink = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => (
    <a
      href={`/${currentLocale}${href}`}
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
          <a href={`/${currentLocale}`} className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">
              Mežlīči
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
              {locales.map(locale => (
                <DropdownMenuItem key={locale.code} onClick={() => setCurrentLocale(locale.code)}>
                  {locale.name}
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
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};


'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Camera, Euro, Navigation as NavigationIcon, Moon, Sun, Phone, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

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
          <a href="#" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">
              Mežlīči
            </span>
          </a>
          <NavLink href="#foto" icon={Camera} label="Foto" />
          <NavLink href="#cenas" icon={Euro} label="Cenas" />
          <NavLink href="#objekti" icon={NavigationIcon} label="Karte" />
          <NavLink href="#kalendars" icon={Calendar} label="Kalendārs" />
          <NavLink href="#sazinities" icon={Phone} label="Saziņa" />
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {mounted ? (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              onClick={toggleDarkMode}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          ) : (
            <div className="h-9 w-9 animate-pulse rounded-lg bg-muted" />
          )}
        </div>
      </div>
    </header>
  );
};

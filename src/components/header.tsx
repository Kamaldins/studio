
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Camera, Euro, Navigation as NavigationIcon, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDarkMode = theme === 'dark';

  if (!mounted) {
    return (
       <header className="fixed top-4 sm:top-6 z-50 w-full px-4">
        <div className="container mx-auto flex h-14 max-w-lg items-center justify-center">
          <div className="flex items-center justify-between gap-4 rounded-full border bg-card/80 p-2 backdrop-blur-sm shadow-xl w-full">
            <div className="flex-1 h-8 bg-muted rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-2 sm:top-4 lg:top-6 w-full px-4 z-50">
        <div className="container mx-auto flex h-14 items-center justify-center">
            <nav className={cn(
                "bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-lg px-3 py-2 z-50 flex items-center gap-2",
                "border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300"
            )}>
              <div className="flex gap-2 text-sm font-medium">
                <a href="#foto" className="group flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-foreground transition-all duration-300 transform hover:scale-105 active:scale-95 px-3 py-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20">
                  <Camera size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span className="hidden sm:inline">FOTO</span>
                </a>
                <a href="#cenas" className="group flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-foreground transition-all duration-300 transform hover:scale-105 active:scale-95 px-3 py-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20">
                  <Euro size={16} className="group-hover:rotate-12" />
                  <span className="hidden sm:inline">CENAS</span>
                </a>
                <a href="#objekti" className="group flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-foreground transition-all duration-300 transform hover:scale-105 active:scale-95 px-3 py-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20">
                  <NavigationIcon size={16} className="group-hover:rotate-45" />
                  <span className="hidden sm:inline">OBJEKTI</span>
                </a>
              </div>
              
              <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-2"></div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleDarkMode}
                  className={cn(
                    'relative p-1 w-12 h-7 rounded-full transition-all duration-500 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card',
                    isDarkMode 
                      ? 'bg-indigo-600 focus:ring-indigo-500' 
                      : 'bg-amber-400 focus:ring-amber-500'
                  )}
                >
                  <div
                    className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-300 flex items-center justify-center",
                        isDarkMode ? 'translate-x-5' : 'translate-x-1'
                    )}
                  >
                    {isDarkMode ? (
                      <Moon size={12} className="text-indigo-600" />
                    ) : (
                      <Sun size={12} className="text-amber-500" />
                    )}
                  </div>
                </button>
              </div>
            </nav>
        </div>
    </header>
  );
};

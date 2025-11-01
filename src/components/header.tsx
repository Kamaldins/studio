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
      {navLinksConfig.map(link => (
        <NavLink key={link.href} {...link} isMobile={isMobile} />
      ))}
    </nav>
  );
  
  const renderMobileNav = () => (
    <nav className={"flex flex-col gap-2 p-4"}>
       <Link href={`/${lang}`} className="mb-4 flex items-center space-x-2" onClick={() => setIsSheetOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-foreground"><path d="M16.025 23.35q-.5.3-1.037.475T13.875 24q-1.6 0-2.725-1.137T10.025 20.1q0-.575.163-1.1t.487-1q-.325-.475-.488-1.025t-.162-1.125q0-1.6 1.125-2.725T13.875 12q.575 0 1.125.163t1.025.487q.475-.325 1.025-.487T18.175 12q1.6 0 2.725 1.113t1.125 2.687q0 .575-.162 1.125t-.488 1.025q.325.5.488 1.063t.162 1.137q0 1.6-1.137 2.725T18.125 24q-.575 0-1.1-.175t-1-.475Zm3.35-4.575l-.9-.8l1-.85q.275-.225.413-.563t.137-.712q0-.775-.537-1.312T18.175 14q-.4 0-.738.138t-.562.412l-.875 1l-.85-1q-.225-.275-.563-.413T13.85 14q-.75 0-1.287.55t-.538 1.35q0 .375.163.713t.462.612l.9.75l-1 .85q-.25.225-.388.55t-.137.725q0 .8.538 1.35t1.287.55q.375 0 .738-.175t.662-.525l.75-.85l.875 1q.225.275.563.413t.737.137q.775 0 1.313-.55t.537-1.35q0-.35-.162-.7t-.488-.625Zm-3.35.625q.575 0 .988-.412t.412-.988q0-.575-.413-.988t-.987-.412q-.575 0-.987.413t-.413.987q0 .575.413.988t.987.412ZM4 20V9.95H1L12 1l11 8.95h-3V11h-2V8.45l-6-4.9l-6 4.9V18h3v2H4Zm12.025-2Z"/></svg>
            <span className="font-bold sm:inline-block">
              {dictionary.siteName}
            </span>
          </Link>
      {navLinksConfig.map(link => (
        <NavLink key={link.href} {...link} isMobile={true} />
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
                {renderMobileNav()}
              </SheetContent>
            </Sheet>
             <Link href={`/${lang}`} className="ml-4 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-foreground"><path d="M16.025 23.35q-.5.3-1.037.475T13.875 24q-1.6 0-2.725-1.137T10.025 20.1q0-.575.163-1.1t.487-1q-.325-.475-.488-1.025t-.162-1.125q0-1.6 1.125-2.725T13.875 12q.575 0 1.125.163t1.025.487q.475-.325 1.025-.487T18.175 12q1.6 0 2.725 1.113t1.125 2.687q0 .575-.162 1.125t-.488 1.025q.325.5.488 1.063t.162 1.137q0 1.6-1.137 2.725T18.125 24q-.575 0-1.1-.175t-1-.475Zm3.35-4.575l-.9-.8l1-.85q.275-.225.413-.563t.137-.712q0-.775-.537-1.312T18.175 14q-.4 0-.738.138t-.562.412l-.875 1l-.85-1q-.225-.275-.563-.413T13.85 14q-.75 0-1.287.55t-.538 1.35q0 .375.163.713t.462.612l.9.75l-1 .85q-.25.225-.388.55t-.137.725q0 .8.538 1.35t1.287.55q.375 0 .738-.175t.662-.525l.75-.85l.875 1q.225.275.563.413t.737.137q.775 0 1.313-.55t.537-1.35q0-.35-.162-.7t-.488-.625Zm-3.35.625q.575 0 .988-.412t.412-.988q0-.575-.413-.988t-.987-.412q-.575 0-.987.413t-.413.987q0 .575.413.988t.987.412ZM4 20V9.95H1L12 1l11 8.95h-3V11h-2V8.45l-6-4.9l-6 4.9V18h3v2H4Zm12.025-2Z"/></svg>
                <span className="font-bold">
                {dictionary.siteName}
                </span>
            </Link>
          </>
        ) : (
           <Link href={`/${lang}`} className="mr-6 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-foreground"><path d="M16.025 23.35q-.5.3-1.037.475T13.875 24q-1.6 0-2.725-1.137T10.025 20.1q0-.575.163-1.1t.487-1q-.325-.475-.488-1.025t-.162-1.125q0-1.6 1.125-2.725T13.875 12q.575 0 1.125.163t1.025.487q.475-.325 1.025-.487T18.175 12q1.6 0 2.725 1.113t1.125 2.687q0 .575-.162 1.125t-.488 1.025q.325.5.488 1.063t.162 1.137q0 1.6-1.137 2.725T18.125 24q-.575 0-1.1-.175t-1-.475Zm3.35-4.575l-.9-.8l1-.85q.275-.225.413-.563t.137-.712q0-.775-.537-1.312T18.175 14q-.4 0-.738.138t-.562.412l-.875 1l-.85-1q-.225-.275-.563-.413T13.85 14q-.75 0-1.287.55t-.538 1.35q0 .375.163.713t.462.612l.9.75l-1 .85q-.25.225-.388.55t-.137.725q0 .8.538 1.35t1.287.55q.375 0 .738-.175t.662-.525l.75-.85l.875 1q.225.275.563.413t.737.137q.775 0 1.313-.55t.537-1.35q0-.35-.162-.7t-.488-.625Zm-3.35.625q.575 0 .988-.412t.412-.988q0-.575-.413-.988t-.987-.412q-.575 0-.987.413t-.413.987q0 .575.413.988t.987.412ZM4 20V9.95H1L12 1l11 8.95h-3V11h-2V8.45l-6-4.9l-6 4.9V18h3v2H4Zm12.025-2Z"/></svg>
            <span className="font-bold sm:inline-block">
              {dictionary.siteName}
            </span>
          </Link>
        )}
        <div className="flex flex-1 items-center justify-end space-x-2">
           {renderNavLinks()}
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

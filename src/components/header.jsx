
'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Camera, Moon, Sun, Globe, Menu, Home, Bath, DollarSign, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { usePathname, useRouter } from 'next/navigation';
import { i18n } from '@/i18n-config';
import { useIsMobile } from '@/hooks/use-mobile';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function SiteHeader({ lang, dictionary }) {
  const { setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isHomePage = pathname === `/${lang}` || (pathname === '/' && lang === i18n.defaultLocale);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const logoImage = PlaceHolderImages.find((img) => img.id === 'logo');

  const navLinksConfig = [
    { href: '/', icon: Home, label: dictionary.navigation.home },
    { href: '/gallery', icon: Camera, label: dictionary.navigation.gallery },
    { href: '/sauna', icon: Bath, label: dictionary.gallery.categories.sauna },
    { href: '/pricing', icon: DollarSign, label: dictionary.gallery.categories.pricing },
    { href: '#contact', icon: Phone, label: dictionary.navigation.contact, isAnchor: true },
  ];

  const redirectedPathName = (locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const handleLinkClick = (isAnchor, href) => {
    setIsDrawerOpen(false);
    if (isAnchor) {
      if (isHomePage) {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(`/${lang}${href}`);
      }
    }
  };

  const NavLink = ({ href, icon: Icon, label, isAnchor, isSheet = false }) => {
    const fullHref = isAnchor ? href : `/${lang}${href === '/' ? '' : href}`;
    const isActive = !isAnchor && (pathname === fullHref || (href === '/' && pathname === `/${lang}`));
    
    const linkContent = (
      <>
        <Icon className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-primary' : ''}`} />
        <span className="font-medium">{label}</span>
      </>
    );

    const desktopClasses = `group relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`;
    
    const mobileClasses = `group flex items-center gap-3 rounded-lg border border-transparent px-4 py-3 text-base transition-colors hover:bg-accent hover:text-accent-foreground ${isActive ? 'bg-primary/10 border-primary/20 text-primary' : 'text-foreground'}`;

    if (isAnchor) {
      return (
        <a 
          href={fullHref} 
          className={isSheet ? mobileClasses : desktopClasses}
          onClick={(e) => {
            if (isHomePage && !isSheet) { // only prevent default for desktop smooth scroll
              e.preventDefault();
            }
            handleLinkClick(isAnchor, href);
          }}
        >
          {linkContent}
        </a>
      );
    }
    
    return (
      <Link
        href={fullHref}
        className={isSheet ? mobileClasses : desktopClasses}
        onClick={() => handleLinkClick(false, href)}
      >
        <div className="relative flex items-center gap-2">
            {linkContent}
            {!isSheet && (
                <span className={`absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-primary transition-all duration-300 ease-out group-hover:w-full ${isActive ? 'w-full' : ''}`}></span>
            )}
        </div>
      </Link>
    );
  };
  
  const renderMobileNav = () => (
     <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="left">
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={dictionary.navigation.menuTitle}>
            <Menu className="h-6 w-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-full w-3/4 max-w-xs">
          <DrawerHeader>
            <DrawerTitle>
                <Link href={`/${lang}`} className="flex items-center gap-2 text-lg font-semibold" onClick={() => setIsDrawerOpen(false)}>
                {logoImage && (
                    <Image 
                    src={logoImage.imageUrl}
                    alt="Mežlīči house logo"
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full object-cover"
                    />
                )}
                <span className="font-bold">{dictionary.siteName}</span>
                </Link>
            </DrawerTitle>
          </DrawerHeader>
           <nav className="grid gap-2 p-4">
            {navLinksConfig.map(link => (
              <NavLink key={link.href} {...link} isSheet={true} />
            ))}
          </nav>
        </DrawerContent>
      </Drawer>
  );

  const renderDesktopNav = () => (
    <nav className="hidden md:flex md:items-center md:gap-1">
      {navLinksConfig.map(link => (
        <NavLink key={link.href} {...link} />
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-start gap-4">
          {isMobile ? renderMobileNav() : null}
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            {logoImage && (
              <Image 
                src={logoImage.imageUrl}
                alt="Mežlīči house logo"
                width={24}
                height={24}
                className="h-6 w-6 rounded-full object-cover"
              />
            )}
            <span className="font-bold sm:inline-block">
              {dictionary.siteName}
            </span>
          </Link>
           {!isMobile ? renderDesktopNav() : null}
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Change language">
                <Globe className="h-[1.2rem] w-[1.2rem]" />
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
              <Button variant="ghost" size="icon" aria-label="Toggle theme">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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

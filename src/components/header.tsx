import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Camera, Euro, MapPin, Menu, Sun, Moon } from "lucide-react";
import { Switch } from "./ui/switch";

const navLinks = [
  { href: "#foto", label: "FOTO", icon: Camera },
  { href: "#cenas", label: "CENAS", icon: Euro },
  { href: "#objekti", label: "OBJEKTI", icon: MapPin },
];

export function SiteHeader() {
  return (
    <header className="sticky top-4 z-50 w-full">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-end px-4 md:px-8">
        <div className="flex items-center justify-end gap-4 rounded-full border bg-card/80 p-2 backdrop-blur-sm shadow-lg">
           <nav className="hidden md:flex items-center gap-4 text-sm px-4">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 p-1 rounded-full bg-secondary">
               <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground" />
               <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground" />
              <Switch id="theme-switcher" className="w-9 h-5 [&>span]:w-4 [&>span]:h-4 [&>span]:translate-x-0.5 data-[state=checked]:[&>span]:translate-x-[1.1rem]" />
            </div>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="grid gap-4 py-6">
                      {navLinks.map(({ href, label, icon: Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        className="flex w-full items-center py-2 text-lg font-semibold gap-2"
                      >
                         <Icon className="h-5 w-5" />
                        {label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

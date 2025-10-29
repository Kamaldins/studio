import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Camera, Euro, MapPin, Menu, Phone, Calendar } from "lucide-react";

const navLinks = [
  { href: "#foto", label: "FOTO", icon: Camera },
  { href: "#cenas", label: "CENAS", icon: Euro },
  { href: "#objekti", label: "ATRAŠANĀS VIETA", icon: MapPin },
  { href: "#sazinities", label: "SAZIŅA", icon: Phone },
  { href: "#kalendars", label: "KALENDĀRS", icon: Calendar },
];

export function SiteHeader() {
  return (
    <header className="sticky top-4 z-50 w-full">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="font-bold text-xl tracking-tight">
          Mežlīči
        </Link>
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

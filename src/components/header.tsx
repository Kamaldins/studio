import Link from "next/link";
import { Button } from "./ui/button";
import { Logo } from "./logo";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { href: "/#properties", label: "Properties" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center px-4 md:px-8">
        <div className="mr-4 flex">
          <Logo />
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <Button variant="ghost">Log In</Button>
          <Button>Sign Up</Button>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="grid gap-4 py-6">
                    <Logo />
                    {navLinks.map(({ href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      className="flex w-full items-center py-2 text-lg font-semibold"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

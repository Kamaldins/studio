import Link from "next/link";
import { Camera, Euro, Send } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "#foto", label: "FOTO", icon: Camera },
  { href: "#cenas", label: "CENAS", icon: Euro },
  { href: "#objekti", label: "OBJEKTI", icon: Send },
];

export function SiteHeader() {
  return (
    <header className="fixed top-4 sm:top-6 z-50 w-full px-4">
      <div className="container mx-auto flex h-14 max-w-lg items-center justify-center">
        <div className="flex items-center justify-between gap-4 rounded-full border bg-card/80 p-2 backdrop-blur-sm shadow-xl w-full">
           <nav className="flex flex-1 items-center justify-around gap-2 text-sm">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 pr-2">
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Gaišs</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

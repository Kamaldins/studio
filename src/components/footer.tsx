import { Mail, Phone } from "lucide-react";
import { Logo } from "./logo";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start">
            <Logo />
            <p className="mt-4 text-muted-foreground text-sm">
              Your serene escape into nature's embrace.
            </p>
          </div>
          <div className="md:mx-auto">
            <h3 className="font-headline text-lg font-semibold">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">(123) 456-7890</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:contact@mezliciretreat.com" className="text-muted-foreground hover:text-primary transition-colors">contact@mezliciretreat.com</a>
              </li>
            </ul>
          </div>
          <div className="md:ml-auto">
             <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/#properties" className="text-muted-foreground hover:text-primary transition-colors">Properties</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mežlīči Retreat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

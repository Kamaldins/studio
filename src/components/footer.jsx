
import Link from "next/link";

export function SiteFooter({ dictionary }) {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-medium">
              &copy; {new Date().getFullYear()} {dictionary.copyright}
            </p>
            <p className="text-xs text-muted-foreground">
              {dictionary.rights}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/privacy" 
              className="text-xs text-muted-foreground transition-colors duration-300 hover:text-primary hover:no-underline sm:text-sm"
            >
              {dictionary.privacy}
            </Link>
            <div className="h-4 w-px bg-border"></div>
            <span className="text-xs text-muted-foreground sm:text-sm">
              {dictionary.owner}
            </span>
          </div>
        </div>
        
        <div className="mt-6 border-t pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {dictionary.developedBy}{' '}
            <a 
              href="https://kamaltek.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              Kamaltek
            </a>
          </p>
          <p className="mt-2 text-xs text-muted-foreground/80">
            {dictionary.cookies}
          </p>
        </div>
      </div>
    </footer>
  );
}

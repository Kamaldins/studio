import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-medium">
              &copy; {new Date().getFullYear()} Brīvdienu māja "Mežlīči"
            </p>
            <p className="text-xs text-muted-foreground">
              Visas tiesības aizsargātas
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/privacy" 
              className="text-xs text-muted-foreground transition-colors duration-300 hover:text-primary hover:no-underline sm:text-sm"
            >
              Privātuma politika
            </Link>
            <div className="h-4 w-px bg-border"></div>
            <span className="text-xs text-muted-foreground sm:text-sm">
              Saimnieks: Andrejs
            </span>
          </div>
        </div>
        
        <div className="mt-4 border-t pt-4 text-center">
          <p className="text-xs text-muted-foreground/80">
            Šī vietne izmanto sīkdatnes labākai lietošanas pieredzei un funkcionalitātei
          </p>
        </div>
      </div>
    </footer>
  );
}

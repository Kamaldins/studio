import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
             <h3 className="font-headline text-lg font-semibold tracking-tight">
              Brīvdienu māja "Mežlīči"
             </h3>
            <p className="mt-4 text-muted-foreground text-sm max-w-xs">
              Klusa vieta mežā pie Daugavas, kur atgūt spēkus un relaksēties
            </p>
          </div>
          <div className="md:mx-auto">
            <h3 className="font-headline text-lg font-semibold">Saziņai</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+37129294621" className="text-muted-foreground hover:text-primary transition-colors">+371 29294621</a>
              </li>
               <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@mezlici.lv" className="text-muted-foreground hover:text-primary transition-colors">info@mezlici.lv</a>
              </li>
            </ul>
             <p className="mt-4 text-sm text-muted-foreground">Saimnieks: Andrejs</p>
          </div>
          <div className="md:ml-auto md:text-right">
             <h3 className="font-headline text-lg font-semibold">Saites</h3>
            <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Sākums</Link></li>
                <li><Link href="/#foto" className="text-muted-foreground hover:text-primary transition-colors">Foto</Link></li>
                <li><Link href="/#cenas" className="text-muted-foreground hover:text-primary transition-colors">Cenas</Link></li>
                <li><Link href="/#objekti" className="text-muted-foreground hover:text-primary transition-colors">Atrašanās vieta</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground space-y-2">
          <p>&copy; {new Date().getFullYear()} Brīvdienu māja "Mežlīči". Visas tiesības aizsargātas.</p>
           <p className="text-xs">Šī vietne izmanto sīkdatnes labākai lietošanas pieredzei un funkcionalitātei.</p>
        </div>
      </div>
    </footer>
  );
}

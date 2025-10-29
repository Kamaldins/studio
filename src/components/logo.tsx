import Link from 'next/link';
import { MountainSnow } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <MountainSnow className="h-6 w-6 text-primary" />
      <span className="font-headline text-xl font-semibold tracking-tight">
        Mežlīči Retreat
      </span>
    </Link>
  );
}

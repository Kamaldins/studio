import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, TriangleAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center space-y-8 text-center">
      <div className="flex items-center space-x-4">
        <TriangleAlert className="h-16 w-16 text-primary" />
        <h1 className="text-8xl font-black tracking-tighter text-primary">
          404
        </h1>
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Page Not Found
        </h2>
        <p className="text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
      </div>
      <Button asChild>
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Go to Homepage
        </Link>
      </Button>
    </div>
  );
}

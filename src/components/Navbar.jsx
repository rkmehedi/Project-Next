'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-muted border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
         
          <div className="flex-1">
            <Link href="/" className="flex items-center text-2xl font-bold">
              <ShoppingBag className="h-6 w-6 mr-2" />
              Next Store
            </Link>
          </div>

          
          <div className="flex-1 flex justify-center items-center space-x-6">
            <Link href="/" className="font-medium text-foreground hover:text-muted-foreground transition-colors">
              Home
            </Link>
            <Link href="/products" className="font-medium text-foreground hover:text-muted-foreground transition-colors">
              All Products
            </Link>
            
            {session && (
              <Link href="/dashboard/add-product" className="font-medium text-foreground hover:text-muted-foreground transition-colors">
                Add Product
              </Link>
            )}
          </div>

         
          <div className="flex-1 flex justify-end">
            {session ? (
              <Button variant="destructive" onClick={() => signOut()}>Logout</Button>
            ) : (
              <Button onClick={() => signIn('google', { callbackUrl: '/products' })}>Login</Button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
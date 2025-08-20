import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

async function getFeaturedProducts() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products?limit=3`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    console.error('Failed to fetch featured products');
    return [];
  }

  const result = await res.json();
  return result.data.slice(0, 3);
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="space-y-24 rounded-3xl">
      <section className="relative -mt-4  ">
        <div
          className="absolute inset-0  bg-cover bg-center rounded-3xl mt-4"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        ></div>
        <div className="relative text-white text-center py-32 md:py-48">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Elevate Your Digital World
            </h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto mb-8">
              Discover cutting-edge gadgets and accessories designed to elevate your everyday life. Unbeatable quality, unmatched prices.
            </p>
            <Button asChild size="lg">
              <Link href="/products">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
          <p className="text-muted-foreground mt-2">Check out some of our best-selling items.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card
              key={product._id}
              className="overflow-hidden h-full flex flex-col group border hover:shadow-xl transition-shadow duration-300 p-0"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto object-cover aspect-video transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>

              <div className="p-4 flex flex-col flex-grow space-y-2">
                <p className="text-base font-semibold truncate">
                  <span className="font-medium text-muted-foreground">Name: </span>
                  {product.name}
                </p>

                <p className="text-sm text-black flex-grow">
                  <span className="font-medium text-muted-foreground">Description: </span>
                  {product.description}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-lg font-bold">
                    <span className="font-medium text-muted-foreground text-base">Price: </span>
                    ${product.price.toFixed(2)}
                  </p>
                  <Button asChild size="sm">
                    <Link href={`/products/${product._id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

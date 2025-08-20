import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

async function getProducts() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default async function ProductsPage() {
  const { data: products } = await getProducts();

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">All Products</h1>
        <p className="text-muted-foreground mt-2">
          Explore our collection of the latest and greatest tech gadgets.
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-muted-foreground">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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
      )}
    </div>
  );
}

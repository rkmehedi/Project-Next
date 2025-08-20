import { notFound } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from 'lucide-react';

async function getProduct(id) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailsPage({ params }) {
  const result = await getProduct(params.id);
  if (!result || !result.success) {
    notFound();
  }
  
  const { data: product } = result;

  return (
    <div className="flex justify-center py-12">
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-start">
            <div>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="rounded-lg w-full h-auto object-cover aspect-square"
              />
            </div>

            <div className="flex flex-col space-y-4">
              <div className="space-y-1.5">
                <Badge>In Stock</Badge>
                <p className="text-lg font-medium text-muted-foreground">
                  Name: <span className="font-bold text-gray-800">{product.name}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Description: <span className="text-gray-700">{product.description}</span>
                </p>
              </div>

              <Separator />

              <div className="flex-grow space-y-2">
                <h2 className="text-lg font-semibold">Details</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.details}
                </p>
              </div>

              <div className="pt-2 space-y-4">
                <p className="text-3xl font-bold">
                  Price: <span className="text-gray-800">${product.price.toFixed(2)}</span>
                </p>
                <Button size="lg" className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

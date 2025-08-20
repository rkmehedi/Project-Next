'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'react-toastify';
import { LoaderCircle } from 'lucide-react'; // Import the loader icon

export default function AddProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error('Please select an image for the product.');
      return;
    }
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', image);
      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: 'POST', body: formData }
      );
      const imgbbData = await imgbbRes.json();
      
      if (!imgbbData.success) {
        throw new Error('Image upload failed: ' + imgbbData.error.message);
      }
      const imageUrl = imgbbData.data.url;

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price: parseFloat(price), details, imageUrl }),
      });

      if (res.ok) {
        toast.success('Product added successfully!');
        router.push('/products');
      } else {
        toast.error('Failed to add product. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error(error.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Add a New Product</CardTitle>
          <CardDescription>Fill out the form below to add a new product to the store.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              <Input id="image" type="file" onChange={handleImageChange} required disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" type="text" placeholder="e.g. Wireless Mouse" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Input id="description" type="text" placeholder="A brief summary of the product" value={description} onChange={(e) => setDescription(e.target.value)} required disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input id="price" type="number" placeholder="e.g. 29.99" value={price} onChange={(e) => setPrice(e.target.value)} required disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">Full Details</Label>
              <Textarea id="details" placeholder="Describe all the features of the product here." value={details} onChange={(e) => setDetails(e.target.value)} required rows={5} disabled={isLoading} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  <span>Adding Product...</span>
                </>
              ) : (
                'Add Product'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
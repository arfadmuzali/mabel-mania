"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useToast } from "../ui/use-toast";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function ProductCard({
  productImage,
  name,
  price,
  store,
  productId,
}) {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  async function addToCart() {
    if (status !== "authenticated") return;
    const response = await axios.post("/api/cart/addToCart", {
      productId,
      email: session?.user?.email,
      quantity: 1,
    });
    toast({
      title: response.data.message,
    });
  }
  return (
    <Card>
      <Link href={"/product/" + productId}>
        <CardHeader className="p-0 w-72 h-72 relative">
          <div
            className="w-72 h-72 bg-center bg-cover rounded-t"
            style={{ backgroundImage: `url(${productImage})` }}
          />
          <p className="absolute top-8 p-1 pr-2 bg-yellow-800 rounded-e text-white">
            {store}
          </p>

          <h1 className="text-xl py-1 px-3 font-black truncate">{name}</h1>
        </CardHeader>
      </Link>
      <CardContent className="px-3 py-1">
        <h1 className="text-normal font-semibold py-1">{price}</h1>
        <Button
          onClick={addToCart}
          className="w-full bg-yellow-700 hover:bg-yellow-600 text-lg"
        >
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
}

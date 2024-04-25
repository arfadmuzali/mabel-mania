"use client";
import image from "@/../public/img/image-furniture.webp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { navigate } from "@/lib/navigate";
import { useState, useEffect } from "react";
import SkeletonProduct from "@/components/skeleton/productSkeleton";
export default function ProductPage({ params: { productId } }) {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const { toast } = useToast();

  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(Number(number));
  };

  async function addToCart() {
    if (status !== "authenticated") return navigate("/signin");
    const response = await axios.post("/api/cart/addToCart", {
      productId,
      email: session?.user?.email,
      quantity: 1,
    });
    toast({
      title: response.data.message,
    });
  }

  async function getProduct() {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/product/" + productId);
      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);
  if (isLoading === false && !product) {
    return (
      <div className="flex w-screen my-14 justify-center items-center text-xl font-bold">
        Product Not Found
      </div>
    );
  }
  return isLoading ? (
    <SkeletonProduct />
  ) : (
    <div className="md:p-5 p-2 flex md:flex-row flex-col">
      <div className="md:w-3/6 w-full">
        <img src={product?.images?.url} alt="image" className="w-full" />
      </div>
      <div className="flex flex-col md:px-5 md:w-3/6 w-full">
        <h1 className="font-black text-2xl py-2">{product?.name}</h1>
        <p>{formatToRupiah(product?.price)}</p>
        <Link href={"#"} className="text-lg">
          {product?.Store?.name}
        </Link>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full border-t my-3"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>{product?.description}</AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="py-5 ">
          <Button
            onClick={addToCart}
            className="w-full bg-yellow-700 hover:bg-yellow-600 text-lg"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

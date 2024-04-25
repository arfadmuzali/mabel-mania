"use client";
import ProductCard from "@/components/card/productCard";
import ProductCardSkeleton from "@/components/skeleton/productCardSkeleton";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [q, category] = [searchParams.get("q"), searchParams.get("category")];
  const [products, setProducts] = useState([]);

  function handleCategorySelect(e) {
    router.push(`/search?q=${q}&category=${e}`);
  }

  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(Number(number));
  };

  useEffect(() => {
    async function getProductByQueryAndCategory() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/search?q=${q}&category=${category}`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getProductByQueryAndCategory();
  }, [q, category]);

  return (
    <div className="py-8 px-16">
      <div className="flex justify-end items-center m-3">
        <Select
          onValueChange={(e) => {
            console.log(e);
            handleCategorySelect(e);
          }}
        >
          <SelectTrigger className="flex lg:hidden">
            <SelectValue
              placeholder="All Category"
              onChange={() => {
                console.log("skdnakwn");
              }}
            ></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Living Room">Living Room</SelectItem>
              <SelectItem value="Dining Room">Dining Room</SelectItem>
              <SelectItem value="Bedroom">Bedroom</SelectItem>
              <SelectItem value="Kitchen">Kitchen</SelectItem>
              <SelectItem value="Office Room">Office Room</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 justify-items-center gap-4">
        <div className="bg-neutral-100 py-2 px-4 text-lg hidden lg:block justify-self-stretch">
          <h1 className="text-xl font-bold py-5">All Categories</h1>
          <RadioGroup
            className="flex flex-col gap-3"
            onValueChange={(e) => {
              console.log(e);
              handleCategorySelect(e);
            }}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value={""} id="none" />
              <Label htmlFor="none">None</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value={"Living Room"} id="Living Room" />
              <Label htmlFor="Living Room">Living Room</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value={"Dining Room"} id="Dining Room" />
              <Label htmlFor="Dining Room">Dining Room</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value={"Bedroom"} id="Bedroom" />
              <Label htmlFor="Bedroom">Bedroom</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value={"Office Room"} id="Office Room" />
              <Label htmlFor="Office Room">Office Room</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value={"Kitchen"} id="Kitchen" />
              <Label htmlFor="Kitchen">Kitchen</Label>
            </div>
          </RadioGroup>
        </div>
        {isLoading ? (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton className={"hidden lg:block"} />
          </>
        ) : (
          products?.map((product) => {
            return (
              <ProductCard
                key={product.id}
                name={product.name}
                productImage={product.images.url}
                price={formatToRupiah(product.price)}
                store={product.Store.name}
                productId={product.id}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

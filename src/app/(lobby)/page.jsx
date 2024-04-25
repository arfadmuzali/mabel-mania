"use client";
import ProductCard from "@/components/card/productCard";
import CardStore from "@/components/card/storeCard";
import Categories from "@/components/categories";
import Featured from "@/components/featured";
import Hero from "@/components/hero";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  async function getProductsAndStores() {
    //products
    const productResponse = await axios.get("/api/product");
    setProducts(productResponse.data.data);
    //stores
    const storeResponse = await axios.get("/api/store");
    setStores(storeResponse.data.data);
  }

  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  useEffect(() => {
    getProductsAndStores();
  }, []);
  return (
    <div>
      <Hero />
      <Categories />
      <div className="flex flex-col justify-center items-center gap-5 my-16 ">
        <Featured
          hrefDestination={"#"}
          titleLink={"View all products"}
          title={"Featured Product"}
          description={"Explore product from all around the world"}
        >
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                productId={product.id}
                name={product.name}
                productImage={product.images?.url}
                price={formatToRupiah(product.price)}
                store={product.Store.name}
              />
            );
          })}
        </Featured>
        <Featured
          hrefDestination={"#"}
          titleLink={"View all stores"}
          title={"Featured Store"}
          description={"Explore store from all around the world"}
        >
          {stores.map((store, index) => {
            return (
              <CardStore
                key={store.name + index}
                title={store.name}
                description={store.description}
                textButton={"Visit Store"}
                href={""}
              />
            );
          })}
        </Featured>
      </div>
    </div>
  );
}

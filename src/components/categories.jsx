"use client";
import { Utensils, Armchair, Bed, ChefHat } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const [categoryProduct, setCategoryProduct] = useState([]);

  const [categories, setCategories] = useState([
    {
      title: "Living Room",
      image: <Armchair />,
      product: 0,
    },
    {
      title: "Bedroom",
      image: <Bed />,
      product: 0,
    },
    {
      title: "Kitchen",
      image: <ChefHat />,
      product: 0,
    },
    {
      title: "Dining Room",
      image: <Utensils />,
      product: 0,
    },
  ]);

  async function getCategoryProduct() {
    try {
      const response = await axios.get("/api/category");
      // console.log(response.data.data.filter((e) => e.name === "Bedroom")[0]);
      setCategoryProduct(response.data.data);
      setCategories([
        {
          title: "Living Room",
          image: <Armchair />,
          product: response.data.data.filter((e) => e.name === "Living Room")[0]
            .products.length,
        },
        {
          title: "Bedroom",
          image: <Bed />,
          product: response.data.data.filter((e) => e.name === "Bedroom")[0]
            .products.length,
        },
        {
          title: "Kitchen",
          image: <ChefHat />,
          product: response.data.data.filter((e) => e.name === "Kitchen")[0]
            .products.length,
        },
        {
          title: "Dining Room",
          image: <Utensils />,
          product: response.data.data.filter((e) => e.name === "Dining Room")[0]
            .products.length,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCategoryProduct();
  }, []);
  return (
    <div className="flex flex-col mt-10 justify-center items-center">
      <h1 className="text-center py-8 text-3xl md:text-4xl font-semibold text-yellow-700">
        Explore by Category
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {categories.map((category) => {
          return (
            <Card
              key={category.title}
              title={category.title}
              image={category.image}
            >
              {category.product}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Card({ children, title, image }) {
  return (
    <Link
      href={"/search?q=&category=" + title}
      className="w-64 flex flex-col justify-center items-center  border border-gray-400 py-100 gap-2 p-10 rounded hover:opacity-90 shadow hover:shadow-lg hover:scale-95 transition-all"
    >
      <div className="w-max">{image}</div>
      <h1 className="text-yellow-700 text-center font-semibold text-2xl">
        {title}
      </h1>
      {children} product
    </Link>
  );
}

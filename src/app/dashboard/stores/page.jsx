"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import CardStore from "@/components/card/storeCard";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const { data: session, status } = useSession();
  async function getStores() {
    try {
      const response = await axios.post("/api/store", {
        email: session?.user?.email,
      });
      console.log(response);
      setStores(response.data.data.store);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(stores);
    }
  }
  useEffect(() => {
    if (status === "authenticated") {
      getStores();
    }
  }, [status, session]);
  return (
    <div className="flex flex-col">
      <div className="border-b pb-2 flex justify-between items-center">
        <div>
          <h1 className="text-3xl text-yellow-700 font-black">Stores</h1>
          <p className="text-sm">Manage your store</p>
        </div>
        <Link
          href={"/dashboard/stores/new-store"}
          className="bg-yellow-700 p-2 rounded-md hover:bg-yellow-600  text-neutral-100"
        >
          Create Store
        </Link>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 m-1 justify-center items-center">
        {stores.map((store, index) => {
          return (
            <CardStore
              key={index}
              title={store.name}
              description={store.description}
              textButton={"Manage Store"}
              href={`/dashboard/stores/` + store.id}
            />
          );
        })}
      </div>
    </div>
  );
}

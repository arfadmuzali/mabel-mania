"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

import { CirclePlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StoreSetting({ params: { storeId } }) {
  const [products, setProducts] = useState([]);

  //format prisma date

  async function getStores() {
    try {
      const response = await axios.post("/api/store/products", {
        storeId,
      });
      console.log(response.data.data);
      setProducts(response.data.data.Product);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStores();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="border-b pb-2 flex justify-between items-center">
        <div>
          <h1 className="text-3xl text-yellow-700 font-black">Store Setting</h1>
          <p className="text-sm">Add new product or update your store</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-yellow-700 p-2 rounded-lg hover:bg-opacity-90  text-white hover:text-white text-lg hover:bg-yellow-600 transition-all"
            >
              Setting
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Store Setting</DialogTitle>
              <DialogDescription>
                Make changes to your store here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input type="text" />
              <Label>Description</Label>
              <Textarea />
              <Button
                variant="outline"
                className="justify-self-end self-end w-fit bg-yellow-400 hover:bg-yellow-300"
              >
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex w-full justify-end px-5 py-2">
        <Link
          href={"/dashboard/stores/" + storeId + "/add-product"}
          className="flex p-1 rounded-full font-semibold gap-1 bg-yellow-400 hover:bg-yellow-300 text-black border"
        >
          <CirclePlusIcon />
          <span>Add</span>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            return (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.Category.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  {product.createdAt.toString().split("T")[0]}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

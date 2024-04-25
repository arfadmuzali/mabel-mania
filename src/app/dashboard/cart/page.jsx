"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  TableHeader,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  async function deleteCartItem(id) {
    try {
      const response = await axios.delete("/api/cart?id=" + id);
    } catch (error) {
      console.log(error);
    } finally {
      location.reload();
    }
  }
  async function getCart() {
    try {
      const response = await axios.get("/api/cart");
      console.log(response.data.cartItem);
      setCartItems(response.data.cartItem);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCart();
    console.log(cartItems);
  }, []);
  return (
    <div className=" flex flex-col">
      <div className="border-b pb-2 flex justify-between items-center">
        <div>
          <h1 className="text-3xl text-yellow-700 font-black">Cart</h1>
          <p className="text-sm">Your shopping cart</p>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Store</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Added at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((cart) => {
            console.log(cart);
            return (
              <TableRow key={cart.id}>
                <TableCell>{cart.product.name}</TableCell>
                <TableCell>{cart.product.Store.name}</TableCell>
                <TableCell>{cart.quantity}</TableCell>
                <TableCell>
                  {cart?.createAt?.toString().split("T")[0]}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    className="p-0 px-2"
                    onClick={() => {
                      deleteCartItem(cart.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

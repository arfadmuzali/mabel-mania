"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { navigate } from "@/lib/navigate";

export default function NewStore() {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function createStore(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post("/api/store/create-store", {
        email: session?.user?.email,
        name,
        description,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      toast({
        title: "Success create new store",
      });
      await navigate("/dashboard/stores");
    }
  }

  return (
    <div className=" flex flex-col">
      <div className="border-b pb-2 flex justify-between items-center">
        <div>
          <h1 className="text-3xl text-yellow-700 font-black">Create Store</h1>
          <p className="text-sm">Create your store and start selling</p>
        </div>
      </div>
      <div className="border rounded-xl w-full my-2 p-5">
        <form onSubmit={createStore} className="flex flex-col gap-2">
          <h1 className="text-xl font-medium pb-2">Add Store</h1>
          <Label htmlFor={"name"}>Name</Label>
          <Input
            id="name"
            placeholder={"Store name"}
            min="3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Label htmlFor={"description"}>Description</Label>
          <Textarea
            id="description"
            placeholder="Store description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            type="submit"
            variant="outline"
            className="self-end bg-yellow-700 hover:bg-yellow-600 font-black"
            disabled={isLoading}
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}

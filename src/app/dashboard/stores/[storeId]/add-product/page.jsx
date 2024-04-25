"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@/components/uploadthingComponent";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CircleX, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { navigate } from "@/lib/navigate";

export default function AddProduct({ params: { storeId } }) {
  const [alvalilableCategory, setAlvailableCategory] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState("");
  const button = useRef();

  const { toast } = useToast();

  async function deleteImage(e) {
    e.preventDefault();
    try {
      await axios.post("/api/uploadthing/deleteImage", {
        imageKey: imageUrl.key,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setImageUrl({});
    }
  }

  async function addNewProduct(e) {
    button.current.disabled = true;

    e.preventDefault();
    if (!name || !price || !imageUrl || !description || !category || !storeId) {
      toast({
        title: "Please fill in the form correctly",
      });
      return;
    }

    try {
      const newProduct = await axios.post("/api/product", {
        name,
        price,
        images: imageUrl,
        description,
        categoryId: category,
        storeId,
      });
      setImageUrl({});
    } catch (error) {
      console.log(error);
      deleteImage();
    } finally {
      toast({
        title: "Success create new product",
      });
      navigate("/dashboard/stores/" + storeId);
    }
  }

  useEffect(() => {
    async function getAlvailableCategory() {
      try {
        const response = await axios.get("/api/category");
        setAlvailableCategory(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAlvailableCategory();
    imageUrl
      ? window.addEventListener("beforeunload", async () => {
          await axios.post("/api/uploadthing/deleteImage", {
            imageKey: imageUrl.key,
          });
        })
      : null;
  }, [imageUrl]);

  return (
    <div className="flex flex-col">
      <div className="border-b pb-2 flex justify-between items-center">
        <div>
          <h1 className="text-3xl text-yellow-700 font-black">Add Product</h1>
          <p className="text-sm">Create Product</p>
        </div>
      </div>
      <form onSubmit={addNewProduct} className="flex flex-col gap-1 my-3">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Product name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <Label htmlFor="price">
          Price <span className="text-xs">(Rp.)</span>
        </Label>
        <Input
          id="price"
          type="number"
          min="0"
          placeholder="Product price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Product description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="my-2 text-normal">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {alvalilableCategory.map((category) => {
              return (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {imageUrl?.url ? (
          <div className="w-fit py-2 m-auto  justify-center items-center flex flex-col">
            <button className="w-fit m-2" onClick={deleteImage}>
              <CircleX className="bg-red-500 rounded-full" />
            </button>
            <img
              src={imageUrl.url}
              alt=""
              className="m-auto w-3/6 border rounded-lg"
            />
          </div>
        ) : null}
        {!imageUrl?.url ? (
          <UploadButton
            config={{
              disabled: true,
            }}
            className="ut-button:bg-yellow-600 ut-button:outline-none"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log(res[0]);
              setImageUrl(res[0]);
            }}
            onUploadError={() => {
              toast({
                title: "something error",
                variant: "destructive",
              });
            }}
          />
        ) : null}
        <Button
          ref={button}
          type="submit"
          className=" w-fit justify-self-end self-end bg-yellow-800 hover:bg-yellow-700"
        >
          Create
        </Button>
      </form>
    </div>
  );
}

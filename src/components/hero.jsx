// import furnitureImage from "@/../public/img/furniture-hero.jpg";
import furnitureImage from "@/../public/img/image-furniture.webp";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div
      className="h-screen bg-no-repeat bg-cover bg-center justify-center items-center flex"
      style={{ backgroundImage: `url(${furnitureImage.src})` }}
    >
      <div className=" backdrop-blur-sm bg-white/50 flex flex-col justify-center items-center md:w-5/6  p-8 gap-5">
        <h1 className="md:text-7xl text-3xl font-bold text-center">
          An e-commerce furniture shop built by{" "}
          <span className="text-yellow-700">arfadmuzali</span>
        </h1>
        <p className="md:text-xl text-lg font-semibold opacity-90 text-center">
          Buy and sell furniture from all over the world
        </p>
        <footer className="flex gap-4">
          <Link
            href={"#"}
            className="font-normal text-base px-3 py-1 rounded hover:opacity-95 bg-yellow-700 text-white"
          >
            Buy now
          </Link>
          <Link
            href={"/dashboard/stores"}
            className="bg-white font-normal text-base px-3 py-1 rounded hover:opacity-95 "
          >
            Sell now
          </Link>
        </footer>
      </div>
    </div>
  );
}

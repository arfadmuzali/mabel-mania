import storeImage from "@/../public/icon/store.png";
import Link from "next/link";
import Image from "next/image";

export default function CardStore({ title, description, href, textButton }) {
  return (
    <div className="flex flex-col gap-2 w-64 h-60 border rounded-lg shadow ">
      <div className="flex items-center justify-center border-b p-2 bg-yellow-400 rounded-t-lg h-28">
        <Image src={storeImage} alt="Store" className="w-14" />
      </div>
      <div className="mx-2 h-32 my-2 flex flex-col justify-between">
        <div className="mx-2">
          <h1 className="text-xl">{title}</h1>
          <p className="text-sm">{description}</p>
        </div>

        <Link
          href={href}
          className="w-full text-center text-white bg-yellow-700 rounded p-2 hover:bg-yellow-600 transition-all font-base"
        >
          {textButton}
        </Link>
      </div>
    </div>
  );
}

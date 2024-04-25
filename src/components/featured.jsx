import Link from "next/link";
import { ChevronRight } from "lucide-react";
export default function Featured({
  hrefDestination,
  title,
  description,
  titleLink,
  children,
}) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 md:justify-normal justify-center items-center px-7 md:w-5/6 ">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-1 md:px-20 justify-center items-center">
        {children}
      </div>
      <Link
        href={hrefDestination}
        className="flex text-lg items-center lg:gap-2 hover:text-yellow-700"
      >
        {titleLink} <ChevronRight />
      </Link>
    </>
  );
}

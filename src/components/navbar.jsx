"use client";
import { useState } from "react";
import icon from "@/../public/img/furniture.png";
import { Search, ShoppingCart, Menu } from "lucide-react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import AvatarProfile from "./avatar/avatar";
import { useRouter } from "next/navigation";

export default function NavBar({ isDashboard }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  function searchProduct(e) {
    e.preventDefault();
    router.push("/search?q=" + search + "&category=");
  }

  const CheckIsDashboard = !isDashboard ? (
    <Sheet open={isOpen} onOpenChange={setIsOpen} className="lg:hidden block">
      <SheetTrigger asChild className="lg:hidden block">
        <Button
          className="rounded-full bg-inherit w-fit p-3 border-0 flex justify-center items-center"
          variant="secondary"
        >
          <Menu className="w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center justify-start gap-2 ">
              <img src={icon.src} className="w-6" />
              <span className="font-bold text-lg">Mabel Mania</span>
            </div>
          </SheetTitle>
        </SheetHeader>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Getting Started</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <Link href={"/dashboard/stores"} onClick={() => setIsOpen(false)}>
                Create Store
              </Link>
              <Link href={"#"} onClick={() => setIsOpen(false)}>
                Product
              </Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <Link
                href={"/search?q=&category=Living Room"}
                onClick={() => setIsOpen(false)}
              >
                Living Room
              </Link>
              <Link
                href={"/search?q=&category=Dining Room"}
                onClick={() => setIsOpen(false)}
              >
                Dining Room
              </Link>
              <Link
                href={"/search?q=&category=Bedroom"}
                onClick={() => setIsOpen(false)}
              >
                Bedroom
              </Link>
              <Link
                href={"/search?q=&category=Kitchen"}
                onClick={() => setIsOpen(false)}
              >
                Kitchen
              </Link>
              <Link
                href={"/search?q=&category=Office Room"}
                onClick={() => setIsOpen(false)}
              >
                Office Room
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Link
          href={"/dashboard/cart"}
          className="w-full flex items-center justify-center p-2 hover:bg-neutral-100 rounded text-lg font-semibold gap-2"
        >
          <ShoppingCart />
        </Link>
      </SheetContent>
    </Sheet>
  ) : (
    <Sheet open={isOpen} onOpenChange={setIsOpen} className="lg:hidden block">
      <SheetTrigger asChild className="lg:hidden block">
        <Button
          className="rounded-full bg-inherit w-fit p-3 border-0 flex justify-center items-center"
          variant="secondary"
        >
          <Menu className="w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center justify-start gap-2 ">
              <img src={icon.src} className="w-6" />
              <span className="font-bold text-lg">Mabel Mania</span>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-5 mt-5">
          <Link
            className="hover:underline"
            href={"/dashboard/stores"}
            onClick={() => setIsOpen(false)}
          >
            Store
          </Link>
          <Link
            className="hover:underline"
            href={"/dashboard/cart"}
            onClick={() => setIsOpen(false)}
          >
            Cart
          </Link>
        </div>

        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-2">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <Link
                href={"/search?q=&category=Living Room"}
                onClick={() => setIsOpen(false)}
              >
                Living Room
              </Link>
              <Link
                href={"/search?q=&category=Dining Room"}
                onClick={() => setIsOpen(false)}
              >
                Dining Room
              </Link>
              <Link
                href={"/search?q=&category=Bedroom"}
                onClick={() => setIsOpen(false)}
              >
                Bedroom
              </Link>
              <Link
                href={"/search?q=&category=Kitchen"}
                onClick={() => setIsOpen(false)}
              >
                Kitchen
              </Link>
              <Link
                href={"/search?q=&category=Office Room"}
                onClick={() => setIsOpen(false)}
              >
                Office Room
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Link
          href={"/dashboard/cart"}
          className="w-full md:hidden flex items-center justify-center p-2 hover:bg-neutral-100 rounded text-lg font-semibold gap-2"
        >
          <ShoppingCart />
        </Link>
      </SheetContent>
    </Sheet>
  );

  return (
    <nav className="sticky top-0 border-b flex py-4 lg:px-7 px-2 justify-between bg-white z-50">
      {/* left */}
      <div className="flex justify-center items-center gap-2">
        <Link href={"/"} className="flex items-center justify-center gap-2 ">
          <img
            src={icon.src}
            alt="MBL"
            className=" w-10 rounded-full  p-2  bg-yellow-500"
          />
          <span className="font-bold text-lg md:block hidden">Mabel Mania</span>
        </Link>
        <NavigationMenu className="lg:block hidden">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-semibold">
                Getting Started
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem title={"Create Store"}>
                    Create store and start selling a product
                  </ListItem>
                  <ListItem title={"Product"}>
                    All product we have to offer
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-semibold">
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href={"Living Room"} title={"Living Room"}>
                    Furniture for Living room
                  </ListItem>
                  <ListItem href={"Dining Room"} title={"Dining Room"}>
                    Furniture for Dining Room
                  </ListItem>
                  <ListItem href={"Bedroom"} title={"Bedroom"}>
                    Furniture for Bedroom
                  </ListItem>
                  <ListItem href={"Kitchen"} title={"Kitchen"}>
                    Furniture for Kitchen
                  </ListItem>
                  <ListItem href={"Office Room"} title={"Office Room"}>
                    Furniture for Office Room
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <form onSubmit={searchProduct} className="flex md:w-3/6">
        <Input
          type="text"
          placeholder="Search Products..."
          className="rounded-l-lg rounded-r-none border-r-0 outline-none pl-5 text-base"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></Input>
        <Button
          type="submit"
          className="rounded-l-none rounded-r-lg bg-inherit border border-l-0"
          variant="secondary"
        >
          <Search className="w-5" />
        </Button>
      </form>

      {/* right */}
      <div className="flex justify-center items-center md:gap-5 gap-1">
        <Link
          href={"/dashboard/cart"}
          className="rounded-full bg-inherit border gap-3 md:flex hidden p-2"
        >
          <ShoppingCart className="w-6 " />
        </Link>
        <AvatarProfile />

        {/* mobile nav */}
        {CheckIsDashboard}
      </div>
    </nav>
  );
}

function ListItem({ children, title, href }) {
  return (
    <li>
      <NavigationMenuLink asChild href={"/search?q=&category=" + href}>
        <a
          className={
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          }
        >
          <div className=" font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}

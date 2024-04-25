import NavBar from "@/components/navbar";
import Link from "next/link";
import { ShoppingCart, Store } from "lucide-react";
import Footer from "@/components/footer";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/authOption";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Mabel Mania - Dashboard",
};

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOption);
  if (!session?.user) redirect("/signin");

  return (
    <>
      <NavBar isDashboard={true} />
      <div className="flex lg:px-32">
        <div className="hidden md:flex flex-col border-r py-10 gap-5 p-5">
          <Link
            href={"/dashboard/cart"}
            className="flex gap-2 font-semibold hover:text-yellow-900 hover:bg-yellow-200 py-2 px-3 rounded justify-between hover:shadow text-neutral-700"
          >
            <span className="">Cart</span>
            <ShoppingCart />
          </Link>
          <Link
            href={"/dashboard/stores"}
            className="flex gap-2 font-semibold hover:text-yellow-900 hover:bg-yellow-200 p-2 rounded justify-between hover:shadow text-neutral-700"
          >
            <span className="">Stores</span>
            <Store />
          </Link>
        </div>
        <div className="m-7 w-full">{children}</div>
      </div>
      <Footer />
    </>
  );
}

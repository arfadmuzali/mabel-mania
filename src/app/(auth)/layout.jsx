import image from "@/../public/img/signin-image.webp";
import icon from "@/../public/img/furniture.png";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/authOption";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Mabel Mania - Sign In",
};

export default async function AuthLayout({ children }) {
  const session = await getServerSession(authOption);

  if (session?.user) redirect("/");

  return (
    <div>
      <div
        className="h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${image.src})` }}
      >
        <div className="p-6 top-0 absolute left-0">
          <Link href={"/"} className="flex items-start justify-start gap-2">
            <img src={icon.src} className="w-6" />
            <span className="font-bold text-lg">Mabel Mania</span>
          </Link>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

import { getServerSession } from "next-auth";
import { authOption } from "@/lib/authOption";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();

export default async function LayoutStoreId({ children, params: { storeId } }) {
  const session = await getServerSession(authOption);
  const user = await prisma.store.findUnique({
    where: {
      id: storeId,
    },
    select: {
      User: true,
    },
  });
  if (user?.User?.email !== session?.user?.email) redirect("/");
  return children;
}

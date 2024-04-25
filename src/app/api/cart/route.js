import { authOption } from "@/lib/authOption";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOption);
  const cartUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
    select: {
      cartItem: {
        include: {
          product: {
            include: {
              Store: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json(cartUser);
}

export async function DELETE(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  // const session = await getServerSession(authOption);

  // if (!session || !session?.user) {
  // return NextResponse.json({
  //     message: "something error",
  //   });
  // }
  await prisma.cartItem.delete({
    where: {
      id,
    },
  });
  return NextResponse.json({
    message: "Success delete",
  });
}

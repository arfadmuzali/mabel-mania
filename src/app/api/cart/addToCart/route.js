import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function POST(request) {
  const reqBody = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email: reqBody.email,
    },
  });

  const checkIfItAlreadyExists = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      cartItem: {
        where: {
          productId: reqBody.productId,
        },
      },
    },
  });
  console.log(checkIfItAlreadyExists.cartItem[0]);

  if (checkIfItAlreadyExists.cartItem.length >= 1) {
    await prisma.cartItem.update({
      where: {
        id: checkIfItAlreadyExists?.cartItem[0]?.id,
      },
      data: {
        quantity: { increment: 1 },
      },
    });
    return NextResponse.json({
      message: "Quantity update",
    });
  }

  if (!user) {
    redirect("/signin");
    return;
  }
  if (!reqBody.productId) {
    return NextResponse.json({
      message: "something error",
    });
  }

  await prisma.cartItem.create({
    data: {
      userId: user.id,
      productId: reqBody.productId,
      quantity: reqBody.quantity,
    },
  });

  return NextResponse.json({
    message: "Product added",
  });
}

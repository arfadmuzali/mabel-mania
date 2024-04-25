import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const reqBody = await request.json();

  const products = await prisma.store.findUnique({
    where: {
      id: reqBody.storeId,
    },
    select: {
      Product: {
        include: {
          Category: true,
        },
      },
    },
  });
  return NextResponse.json({
    message: "success",
    data: products,
  });
}

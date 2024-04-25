import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { productId } = params;

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      Store: true,
    },
  });

  return NextResponse.json({
    product,
  });
}

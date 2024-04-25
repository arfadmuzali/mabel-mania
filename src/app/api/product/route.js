import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const reqBody = await request.json();

  const { name, description, price, images, categoryId, storeId } = reqBody;

  if (!name || !description || !price || !images || !categoryId || !storeId) {
    return NextResponse.json({
      message: "someting missing",
    });
  }

  const createProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      categoryId,
      images,
      storeId,
    },
  });

  return NextResponse.json({
    message: "Success create new product",
    data: createProduct,
  });
}

export async function GET() {
  const products = await prisma.product.findMany({
    take: 4,
    include: {
      Store: true,
    },
  });
  return NextResponse.json({
    message: "success",
    data: products,
  });
}

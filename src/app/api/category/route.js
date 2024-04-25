import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const category = await prisma.category.findMany({
    include: {
      products: true,
    },
  });
  return NextResponse.json({
    message: "Success",
    data: category,
  });
}

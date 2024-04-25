import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const reqBody = await request.json();
  const stores = await prisma.user.findUnique({
    where: {
      email: reqBody.email,
    },
    select: {
      store: true,
    },
  });

  return NextResponse.json({
    message: "success",
    data: stores,
  });
}

export async function GET() {
  const stores = await prisma.store.findMany({
    take: 4,
  });
  return NextResponse.json({
    message: "success",
    data: stores,
  });
}

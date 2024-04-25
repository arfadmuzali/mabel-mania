import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const reqBody = await request.json();

  const userId = await prisma.user.findUnique({
    where: {
      email: reqBody.email,
    },
    select: {
      id: true,
    },
  });

  if (!userId || reqBody.name < 3)
    return NextResponse.json({
      message: "something error",
    });

  await prisma.store.create({
    data: {
      name: reqBody.name,
      description: reqBody.description,
      userId: userId.id,
    },
  });

  return NextResponse.json({
    message: "success",
  });
}

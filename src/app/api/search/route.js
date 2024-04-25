import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const categoryName = searchParams.get("category");

  // category only
  if (q.length === 0 && categoryName) {
    const category = await prisma.category.findUnique({
      where: {
        name: categoryName,
      },
    });
    const products = await prisma.product.findMany({
      where: {
        categoryId: category.id,
      },
      include: {
        Store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (products.lenght === 0) {
      return NextResponse.json({
        message: "Cant found product",
      });
    }

    return NextResponse.json({
      products,
    });
  }

  // if include category
  if (categoryName) {
    const category = await prisma.category.findUnique({
      where: {
        name: categoryName,
      },
    });

    const products = await prisma.product.findMany({
      where: {
        AND: [
          {
            name: {
              search: q,
            },
          },
          {
            categoryId: category.id,
          },
        ],
      },
      include: {
        Store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (products.length === 0) {
      return NextResponse.json({
        message: "Cant found product",
      });
    }
    return NextResponse.json({
      products,
    });
  }

  // if only name
  const products = await prisma.product.findMany({
    where: {
      name: {
        search: q,
      },
    },
    include: {
      Store: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (products.lenght === 0) {
    return NextResponse.json({
      message: "Cant found product",
    });
  }

  return NextResponse.json({
    products,
  });
}

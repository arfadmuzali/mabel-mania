import { utapi } from "@/lib/uploadthing";
import { NextResponse } from "next/server";

export async function POST(request) {
  const reqBody = await request.json();

  if (!reqBody.imageKey) {
    return NextResponse.json({
      message: "request not found",
    });
  }

  await utapi.deleteFiles(reqBody.imageKey);

  return NextResponse.json({
    message: "success delete",
  });
}

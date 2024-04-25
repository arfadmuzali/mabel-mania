import { getServerSession } from "next-auth";
import { authOption } from "@/lib/authOption";

import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOption);

      if (!session || !session?.user)
        throw new UploadThingError("Unauthorized");

      return session?.user;
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return {
        message: "success upload file",
        file,
      };
    }),
};

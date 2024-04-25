"use client";
import { Button } from "@/components/ui/button";
import facebook from "@/../public/icon/facebook.png";
import github from "@/../public/icon/github.png";
import google from "@/../public/icon/google.png";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="p-8 bg-white bg-opacity-90 rounded">
      <h1 className="text-3xl font-semibold">Sign in</h1>
      <p className="mb-5">Choose your sign in method</p>
      <div className="flex flex-col justify-center items-center md:w-96 w-80 gap-2 ">
        <Button onClick={() => signIn("google")} className="w-full flex gap-2">
          <img src={google.src} className="w-6" />
          Google
        </Button>
        <Button
          onClick={() => signIn("github")}
          variant="outline"
          className="w-full flex gap-2"
        >
          <img src={github.src} className="w-6" />
          Github
        </Button>
        <h3 className="text-sm font-light">not yet available</h3>
        <Button
          onClick={() => signIn("facebook")}
          variant="outline"
          disabled
          className="w-full flex gap-2"
        >
          <img src={facebook.src} className="w-6" />
          Facebook
        </Button>
      </div>
    </div>
  );
}

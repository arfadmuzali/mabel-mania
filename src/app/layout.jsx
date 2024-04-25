import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "../providers/authProvider";

const roboto = Open_Sans({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Mabel Mania",
  description: "an furniture e-commerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className} suppressHydrationWarning>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

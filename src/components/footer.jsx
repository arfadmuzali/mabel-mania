import icon from "@/../public/img/furniture.png";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="flex md:flex-row flex-col justify-start pl-10 lg:pl-0 lg:justify-center items-start border-t py-5 gap-10">
      <Link href={"/"} className="flex items-center justify-center gap-2 ">
        <img src={icon.src} className="w-6" />
        <span className="font-bold text-lg">Mabel Mania</span>
      </Link>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-10">
        <div className="flex flex-col justify-center items-start gap-2">
          <h1 className="text-lg font-semibold">Inspired By</h1>
          <Link href="https://skaters-inifarhan.vercel.app/">
            Skaters-inifarhan
          </Link>
          <Link href="https://skateshop.sadmn.com/">Skateshop</Link>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <h1 className="text-lg font-semibold">Social</h1>
          <Link href="https://twitter.com/arfad234">Twitter</Link>
          <Link href="https://instagram.com/arfadmuzali">Instagram</Link>
          <Link href="https://github.com/arfadmuzali">GitHub</Link>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <h1 className="text-lg font-semibold">Thanks For</h1>
          <Link href="https://open.noice.id/catalog/ab88f196-a8a2-4ec0-9272-c7f82e68f935">
            Siniar HIM
          </Link>
          <Link href="https://open.spotify.com/show/6EmSBAixLaU1CwSu6gyujz">
            PORD
          </Link>
          <Link href="https://open.noice.id/catalog/6aa9323a-a1c1-45c5-984d-680a18dc0549">
            Berbeda Tapi Bersama
          </Link>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <h1 className="text-lg font-semibold">Email</h1>
          <p>arfadmuzali258@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

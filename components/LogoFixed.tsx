"use client";
import Image from "next/image";
import Link from "next/link";

export default function LogoFixed() {
  return (
      <Link href="/" className="text-2xl font-bold text-blue-900 fixed top-5 left-5 z-50 px-10 py-5 bg-white rounded-lg hover:shadow-lg border-transparent hover:border-blue-500 border-2 transition-all">
        <Image
          src="/flogo.png"
          alt="ServyDash Logo"
          width={300}
          height={100}
          className="object-contain"
        />
      </Link>
  );
}

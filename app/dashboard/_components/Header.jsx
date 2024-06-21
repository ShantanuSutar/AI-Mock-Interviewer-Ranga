"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const pathName = usePathname();

  return (
    <div className=" flex p-4 items-center justify-between  md:px-12 sm:px-2 px-10  bg-slate-50 shadow">
      <div className="flex items-center gap-2">
        <Image src={"/logo.svg"} width={40} height={40} alt="Logo" />
        <span className=" italic font-semibold text-xl">Ranga</span>
      </div>
      <ul className="a hidden sm:flex gap-6 ">
        <li
          style={{
            borderColor: pathName === "/dashboard" ? "black" : "",
            fontWeight: pathName === "/dashboard" ? "600" : "",
          }}
          className=" border-b-2 border-transparent hover:border-b-2 hover:border-black  transition-all cursor-pointer duration-100"
        >
          Dashboard
        </li>
        <li
          style={{
            borderColor: pathName === "/questions" ? "black" : "",
            fontWeight: pathName === "/questions" ? "600" : "",
          }}
          className="border-b-2 border-transparent hover:border-b-2 hover:border-black  transition-all cursor-pointer duration-100"
        >
          Questions
        </li>
        <li
          style={{
            borderColor: pathName === "/upgrade" ? "black" : "",
            fontWeight: pathName === "/upgrade" ? "600" : "",
          }}
          className="border-b-2 border-transparent hover:border-b-2 hover:border-black  transition-all cursor-pointer duration-100"
        >
          Upgrade
        </li>
        <li
          style={{
            borderColor: pathName === "/how-it-works" ? "black" : "",
            fontWeight: pathName === "/how-it-works" ? "600" : "",
          }}
          className="border-b-2 border-transparent hover:border-b-2 hover:border-black  transition-all cursor-pointer duration-100"
        >
          How it works
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;

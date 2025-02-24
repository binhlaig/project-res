"use client";
import React, { useState } from "react";
import { NavLink } from "@/lib/constants";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";


const LeftSideBar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const { status } = useSession();

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <button
          className="text-white cursor-pointer"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/");
              window.location.reload();
            });
          }}
        >
          Sign Out
        </button>
      );
    } else if (status === "loading") {
      return (
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
      );
    } else {
      return (
        <Link
          href="/login"
          className="border  border-black rounded"
        >
          Sign In
        </Link>
      );
    }
  };
  const [dropdownMenu, setDropdownMenu] = useState(false);

  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-900 shadow-xl max-lg:hidden">
      <h2 className="text-white"> Bin Hlaig Group</h2>
      <div className="flex flex-col gap-12 text-black">
        {NavLink.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className="flex gap-4 text-body-medium "
          >
            {link.icon} <p className="text-white">{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 text-body-medium items-center">      
          <Image
            src={user?.image || "/noavatar.png"}
            alt=""
            width={30}
            height={30}
          />
        <p className="text-white cursor-pointer" onClick={()=> setDropdownMenu(!dropdownMenu)}>{user?.username}</p>
        {dropdownMenu &&(
          <p className="absolute bottom-32 right-10 flex flex-col gap-8 p-5 ">{showSession()}</p>
        )}
      </div>
    </div>
  );
};

export default LeftSideBar;

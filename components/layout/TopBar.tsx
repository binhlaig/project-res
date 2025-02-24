"use client";
import React, { useState } from "react";
import { NavLink } from "@/lib/constants";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const TopBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden">
      <h2 className="text-white"> Bin Hlaig Group</h2>
      <div className="flex gap-8 max-md:hidden">
        <Image
          src={user?.image || "/noavatar.png"}
          alt=""
          width={30}
          height={30}
        />
        {NavLink.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className="flex gap-4 text-body-medium "
          >
            {link.icon} <p className="text-black">{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="relative flex gap-4 items-center">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />
        {dropdownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">
            {NavLink.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className="flex gap-4 text-body-medium "
              >
                {link.icon} <p className="text-black">{link.label}</p>
              </Link>
            ))}
            <Image
              src={user?.image || "/noavatar.png"}
              alt=""
              width={30}
              height={30}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;

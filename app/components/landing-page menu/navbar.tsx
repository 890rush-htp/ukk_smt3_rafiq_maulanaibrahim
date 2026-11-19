"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoginModal } from "./login-modal";

const menu = [
  { label: "Home", href: "/" },
  { label: "Aktivitas", href: "/aktivitas", dropdown: true },
  { label: "Jurusan", href: "/jurusan", dropdown: true },
  { label: "SPMB", href: "/spmb" },
  { label: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      {/* Navbar melayang di tengah atas */}
      <div className="fixed left-0 top-0 z-50 mt-6 flex w-full justify-center">
        <nav className="flex w-[90%] max-w-5xl items-center justify-between rounded-full bg-gradient-to-r from-blue-700 via-indigo-700 to-orange-500 px-6 py-3 shadow-lg">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/img/logo-mvp.jpg"
              alt="Logo SMK MVP ARS"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="text-lg font-bold tracking-wide text-white">
              MVP ARS
            </span>
          </Link>

          {/* Menu tengah */}
          <ul className="hidden items-center space-x-8 text-sm font-medium text-white md:flex">
            {menu.map(({ label, href, dropdown }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-1",
                    pathname === href
                      ? "border-b-2 border-white pb-1"
                      : "hover:text-gray-200"
                  )}
                >
                  {label}
                  {dropdown && <span className="text-xs">&#9662;</span>}
                </Link>
              </li>
            ))}
          </ul>

          {/* Tombol login */}
          <div className="flex items-center justify-end p-4">
            <Button
              onClick={() => setIsLoginOpen(true)}
              size="lg"
              className="rounded-full border border-gray-300 bg-white p-[20px] text-[16px] font-semibold text-orange-500 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-orange-400"
            >
              Login
            </Button>
          </div>
        </nav>
      </div>

      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

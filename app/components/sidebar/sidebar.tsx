"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminMenu } from "@/lib/admin-menu";
import { cn } from "@/lib/utils";

export function Sidebar({ open }: { open: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "shrink-0 overflow-hidden bg-[#1700e6] text-white transition-[width] duration-200",
        open ? "w-[168px]" : "w-0"
      )}
    >
      <div className="w-[168px]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 px-3 py-4">
          <Image
            src="/img/logo-mvp.jpg"
            alt="Logo MVP ARS"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="text-sm font-extrabold tracking-wide">MVP ARS</p>
            <p className="text-[7px] tracking-wide">INTERNATIONAL SCHOOL</p>
          </div>
        </div>

        {/* Menu */}
        <p className="px-2 pb-2 pt-3 text-[10px] font-semibold">Menu Utama</p>
        <nav className="space-y-0.5 px-1">
          {adminMenu.map(({ label, href, icon: Icon }) => {
            const isActive =
              href === "/admin"
                ? pathname === href
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2.5 rounded px-2 py-2 text-xs font-medium transition-colors hover:bg-white/15",
                  isActive && "bg-white/20"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
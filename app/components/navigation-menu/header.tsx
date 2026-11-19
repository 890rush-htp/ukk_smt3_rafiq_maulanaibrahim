"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, PanelLeft, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { useAdminUser } from "@/components/admin/admin-user-provider";

export function Header({ onToggle }: { onToggle: () => void }) {
  const { name, email } = useAdminUser();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <header className="flex h-12 items-center justify-between px-4">
      <button
        onClick={onToggle}
        aria-label="Buka/tutup sidebar"
        className="rounded p-1.5 hover:bg-slate-100"
      >
        <PanelLeft className="h-4 w-4" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full outline-none" aria-label="Menu profil">
          <Avatar className="h-7 w-7">
            {/* Ganti dengan foto Anda di public/img/avatar.png */}
            <AvatarImage src="/img/avatar.png" alt={name} />
            <AvatarFallback className="bg-gradient-to-br from-pink-500 to-indigo-600 text-[10px] font-bold text-white">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel>
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-xs font-normal text-muted-foreground">{email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => router.push("/admin/profile")}>
            <User className="h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={handleLogout}
            disabled={isLoggingOut}
            className="text-red-600 focus:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            {isLoggingOut ? "Keluar..." : "Keluar"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
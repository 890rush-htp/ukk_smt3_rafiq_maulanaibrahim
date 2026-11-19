"use client";

import { useState, type ReactNode } from "react";

import { Header } from "@/app/components/navigation-menu/header";
import { Sidebar } from "./sidebar";

export function AdminShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen bg-white font-sans">
      <Sidebar open={open} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onToggle={() => setOpen((v) => !v)} />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
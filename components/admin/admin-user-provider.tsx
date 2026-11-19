"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type AdminUserContextValue = {
  name: string;
  email: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
};

const AdminUserContext = createContext<AdminUserContextValue | null>(null);

/** Menyimpan data admin yang sedang login supaya Header dan halaman Profile selalu sinkron. */
export function AdminUserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("Administrator");
  const [email, setEmail] = useState("admin@mvpars.sch.id");

  return (
    <AdminUserContext.Provider value={{ name, email, setName, setEmail }}>
      {children}
    </AdminUserContext.Provider>
  );
}

export function useAdminUser() {
  const ctx = useContext(AdminUserContext);
  if (!ctx) {
    throw new Error("useAdminUser harus dipakai di dalam <AdminUserProvider>");
  }
  return ctx;
}

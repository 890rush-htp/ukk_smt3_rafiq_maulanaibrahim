import {
  FileText,
  GraduationCap,
  LayoutDashboard,
  List,
  Users,
  type LucideIcon,
} from "lucide-react";

export type AdminMenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const adminMenu: AdminMenuItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "User Management", href: "/admin/user-management", icon: Users },
  { label: "Categories", href: "/admin/categories", icon: List },
  { label: "Jurusan", href: "/admin/jurusan", icon: GraduationCap },
  { label: "Artikel", href: "/admin/article", icon: FileText },
  { label: "Profile", href: "/admin/profile", icon: Users },
];
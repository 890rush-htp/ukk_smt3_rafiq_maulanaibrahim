export { cn } from "cn";

/** Ambil 2 huruf pertama dari nama, untuk fallback avatar (mis. "Administrator" -> "AD"). */
export function getInitials(name: string) {
  return name.trim().slice(0, 2).toUpperCase() || "??";
}

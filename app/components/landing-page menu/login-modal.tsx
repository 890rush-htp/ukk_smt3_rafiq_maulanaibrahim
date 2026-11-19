"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
};

export function LoginModal({ open, onClose }: LoginModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Login gagal.");
        return;
      }

      onClose();
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-900">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Login Admin
        </h2>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Silakan masukkan akun untuk masuk ke halaman dashboard admin.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="modal-email"
              className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="modal-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@profilecompany.com"
              required
              className="w-full rounded-lg border px-4 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="modal-password"
              className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="modal-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-lg border px-4 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

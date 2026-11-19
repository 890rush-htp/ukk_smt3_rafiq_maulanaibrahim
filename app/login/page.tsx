"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm border-slate-800 bg-slate-950 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login Admin</CardTitle>
          <CardDescription className="text-slate-400">
            Masukkan email untuk masuk ke panel admin SMK MVP ARS
          </CardDescription>
          <CardAction>
            <Link href="/">
              <Button variant="link" className="text-blue-400 hover:text-blue-300">
                Ke Beranda
              </Button>
            </Link>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-slate-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@smkmvpars.sch.id"
                  required
                  className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-slate-200">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-xs text-blue-400 underline-offset-4 hover:underline"
                  >
                    Lupa password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  className="bg-slate-900 border-slate-800 text-white focus:border-blue-500"
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-3">
          <Link href="/admin" className="w-full">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Login ke Dashboard
            </Button>
          </Link>

          <Button variant="outline" className="w-full border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white">
            Login dengan Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
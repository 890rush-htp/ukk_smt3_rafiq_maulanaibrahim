import { Hero } from "@/app/components/landing-page hero/hero";
import { Navbar } from "@/app/components/landing-page menu/navbar";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-gray-600 via-gray-700 to-gray-900">
      <Navbar />
      <Hero />
    </main>
  );
}

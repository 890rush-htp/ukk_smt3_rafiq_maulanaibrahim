export function Hero() {
  return (
    <div className="mt-20 flex flex-1 flex-col items-center justify-center px-4 text-center">
      {/* Badge */}
      <div className="mb-6 rounded-full border border-gray-400/50 bg-white/5 px-5 py-1.5 backdrop-blur-sm">
        <span className="text-sm font-medium tracking-wide text-gray-300">
          jurusan Digital & Modern
        </span>
      </div>

      {/* Judul utama */}
      <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_4px_rgba(255,255,255,0.25)] md:text-7xl">
        UKK SMT3 <br />
        XI RPL  
      </h1>

      {/* Subjudul */}
      <p className="mb-12 max-w-2xl text-lg font-light text-gray-300 md:text-xl">
        Brilliant, Entrepreneur, Religious, Active, Nationality, Integrity
      </p>

      {/* Tombol aksi */}
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <button className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.7)] transition-all hover:bg-blue-700">
          Daftar Sekarang
        </button>
        <button className="rounded-full border border-gray-400 bg-transparent px-8 py-3 font-semibold text-white transition-all hover:bg-white/10">
          Pelajari Lagi
        </button>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, ShipWheelIcon } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <ShipWheelIcon className="size-16 text-primary mb-4" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Halaman Tidak Ditemukan</h2>
      <p className="text-base-content/70 mb-6 max-w-md">
        Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah
        dipindahkan.
      </p>
      <Link to="/" className="btn btn-primary gap-2">
        <HomeIcon className="size-4" />
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFoundPage;

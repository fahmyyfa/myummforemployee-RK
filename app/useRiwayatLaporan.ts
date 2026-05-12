import { useState, useEffect } from "react";
import { getRiwayatMengajarUser, RiwayatLaporan } from "../api/laporanService";

export const useRiwayatLaporan = () => {
  const [riwayat, setRiwayat] = useState<RiwayatLaporan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRiwayat = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getRiwayatMengajarUser();
        setRiwayat(data);
      } catch (err: any) {
        console.error("Fetch Error:", err);
        setError(err.message || "Terjadi kesalahan saat mengambil data");
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayat();
  }, []);

  return { riwayat, loading, error };
};
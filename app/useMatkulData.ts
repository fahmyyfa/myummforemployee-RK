import { useEffect, useState } from "react";

export interface MatkulType {
  nama: string;
  sks: number;
  dosen: string;
  kelas: string;
  semester: string;
}

export function useMatkulData(matkulId: string) {
  const [data, setData] = useState<MatkulType | null>(null);

  useEffect(() => {
    setData({
      nama: "Pemrograman Mobile",
      sks: 3,
      dosen: "Dr. Ahmad Wijaya",
      kelas: "Kelas A",
      semester: "Ganjil 2024/2025",
    });
  }, [matkulId]);

  return { matkul: data };
}

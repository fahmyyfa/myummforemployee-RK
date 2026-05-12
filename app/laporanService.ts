import { supabase } from "../lib/supabase";

export interface RiwayatLaporan {
  id: string;
  user_id: string;
  tahun_akademik: string;
  semester: string;
}

export const getRiwayatMengajarUser = async (): Promise<RiwayatLaporan[]> => {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !session?.user) {
    throw new Error("User tidak terautentikasi");
  }
  const { data, error } = await supabase
    .from("riwayat_mengajar")
    .select("*")
    .eq("user_id", session.user.id)
    .order("tahun_akademik", { ascending: false });

  if (error) {
    throw error;
  }
  
  return data || [];
};
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router"; // FIX ERROR IMPORT DISINI
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function JadwalRiwayat() {
  const router = useRouter();
  const { mode } = useLocalSearchParams(); // Ambil mode: 'laporan' atau undefined

  const [riwayat, setRiwayat] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // LOGIKA DINAMIS UNTUK TEKS
  const isLaporan = mode === "laporan";
  const headerTitle = isLaporan ? "Riwayat Laporan" : "Jadwal Kuliah";
  const bannerSub = isLaporan ? "Laporan Peningkatan" : "Jadwal Perkuliahan";
  const bannerTitle = isLaporan
    ? "Pilih Semester\nLaporan Anda"
    : "Kelola Jadwal\nMengajar Anda";

  useEffect(() => {
    fetchRiwayat();
  }, []);

  const fetchRiwayat = async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user) {
      const { data, error } = await supabase
        .from("riwayat_mengajar")
        .select("*")
        .eq("user_id", session.user.id)
        .order("tahun_akademik", { ascending: false });
      if (error) console.error(error);
      setRiwayat(data || []);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER DINAMIS */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* BANNER DINAMIS */}
        <View style={styles.bannerBlue}>
          <Text style={styles.bannerSub}>{bannerSub}</Text>
          <Text style={styles.bannerTitle}>{bannerTitle}</Text>
        </View>

        <Text style={styles.sectionTitle}>Pilih Tahun Akademik</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#00468C"
            style={{ marginTop: 50 }}
          />
        ) : (
          riwayat.map((item, index) => (
            <View key={item.id} style={styles.listItem}>
              <View style={styles.numberBox}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={styles.listYear}>{item.tahun_akademik}</Text>
                <Text style={styles.listSemester}>
                  Semester {item.semester}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.detailBtn}
                onPress={() =>
                  router.push({
                    pathname: "/akademik_detail",
                    params: { id: item.id, mode: mode }, // Teruskan mode ke halaman berikutnya
                  })
                }
              >
                <Text style={styles.detailText}>Pilih</Text>
                <Ionicons name="arrow-forward" size={14} color="#FFF" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#FFF",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  bannerBlue: {
    backgroundColor: "#00468C",
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
  },
  bannerSub: { color: "rgba(255,255,255,0.7)", fontSize: 12 },
  bannerTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 15 },
  listItem: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    elevation: 1,
  },
  numberBox: {
    backgroundColor: "#E8F0F8",
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: { color: "#00468C", fontWeight: "bold" },
  listYear: { fontWeight: "bold", fontSize: 14 },
  listSemester: { fontSize: 12, color: "#777" },
  detailBtn: {
    backgroundColor: "#00468C",
    flexDirection: "row",
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  detailText: { color: "#FFF", fontSize: 12, marginRight: 5 },
});

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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

export default function LaporanMatkul() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [matkul, setMatkul] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Debugging: Cek terminal untuk melihat apakah parameter sampai
  console.log("Params diterima:", params);

  useEffect(() => {
    if (params.tahun && params.semester) {
      fetchMatkul();
    } else {
      setLoading(false);
    }
  }, [params.tahun, params.semester]);

  const fetchMatkul = async () => {
    setLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Query filter berdasarkan User ID, Tahun, dan Semester
      const { data, error } = await supabase
        .from("riwayat_mengajar")
        .select("*")
        .eq("user_id", session?.user.id)
        .eq("tahun_akademik", params.tahun)
        .eq("semester", params.semester);

      if (error) throw error;
      setMatkul(data || []);
    } catch (error: any) {
      console.error("Fetch Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daftar Mata Kuliah</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* INFO PERIODE */}
        <View style={styles.infoBox}>
          <Ionicons name="calendar-outline" size={16} color="#00468C" />
          <Text style={styles.periodText}>
            {params.tahun || "Tidak Terdeteksi"} - Semester{" "}
            {params.semester || "..."}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#00468C"
            style={{ marginTop: 50 }}
          />
        ) : matkul.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="search-outline" size={50} color="#CCC" />
            <Text style={styles.emptyText}>
              Data mata kuliah tidak ditemukan.
            </Text>
            <Text style={styles.debugText}>
              Cek tabel 'riwayat_mengajar' di Supabase.
            </Text>
          </View>
        ) : (
          matkul.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.matkulTitle}>{item.nama_matkul}</Text>
                <Text style={styles.matkulSubtitle}>
                  Kelas {item.kelas} • {item.sks} SKS
                </Text>
              </View>

              <TouchableOpacity
                style={styles.btnAction}
                onPress={() =>
                  router.push({
                    pathname: "/laporan_hub",
                    params: {
                      matkulId: item.id,
                      matkul: item.nama_matkul,
                      kelas: item.kelas,
                    },
                  })
                }
              >
                <Text style={styles.btnText}>Buka Laporan</Text>
                <Ionicons name="arrow-forward" size={16} color="#FFF" />
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
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  periodText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00468C",
    marginLeft: 8,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardContent: { marginBottom: 15 },
  matkulTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  matkulSubtitle: { fontSize: 13, color: "#888", marginTop: 4 },
  btnAction: {
    backgroundColor: "#00468C",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
  },
  btnText: { color: "#FFF", fontWeight: "bold", marginRight: 8 },
  emptyBox: { alignItems: "center", marginTop: 80 },
  emptyText: { color: "#AAA", marginTop: 10, fontSize: 14 },
  debugText: { color: "#EEE", fontSize: 10, marginTop: 5 },
});

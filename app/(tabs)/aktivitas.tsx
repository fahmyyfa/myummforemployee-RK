import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
import { supabase } from "../../lib/supabase";

export default function AktivitasScreen() {
  const [activeTab, setActiveTab] = useState("Aktivitas");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]); // Inisialisasi array kosong
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user.id;

      console.log("--- DEBUG START ---");
      console.log("Tab Aktif:", activeTab);
      console.log("UID dari Sesi App:", userId);

      if (!userId) {
        console.log("Error: User tidak login / sesi hilang");
        setLoading(false);
        return;
      }

      // Gunakan switch case agar lebih aman dari typo
      let result: any;

      switch (activeTab) {
        case "Aktivitas":
          console.log("Menjalankan query ke tabel: aktivitas_ilmiah");
          result = await supabase
            .from("aktivitas_ilmiah")
            .select("*")
            .eq("user_id", userId)
            .order("tanggal", { ascending: false });
          break;
        case "Kinerja":
          result = await supabase
            .from("kinerja_dosen")
            .select("*")
            .eq("user_id", userId);
          break;
        case "Riwayat":
          result = await supabase
            .from("riwayat_aktivitas")
            .select("*")
            .eq("user_id", userId);
          break;
      }

      if (result?.error) {
        console.error("Supabase Error Detail:", result.error);
      } else {
        console.log("Data Berhasil Ditarik (Jumlah):", result?.data?.length);
        setData(result?.data || []);
      }
    } catch (err) {
      console.error("Critical Catch Error:", err);
    } finally {
      setLoading(false);
      console.log("--- DEBUG END ---");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aktivitas</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* SEGMENTED CONTROL */}
      <View style={styles.tabWrapper}>
        <View style={styles.tabBackground}>
          {["Aktivitas", "Kinerja", "Riwayat"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tabItem, activeTab === tab && styles.tabActive]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#00468C"
            style={{ marginTop: 50 }}
          />
        ) : (
          <>
            {activeTab === "Aktivitas" && <RenderAktivitas items={data} />}
            {activeTab === "Kinerja" && <RenderKinerja items={data} />}
            {activeTab === "Riwayat" && <RenderRiwayat items={data} />}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// --- SUB-COMPONENTS (Safe with default [] and ?.) ---

const RenderAktivitas = ({ items = [] }: any) => (
  <View>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionSub}>Daftar Kegiatan</Text>
      <Text style={styles.sectionTitle}>
        Aktivitas Ilmiah{"\n"}Dosen Terbaru
      </Text>
    </View>
    {items?.length > 0 ? (
      items.map((it: any, i: number) => (
        <View key={i} style={styles.menuCard}>
          <View style={[styles.iconBox, { backgroundColor: "#E3F2FD" }]}>
            <Ionicons
              name={
                it.kategori === "Publikasi" ? "book-outline" : "mic-outline"
              }
              size={22}
              color="#00468C"
            />
          </View>
          <View style={styles.menuInfo}>
            <Text style={styles.menuTitle}>{it.judul}</Text>
            <Text style={styles.menuSub}>
              {it.kategori} • {it.keterangan}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#EEE" />
        </View>
      ))
    ) : (
      <Text style={styles.emptyText}>Belum ada data aktivitas.</Text>
    )}
  </View>
);

const RenderKinerja = ({ items = [] }: any) => (
  <View>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionSub}>Statistik Dosen</Text>
      <Text style={styles.sectionTitle}>Capaian Skor{"\n"}Kinerja Anda</Text>
    </View>
    {items?.length > 0 ? (
      items.map((it: any, i: number) => (
        <View key={i} style={styles.menuCard}>
          <View style={[styles.iconBox, { backgroundColor: "#E3F2FD" }]}>
            <Ionicons
              name={
                it.kategori === "Pendidikan"
                  ? "school-outline"
                  : "flask-outline"
              }
              size={22}
              color="#00468C"
            />
          </View>
          <View style={styles.menuInfo}>
            <Text style={styles.menuTitle}>{it.kategori}</Text>
            <Text style={styles.menuSub}>Target Skor: {it.target}</Text>
          </View>
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreText}>{it.skor}</Text>
          </View>
        </View>
      ))
    ) : (
      <Text style={styles.emptyText}>Data kinerja belum tersedia.</Text>
    )}
  </View>
);

const RenderRiwayat = ({ items = [] }: any) => (
  <View>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionSub}>Log Aktivitas</Text>
      <Text style={styles.sectionTitle}>Riwayat Kegiatan{"\n"}Terakhir</Text>
    </View>
    {items?.length > 0 ? (
      items.map((it: any, i: number) => (
        <View key={i} style={styles.menuCard}>
          <View style={[styles.iconBox, { backgroundColor: "#F5F7FA" }]}>
            <Ionicons name="time-outline" size={22} color="#8E8E93" />
          </View>
          <View style={styles.menuInfo}>
            <Text style={styles.menuTitle}>{it.nama_kegiatan}</Text>
            <Text style={styles.menuSub}>{it.tanggal}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  it.status === "Selesai" ? "#E8F5E9" : "#FFF3E0",
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: it.status === "Selesai" ? "#2E7D32" : "#E65100" },
              ]}
            >
              {it.status}
            </Text>
          </View>
        </View>
      ))
    ) : (
      <Text style={styles.emptyText}>Belum ada riwayat kegiatan.</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  tabWrapper: { paddingHorizontal: 20, marginVertical: 10 },
  tabBackground: {
    flexDirection: "row",
    backgroundColor: "#F0F2F5",
    padding: 4,
    borderRadius: 16,
  },
  tabItem: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: "#FFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabText: { fontSize: 13, fontWeight: "600", color: "#8E8E93" },
  tabTextActive: { color: "#00468C" },
  content: { padding: 20 },
  sectionHeader: { marginBottom: 25 },
  sectionSub: { fontSize: 11, color: "#AAA", fontWeight: "bold" },
  sectionTitle: { fontSize: 24, fontWeight: "bold", color: "#333" },
  menuCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F8F8F8",
  },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  menuInfo: { flex: 1, marginLeft: 15 },
  menuTitle: { fontSize: 15, fontWeight: "bold" },
  menuSub: { fontSize: 11, color: "#AAA" },
  scoreBadge: {
    backgroundColor: "#00468C",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  scoreText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: "bold", textTransform: "uppercase" },
  emptyText: {
    textAlign: "center",
    color: "#AAA",
    marginTop: 50,
    fontSize: 14,
  },
});

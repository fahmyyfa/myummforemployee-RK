import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Wajib diimport
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AkademikScreen() {
  const [activeTab, setActiveTab] = useState("OBE");
  const router = useRouter(); // Inisialisasi router

  // --- SUB COMPONENTS (Ditaruh di dalam agar akses router mudah) ---
  const RenderOBE = () => (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Ionicons name="calendar" size={24} color="#00468C" />
      </View>
      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text style={styles.cardTitle}>Jadwal Kuliah</Text>
        <Text style={styles.cardDesc}>
          Kelola dan pantau jadwal mengajar harian Anda secara real-time.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.btnSmall}
        onPress={() => router.push("/akademik_jadwal")} // Arahkan ke file akademik_jadwal.tsx
      >
        <Text style={styles.btnText}>Lihat Semua</Text>
      </TouchableOpacity>
    </View>
  );

  const RenderLaporan = () => (
    <View style={styles.card}>
      <View style={[styles.iconCircle, { backgroundColor: "#E8F5E9" }]}>
        <Ionicons name="analytics" size={24} color="#2E7D32" />
      </View>
      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text style={styles.cardTitle}>Riwayat Laporan</Text>
        <Text style={styles.cardDesc}>
          Pantau pencapaian akademik mahasiswa dan kinerja dosen.
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.btnSmall, { backgroundColor: "#2E7D32" }]}
        onPress={() => router.push("/laporan_semester")} // Arahkan ke file laporan_semester.tsx
      >
        <Text style={styles.btnText}>Buka</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Akademik</Text>

      {/* TAB MODERN (SEGMENTED CONTROL) */}
      <View style={styles.tabWrapper}>
        <View style={styles.tabBackground}>
          <TouchableOpacity
            onPress={() => setActiveTab("OBE")}
            style={[styles.tabItem, activeTab === "OBE" && styles.tabActive]}
          >
            <Ionicons
              name="layers-outline"
              size={18}
              color={activeTab === "OBE" ? "#00468C" : "#8E8E93"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "OBE" && styles.tabTextActive,
              ]}
            >
              Pelaksanaan (OBE)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("Laporan")}
            style={[
              styles.tabItem,
              activeTab === "Laporan" && styles.tabActive,
            ]}
          >
            <Ionicons
              name="document-text-outline"
              size={18}
              color={activeTab === "Laporan" ? "#00468C" : "#8E8E93"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "Laporan" && styles.tabTextActive,
              ]}
            >
              Laporan
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* KONTEN */}
      <View style={styles.content}>
        {activeTab === "OBE" ? <RenderOBE /> : <RenderLaporan />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", paddingTop: 60 },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  tabWrapper: { paddingHorizontal: 20, marginBottom: 20 },
  tabBackground: {
    flexDirection: "row",
    backgroundColor: "#EEEFf2",
    padding: 4,
    borderRadius: 16,
    height: 52,
  },
  tabItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: "#FFF",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabText: { fontSize: 13, fontWeight: "600", color: "#8E8E93", marginLeft: 8 },
  tabTextActive: { color: "#00468C" },
  content: { padding: 20 },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  cardDesc: {
    fontSize: 11,
    color: "#888",
    marginTop: 4,
    lineHeight: 16,
    paddingRight: 10,
  },
  btnSmall: {
    backgroundColor: "#00468C",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
  },
  btnText: { color: "#FFF", fontWeight: "bold", fontSize: 11 },
});

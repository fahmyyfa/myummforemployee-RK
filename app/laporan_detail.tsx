import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LaporanDetail() {
  const router = useRouter();
  const { matkulId } = useLocalSearchParams();
  const [category, setCategory] = useState("Persebaran"); // Default kategori

  const categories = [
    { id: "Persebaran", label: "Persebaran Nilai" },
    { id: "CPMK", label: "Penilaian Sub CPMK" },
    { id: "Materi", label: "Evaluasi Materi" },
    { id: "CPL", label: "Ketercapaian CPL" },
    { id: "Jurnal", label: "Jurnal Mengajar" },
    { id: "Kinerja", label: "Kinerja Dosen" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Laporan</Text>
        <TouchableOpacity>
          <Ionicons name="download-outline" size={22} color="#00468C" />
        </TouchableOpacity>
      </View>

      {/* METADATA RINGKAS */}
      <View style={styles.metaCard}>
        <Text style={styles.matkulName}>Pemrograman Mobile (3 SKS)</Text>
        <Text style={styles.metaSub}>
          Dr. Ahmad Wijaya • Kelas A • Ganjil 2024/2025
        </Text>
      </View>

      {/* HORIZONTAL CATEGORY SELECTOR */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.pillScroll}
        >
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.pill, category === item.id && styles.pillActive]}
              onPress={() => setCategory(item.id)}
            >
              <Text
                style={[
                  styles.pillText,
                  category === item.id && styles.pillTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        {/* LOGIKA TAMPILAN BERDASARKAN KATEGORI */}
        {category === "Persebaran" && <ReportPersebaran />}
        {category === "CPMK" && <ReportCPMK />}
        {category === "Materi" && <ReportMateri />}
        {/* Tambahkan kategori lainnya sesuai pola ini */}
      </ScrollView>
    </SafeAreaView>
  );
}

// SUB-KOMPONEN UNTUK MENYEDERHANAKAN ISI
const ReportPersebaran = () => (
  <View style={styles.reportBox}>
    <Text style={styles.reportTitle}>Tabel Persebaran Nilai</Text>
    <View style={styles.tableRow}>
      <Text>Nilai A</Text>
      <Text>12 Mhs (30%)</Text>
    </View>
    <View style={styles.tableRow}>
      <Text>Nilai B+</Text>
      <Text>8 Mhs (20%)</Text>
    </View>
    <View style={styles.tableRow}>
      <Text>Nilai E/X</Text>
      <Text>2 Mhs (5%)</Text>
    </View>
  </View>
);

const ReportCPMK = () => (
  <View style={styles.reportBox}>
    <Text style={styles.reportTitle}>Hasil Capaian Sub CPMK</Text>
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Tuntas</Text>
        <Text style={styles.statVal}>28</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Avg IP</Text>
        <Text style={styles.statVal}>3.41</Text>
      </View>
    </View>
    {/* Tabel NIM, Nama, dll bisa diletakkan di sini */}
  </View>
);

const ReportMateri = () => (
  <View style={styles.reportBox}>
    <Text style={styles.reportTitle}>Kesesuaian Materi (Pertemuan 1-15)</Text>
    <Text style={styles.infoText}>Jumlah Sesuai: 14 | Tidak Sesuai: 1</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#FFF",
  },
  headerTitle: { fontSize: 16, fontWeight: "bold" },
  metaCard: {
    backgroundColor: "#00468C",
    padding: 20,
    margin: 20,
    borderRadius: 15,
  },
  matkulName: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  metaSub: { color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 5 },
  pillScroll: { paddingLeft: 20, marginBottom: 10 },
  pill: {
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  pillActive: { backgroundColor: "#00468C", borderColor: "#00468C" },
  pillText: { fontSize: 12, color: "#666" },
  pillTextActive: { color: "#FFF", fontWeight: "bold" },
  content: { flex: 1, padding: 20 },
  reportBox: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    elevation: 1,
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  statItem: { alignItems: "center" },
  statLabel: { fontSize: 10, color: "#888" },
  statVal: { fontSize: 18, fontWeight: "bold", color: "#00468C" },
  infoText: { fontSize: 12, color: "#666", lineHeight: 20 },
});

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AkademikMain() {
  const router = useRouter();

  // 1. TARUH DATA DI SINI (Sebelum return)
  const perwalianMenu = [
    { label: "Mahasiswa Aktif", icon: "people", color: "#D32F2F" },
    { label: "Tugas Akhir", icon: "school", color: "#1976D2" },
    { label: "Konsultasi", icon: "chatbubbles", color: "#388E3C" },
    { label: "Alumni", icon: "medal", color: "#F57C00" },
    { label: "Laporan", icon: "stats-chart", color: "#7B1FA2" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Akademik</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Tab Menu */}
        <View style={styles.tabRow}>
          <Text style={styles.tabActive}>Perkuliahan</Text>
          <Text style={styles.tabInactive}>OBE</Text>
        </View>

        {/* Card Jadwal Kuliah */}
        <View style={styles.cardWhite}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <Ionicons name="calendar" size={24} color="#00468C" />
            </View>
            <Text style={styles.cardTitle}>Jadwal Kuliah</Text>
          </View>
          <Text style={styles.cardDesc}>
            Kelola dan pantau jadwal mengajar harian Anda secara real-time.
          </Text>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => router.push("/akademik_jadwal")}
          >
            <Text style={styles.btnText}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        {/* 2. AREA PERWALIAN (REVISI) */}
        <View style={styles.cardBlue}>
          <Text style={styles.cardTitleWhite}>Perwalian</Text>
          <Text style={styles.cardYearWhite}>Tahun Akademik 2025/2026</Text>
          <View style={styles.iconGrid}>
            {perwalianMenu.map((item, idx) => (
              <TouchableOpacity key={idx} style={styles.iconItem}>
                <View style={styles.iconWhiteGlow}>
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={item.color}
                  />
                </View>
                <Text style={styles.iconLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#FFF",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  tabRow: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  tabActive: {
    color: "#00468C",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#00468C",
    paddingBottom: 10,
    marginRight: 20,
  },
  tabInactive: { color: "#AAA", paddingBottom: 10 },
  cardWhite: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    marginBottom: 20,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  iconBox: {
    backgroundColor: "#E8F0F8",
    padding: 10,
    borderRadius: 12,
    marginRight: 15,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardDesc: { color: "#777", fontSize: 12, marginBottom: 15 },
  btnPrimary: {
    backgroundColor: "#00468C",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  btnText: { color: "#FFF", fontWeight: "bold", fontSize: 12 },
  cardBlue: {
    backgroundColor: "#00468C",
    padding: 22,
    borderRadius: 25,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardTitleWhite: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardYearWhite: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginBottom: 25,
  },
  iconGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  iconItem: { alignItems: "center", width: "19%" },
  iconWhiteGlow: {
    backgroundColor: "#FFF",
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 4,
    shadowColor: "#FFF",
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  iconLabel: {
    color: "#FFF",
    fontSize: 9,
    textAlign: "center",
    fontWeight: "600",
    lineHeight: 12,
  },
});

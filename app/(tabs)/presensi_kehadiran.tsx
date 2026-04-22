import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function PresensiKehadiran() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showMonth, setShowMonth] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("April");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    // 1. Ambil Profil Lengkap
    const { data: profile } = await supabase
      .from("profil")
      .select("*")
      .eq("id", session.user.id)
      .single();
    setUserData(profile);

    // 2. Ambil Data Presensi (Asumsi bulan April 2026)
    const { data: presensi } = await supabase
      .from("presensi_harian")
      .select("*")
      .eq("user_id", session.user.id)
      .gte("tanggal", "2026-04-01")
      .lte("tanggal", "2026-04-30");

    setAttendance(presensi || []);
    setLoading(false);
  };

  // Helper untuk cek apakah tanggal tertentu ada di data presensi
  const getAttendanceForDate = (day: number) => {
    const dateStr = `2026-04-${day < 10 ? "0" + day : day}`;
    return attendance.find((item) => item.tanggal === dateStr);
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Presensi Kegiatan</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <Image
            source={require("../../assets/images/react-logo.png")}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userData?.nama_lengkap}</Text>
            <View style={styles.nipContainer}>
              <Ionicons name="id-card-outline" size={12} color="#666" />
              <Text style={styles.nipText}> NIP: {userData?.nip}</Text>
            </View>
            <Text style={styles.profileSub}>
              {userData?.status_kepegawaian} • {userData?.unit_kerja}
            </Text>
          </View>
        </View>

        {/* RINGKASAN BIODATA (Data dari DB) */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>RINGKASAN BIODATA</Text>
          <View style={styles.sectionLine} />
        </View>
        <View style={styles.bioGrid}>
          <BioItem label="Nama Lengkap" value={userData?.nama_lengkap} />
          <BioItem label="NIP" value={userData?.nip} />
          <BioItem label="KTP" value={userData?.ktp || "-"} />
          <BioItem
            label="Status Kepegawaian"
            value={userData?.status_kepegawaian || "-"}
          />
          <BioItem label="Status Kerja" value={userData?.status_kerja || "-"} />
          <BioItem label="Unit Kerja" value={userData?.unit_kerja || "-"} />
          <BioItem
            label="Masa Kerja"
            value={userData?.masa_kerja || "-"}
            isFullWidth
          />
        </View>

        {/* CALENDAR */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>PRESENSI HARIAN</Text>
          <View style={styles.sectionLine} />
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.daysHeader}>
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <Text key={i} style={styles.dayText}>
                {d}
              </Text>
            ))}
          </View>

          <View style={styles.grid}>
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              const dataPresensi = getAttendanceForDate(day);
              const isHadir = !!dataPresensi;

              return (
                <View
                  key={i}
                  style={[
                    styles.dateBox,
                    isHadir ? styles.bgHadir : styles.bgEmpty,
                  ]}
                >
                  <Text style={[styles.dtNum, isHadir && { color: "#FFF" }]}>
                    {day}
                  </Text>
                  {isHadir && (
                    <View style={styles.hadirContent}>
                      <Text style={styles.hLabel}>HADIR</Text>
                      {/* Jam ditarik dari kolom jam_masuk database */}
                      <Text style={styles.hTime}>
                        {dataPresensi.jam_masuk?.substring(0, 5)} WIB
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const BioItem = ({ label, value, isFullWidth }: any) => (
  <View style={[styles.bioItem, isFullWidth && { width: "100%" }]}>
    <Text style={styles.bioLabel}>{label.toUpperCase()}</Text>
    <Text style={styles.bioValue}>{value || "-"}</Text>
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
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  profileCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },
  avatar: { width: 80, height: 100, borderRadius: 20 },
  profileInfo: { marginLeft: 15, flex: 1 },
  profileName: { fontSize: 18, fontWeight: "bold" },
  nipContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    padding: 5,
    borderRadius: 8,
    marginVertical: 5,
    alignSelf: "flex-start",
  },
  nipText: { fontSize: 10, fontWeight: "bold" },
  profileSub: { fontSize: 11, color: "#888" },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#AAA",
    marginRight: 10,
  },
  sectionLine: { flex: 1, height: 1, backgroundColor: "#EEE" },
  bioGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  bioItem: {
    width: "48%",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 1,
  },
  bioLabel: { fontSize: 8, color: "#AAA", fontWeight: "bold", marginBottom: 2 },
  bioValue: { fontSize: 12, fontWeight: "bold", color: "#333" },
  calendarCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 25,
    elevation: 3,
  },
  daysHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  dayText: { fontSize: 14, fontWeight: "bold", color: "#AAA" },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  dateBox: {
    width: "13.2%",
    height: 75,
    margin: "0.5%",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  bgHadir: { backgroundColor: "#00468C" },
  bgEmpty: { backgroundColor: "#F8F9FA" },
  dtNum: { fontSize: 16, fontWeight: "bold", color: "#AAA" }, // Diperbesar
  hadirContent: { alignItems: "center", marginTop: 5 },
  hLabel: { fontSize: 8, color: "#FFF", fontWeight: "bold" }, // Diperbesar
  hTime: { fontSize: 7, color: "#FFF", opacity: 0.9 }, // Diperbesar
});

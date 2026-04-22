import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function BerandaScreen() {
  const router = useRouter(); // Tambahkan baris ini
  const [userData, setUserData] = useState<any>(null);
  const [notifList, setNotifList] = useState<any[]>([]);

  const handleServicePress = (label: string) => {
    if (label === "Jadwal Kuliah") {
      router.push("/akademik_jadwal");
    }
    if (label === "Aktivitas") {
      router.push("/aktivitas");
    }
    if (label === "Kinerja") {
      router.push("/aktivitas");
    }
    if (label === "Presensi") {
      router.push("/presensi_kehadiran");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const userId = session?.user.id;

    if (!userId) return;

    // 1. Ambil Profil
    const { data: profile } = await supabase
      .from("profil")
      .select("*")
      .eq("id", userId)
      .single();
    if (profile) setUserData(profile);

    // 2. Ambil Notifikasi (Debug Version)
    const { data: dbNotif, error } = await supabase
      .from("notifikasi")
      .select("*")
      .eq("user_id", userId) // Pastikan ini cocok dengan user yang login
      .order("created_at", { ascending: false })
      .limit(2);

    if (error) {
      console.error("Gagal tarik notif:", error.message);
    } else {
      console.log("Notif ditemukan:", dbNotif?.length);
      setNotifList(dbNotif || []); // Update state di sini
    }
  }

  const quickServices = [
    {
      label: "Jadwal Kuliah",
      icon: "calendar-outline",
      bg: "#FFF0F0",
      color: "#FF4444",
    },
    {
      label: "Presensi",
      icon: "person-add-outline",
      bg: "#FFF5E6",
      color: "#FF9500",
    },
    {
      label: "Aktivitas",
      icon: "flash-outline",
      bg: "#FFFFE6",
      color: "#FFCC00",
    },
    {
      label: "Kinerja",
      icon: "bar-chart-outline",
      bg: "#FFF0F5",
      color: "#D43F8D",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F7FA" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER & USER INFO */}
        <View style={styles.blueHeader}>
          <View style={styles.searchRow}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color="#888" />
              <TextInput
                placeholder="Cari layanan atau fitur tertentu"
                style={styles.searchInput}
              />
            </View>
            <TouchableOpacity
              style={styles.notificationBtn}
              onPress={() => router.push("/notifikasi")} // Tambahkan baris ini
            >
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#00468C"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.userCardBeranda}>
            <Ionicons name="person-circle" size={50} color="#333" />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.userName}>
                {userData?.nama_lengkap || "Karyawan UMM"}
              </Text>
              <Text style={styles.userNip}>NIP: {userData?.nip || "-"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentPadding}>
          {/* LAYANAN CEPAT */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Layanan Cepat</Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuGrid}>
              {quickServices.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => handleServicePress(item.label)} // Tambahkan ini
                >
                  <View
                    style={[styles.menuIconBox, { backgroundColor: item.bg }]}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={22}
                      color={item.color}
                    />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* INFORMASI KEGIATAN (KEMBALI DITAMBAHKAN) */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Informasi Kegiatan</Text>

            {notifList.length > 0 ? (
              notifList.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.notifCard}
                  onPress={() => router.push("/notifikasi")}
                >
                  <View style={styles.iconCircle}>
                    <Ionicons
                      name="megaphone-outline"
                      size={20}
                      color="#00468C"
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text style={styles.notifTitle}>{item.judul}</Text>
                    <Text style={styles.notifSub}>
                      {item.tanggal} • {item.lokasi}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#CCC" />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyNotifBox}>
                <Text style={styles.emptyNotifText}>
                  Tidak ada kegiatan terbaru
                </Text>
              </View>
            )}
          </View>

          {/* AGENDA MENGAJAR TERDEKAT (KEMBALI DITAMBAHKAN) */}
          {userData?.peran === "dosen" && (
            <View style={styles.agendaContainer}>
              <Text style={styles.agendaTitleHeader}>
                Agenda Mengajar Terdekat
              </Text>
              <Text style={styles.agendaYear}>Tahun Akademik 2025/2026</Text>

              {[1, 2].map((item) => (
                <View key={item} style={styles.agendaCard}>
                  {/* KEMBALIKAN BAGIAN INI */}
                  <Ionicons name="calendar" size={24} color="#00468C" />
                  <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text style={styles.matkulText}>
                      Pemrograman Berorientasi Objek
                    </Text>
                    <Text style={styles.matkulDesc}>
                      08:00 - 10:00 • Lab. Multimedia
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.btnDetail}
                    onPress={() =>
                      router.push({
                        pathname: "/akademik_detail",
                        params: { id: item },
                      })
                    }
                  >
                    <Text style={styles.btnText}>Detail</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Memungkinkan item turun ke baris baru
    justifyContent: "flex-start", // Item baris kedua mulai dari kiri
    paddingHorizontal: 10,
    marginTop: 15,
  },
  btnDetail: {
    backgroundColor: "#F0F0F0", // Warna background tombol
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#00468C", // Warna teks detail
    fontSize: 12,
    fontWeight: "bold",
  },
  menuItem: {
    width: "25%", // 4 kolom per baris
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 5,
  },
  menuIconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    // Soft Shadow agar terlihat natural
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  blueHeader: {
    backgroundColor: "#00468C",
    padding: 25,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  searchRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  searchBar: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 45,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 13 },
  notificationBtn: {
    backgroundColor: "#FFF",
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  userCardBeranda: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  userName: { fontWeight: "bold", fontSize: 16, color: "#00468C" },
  userNip: { fontSize: 12, color: "#666" },
  contentPadding: { padding: 20 },
  sectionCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 25,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  subHeading: { fontSize: 18, fontWeight: "bold", marginVertical: 15 },
  activityItem: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 1,
  },
  iconCircleActivity: {
    backgroundColor: "#F0F4F8",
    padding: 10,
    borderRadius: 50,
  },
  activityTitle: { fontWeight: "bold", color: "#00468C" },
  activityDesc: { fontSize: 11, color: "#888" },
  agendaBox: {
    backgroundColor: "#00468C",
    padding: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  agendaContainer: {
    backgroundColor: "#00468C", // Warna Biru Gelap sesuai Gambar 3
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  agendaTitleHeader: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  agendaYear: { color: "#FFF", fontSize: 11, opacity: 0.7, marginBottom: 15 },
  agendaCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  matkulText: { fontWeight: "bold", fontSize: 13, color: "#00468C" },
  matkulDesc: { fontSize: 11, color: "#666" },
  detailBtn: {
    backgroundColor: "#F0F4F8",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  notifCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#F0F5FA",
    justifyContent: "center",
    alignItems: "center",
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#00468C",
  },
  notifSub: {
    fontSize: 11,
    color: "#888",
    marginTop: 2,
  },
  linkText: {
    fontSize: 12,
    color: "#00468C", // Warna biru agar terlihat seperti link
    fontWeight: "600",
  },
  emptyNotifBox: {
    backgroundColor: "#F8F9FA",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  emptyNotifText: {
    color: "#AAA",
    fontSize: 12,
  },
  detailText: { fontSize: 10, fontWeight: "bold", color: "#00468C" },
});

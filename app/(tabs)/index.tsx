import { Ionicons } from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 1. DATA MENU (Didefinisikan di sini, di luar return)
  const quickServices = [
    {
      label: "Jadwal Kuliah",
      icon: "calendar",
      color: "#D32F2F",
      bg: "#FFEBEE",
    },
    {
      label: "Laporan OBE",
      icon: "document-text",
      color: "#1976D2",
      bg: "#E3F2FD",
    },
    { label: "Perwalian", icon: "people", color: "#388E3C", bg: "#E8F5E9" },
    {
      label: "Tugas Akhir",
      icon: "shield-checkmark",
      color: "#7B1FA2",
      bg: "#F3E5F5",
    },
    { label: "Presensi", icon: "person-add", color: "#F57C00", bg: "#FFF3E0" },
    { label: "Aktivitas", icon: "flash", color: "#FBC02D", bg: "#FFFDE7" },
    { label: "Kinerja", icon: "bar-chart", color: "#C2185B", bg: "#FCE4EC" },
    { label: "Lainnya", icon: "grid", color: "#455A64", bg: "#ECEFF1" },
  ];

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session),
    );
    return () => authListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) fetchUserData();
  }, [session]);

  async function fetchUserData() {
    if (!session?.user) return;
    const { data } = await supabase
      .from("profil")
      .select("*")
      .eq("id", session.user.id)
      .single();
    if (data) setUserData(data);
  }

  async function signInWithEmail() {
    if (!email || !password) return alert("Isi email dan password!");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert("Login Gagal: " + error.message);
    setLoading(false);
  }

  // --- TAMPILAN BERANDA (JIKA SUDAH LOGIN) ---
  if (session) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F7FA" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header Biru & Search */}
          <View style={styles.blueHeader}>
            <View style={styles.searchRow}>
              <View style={styles.searchBar}>
                <Ionicons name="search" size={18} color="#888" />
                <TextInput
                  placeholder="Cari layanan atau fitur tertentu"
                  style={styles.searchInput}
                />
              </View>
              <TouchableOpacity style={styles.notificationBtn}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color="#00468C"
                />
              </TouchableOpacity>
            </View>

            {/* User Info Card */}
            <View style={styles.userCardBeranda}>
              <Ionicons name="person-circle" size={50} color="#333" />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.userName}>
                  {userData?.nama_lengkap || "Karyawan UMM"}
                </Text>
                <Text style={styles.userNip}>
                  NIP: {userData?.nip || "000000000000"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.contentPadding}>
            {/* 2. AREA LAYANAN CEPAT (REVISI DESAIN) */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Layanan Cepat</Text>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Lihat Semua</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.menuGrid}>
                {quickServices.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.menuItem}>
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

            {/* Informasi Kegiatan */}
            <Text style={styles.subHeading}>Informasi Kegiatan</Text>
            {[1, 2].map((i) => (
              <View key={i} style={styles.activityItem}>
                <View style={styles.iconCircleActivity}>
                  <Ionicons
                    name="megaphone-outline"
                    size={20}
                    color="#00468C"
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 15 }}>
                  <Text style={styles.activityTitle}>Rapat Karyawan</Text>
                  <Text style={styles.activityDesc}>
                    10 April, 09:00 WIB • ICT Center UMM
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </View>
            ))}

            {/* Agenda Mengajar (Hanya Dosen) */}
            {userData?.peran === "dosen" && (
              <View style={styles.agendaBox}>
                <Text style={styles.agendaTitleHeader}>
                  Agenda Mengajar Terdekat
                </Text>
                <Text style={styles.agendaYear}>Tahun Akademik 2025/2026</Text>
                {[1, 2].map((i) => (
                  <View key={i} style={styles.agendaCard}>
                    <Ionicons name="calendar" size={24} color="#00468C" />
                    <View style={{ flex: 1, marginLeft: 15 }}>
                      <Text style={styles.matkulText}>
                        Pemrograman Berorientasi Objek
                      </Text>
                      <Text style={styles.matkulDesc}>
                        08:00 - 10:00 • Lab. Multimedia
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.detailBtn}>
                      <Text style={styles.detailText}>Detail</Text>
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

  // --- TAMPILAN LOGIN ---
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <View style={styles.headerBlue}>
          <Text style={styles.headerTitle}>Sistem{"\n"}Kepegawaian</Text>
          <Text style={styles.headerSubtitle}>
            Universitas Muhammadiyah Malang
          </Text>
        </View>
        <View style={styles.loginCard}>
          <Text style={styles.welcomeTitle}>Selamat Datang</Text>
          <Text style={styles.welcomeDesc}>
            Masukkan username dan password Anda untuk mengakses portal akademik.
          </Text>
          <Text style={styles.label}>USERNAME</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#888"
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Masukkan email"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.labelRow}>
            <Text style={styles.label}>PASSWORD</Text>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Lupa Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#888"
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Masukkan password"
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={signInWithEmail}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Masuk ke Portal</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "rgba(255,255,255,0.9)",
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
  sectionTitle: { fontSize: 18, fontWeight: "bold" },
  linkText: {
    color: "#00468C",
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: "#D6E4F0",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuItem: { width: "25%", alignItems: "center", marginBottom: 20 },
  menuIconBox: {
    width: 55,
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  menuLabel: {
    fontSize: 11,
    textAlign: "center",
    color: "#333",
    fontWeight: "500",
  },
  subHeading: { fontSize: 18, fontWeight: "bold", marginVertical: 15 },
  activityItem: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
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
  detailText: { fontSize: 10, fontWeight: "bold", color: "#00468C" },
  safeArea: { flex: 1, backgroundColor: "#00468C" },
  headerBlue: {
    padding: 40,
    backgroundColor: "#00468C",
    height: 250,
    justifyContent: "center",
  },
  headerTitle: { fontSize: 32, fontWeight: "900", color: "#fff" },
  headerSubtitle: { fontSize: 14, color: "#fff", opacity: 0.8 },
  loginCard: {
    backgroundColor: "#fff",
    marginTop: -50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    flex: 1,
  },
  welcomeTitle: { fontSize: 24, fontWeight: "bold", color: "#222" },
  welcomeDesc: {
    fontSize: 13,
    color: "#777",
    marginVertical: 10,
    marginBottom: 20,
  },
  label: { fontSize: 11, fontWeight: "bold", color: "#aaa", marginBottom: 5 },
  labelRow: { flexDirection: "row", justifyContent: "space-between" },
  forgotText: { fontSize: 11, color: "#00468C", fontWeight: "bold" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4F7",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },
  input: { flex: 1, fontSize: 14, color: "#222" },
  loginButton: {
    backgroundColor: "#00468C",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

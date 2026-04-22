import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function ProfileMain() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      const { data } = await supabase
        .from("profil")
        .select("*")
        .eq("id", session.user.id)
        .single();
      setUserData(data);
    }
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Gagal Keluar: " + error.message);
    } else {
      // Sesi akan dihapus, dan listener di _layout.tsx akan
      // otomatis membawa user kembali ke /login
      console.log("Logout berhasil");
    }
  }

  // Gunakan fungsi ini pada tombol Keluar Anda:
  <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
    <Ionicons name="log-out-outline" size={20} color="#c0392b" />
    <Text style={styles.logoutText}>KELUAR</Text>
  </TouchableOpacity>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBlue}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil Pengguna</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.profileCard}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{userData?.nama_lengkap}</Text>
          <View style={styles.nipBadge}>
            <Text style={styles.nipText}>NIP: {userData?.nip}</Text>
          </View>
          <Text style={styles.roleText}>
            {userData?.peran} Tetap • {userData?.unit_kerja}
          </Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionLabel}>DATA PENGGUNA</Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/profil_biodata")}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="person-outline" size={20} color="#00468C" />
          </View>
          <Text style={styles.menuText}>Biodata Diri</Text>
          <Ionicons name="chevron-forward" size={18} color="#CCC" />
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>LAYANAN & INFORMASI</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Bantuan</Text>
          <Ionicons name="chevron-forward" size={18} color="#CCC" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Tentang Aplikasi</Text>
          <Ionicons name="chevron-forward" size={18} color="#CCC" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => supabase.auth.signOut()}
      >
        <Ionicons name="log-out-outline" size={20} color="#c0392b" />
        <Text style={styles.logoutText}>KELUAR</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  headerBlue: {
    backgroundColor: "#00468C",
    height: 180,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 50,
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  profileCard: {
    backgroundColor: "white",
    margin: 20,
    marginTop: -60,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    elevation: 5,
  },
  avatar: { width: 80, height: 80, borderRadius: 15 },
  profileInfo: { marginLeft: 15, justifyContent: "center" },
  name: { fontSize: 18, fontWeight: "bold" },
  nipBadge: {
    backgroundColor: "#EEE",
    padding: 4,
    borderRadius: 5,
    marginVertical: 5,
    alignSelf: "flex-start",
  },
  nipText: { fontSize: 11, color: "#666" },
  roleText: { fontSize: 12, color: "#888" },
  menuSection: { padding: 20 },
  sectionLabel: {
    fontSize: 12,
    color: "#AAA",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  menuItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconCircle: {
    backgroundColor: "#E8F0F8",
    padding: 8,
    borderRadius: 10,
    marginRight: 15,
  },
  menuText: { flex: 1, fontWeight: "500" },
  logoutBtn: {
    margin: 20,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#FFCCCC",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: { color: "#c0392b", fontWeight: "bold", marginLeft: 10 },
});

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function ScanSuccess() {
  const { kegiatan } = useLocalSearchParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      supabase
        .from("profil")
        .select("*")
        .eq("id", session?.user.id)
        .single()
        .then(({ data }) => setUser(data));
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Presensi Kegiatan</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={{ padding: 20 }}>
        <View style={styles.successCard}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={50} color="#00E676" />
          </View>
          <Text style={styles.successTitle}>Presensi Berhasil</Text>
          <Text style={styles.successSubtitle}>• TERVERIFIKASI</Text>
        </View>

        <View style={styles.infoRowFull}>
          <Text style={styles.label}>NAMA KARYAWAN</Text>
          <Text style={styles.value}>{user?.nama_lengkap || "..."}</Text>
        </View>

        <View style={styles.gridRow}>
          <View style={styles.infoBox}>
            <Text style={styles.label}>NIP</Text>
            <Text style={styles.value}>{user?.nip || "..."}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>STATUS KEHADIRAN</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>● Tersimpan</Text>
            </View>
          </View>
        </View>

        <View style={styles.gridRow}>
          <View style={styles.infoBox}>
            <Text style={styles.label}>WAKTU SCAN</Text>
            <Text style={styles.value}>
              <Ionicons name="time-outline" /> 08:00 WIB
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>KEGIATAN</Text>
            <Text style={styles.value}>
              <Ionicons name="people-outline" /> {kegiatan}
            </Text>
          </View>
        </View>
      </View>
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
  successCard: {
    backgroundColor: "#00E676",
    borderRadius: 25,
    padding: 40,
    alignItems: "center",
    marginBottom: 20,
  },
  checkCircle: {
    backgroundColor: "#FFF",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  successTitle: { color: "#FFF", fontSize: 22, fontWeight: "bold" },
  successSubtitle: { color: "#FFF", fontSize: 12, opacity: 0.9 },
  infoRowFull: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    width: "48%",
  },
  label: { fontSize: 10, color: "#AAA", fontWeight: "bold", marginBottom: 5 },
  value: { fontSize: 13, fontWeight: "bold", color: "#333" },
  badge: {
    backgroundColor: "#E8F5E9",
    padding: 5,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  badgeText: { color: "#2E7D32", fontSize: 10, fontWeight: "bold" },
});

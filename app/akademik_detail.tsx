import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase"; // Pastikan path benar

export default function AkademikDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [jadwal, setJadwal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      // Simulasi/Query data berdasarkan ID
      const { data, error } = await supabase
        .from("riwayat_mengajar")
        .select("*")
        .eq("id", id) // Jika ID dari params adalah UUID
        .single();

      if (data) setJadwal(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Jadwal Kuliah</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#00468C"
          style={{ marginTop: 50 }}
        />
      ) : (
        <View style={styles.content}>
          <View style={styles.detailCard}>
            <View style={styles.badgeRow}>
              <Text style={styles.idBadge}>01</Text>
              <Text style={styles.sksBadge}>3 SKS</Text>
            </View>

            <Text style={styles.matkulTitle}>
              {jadwal?.nama_matkul || "Pemrograman Berorientasi Objek"}
            </Text>

            <InfoRow
              icon="person-outline"
              label="Dr. Eng. Muhammad Arifin, S.T., M.Sc."
            />
            <InfoRow
              icon="location-outline"
              label="GKB IV - Lab Komputer 302"
            />
            <InfoRow icon="time-outline" label="Senin, 08:00 - 10:30" />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const InfoRow = ({ icon, label }: any) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={18} color="#888" />
    <Text style={styles.infoText}>{label}</Text>
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
  content: { padding: 20 },
  detailCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    elevation: 2,
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  idBadge: {
    backgroundColor: "#E3F2FD",
    color: "#00468C",
    padding: 5,
    borderRadius: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
  sksBadge: {
    backgroundColor: "#E3F2FD",
    color: "#00468C",
    padding: 5,
    borderRadius: 10,
    fontSize: 10,
    fontWeight: "bold",
  },
  matkulTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  infoText: { marginLeft: 10, color: "#666", fontSize: 13 },
});

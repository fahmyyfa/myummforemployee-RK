import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function JadwalDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [details, setDetails] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("detail_jadwal")
        .select("*")
        .eq("riwayat_id", id);
      setDetails(data || []);
    };
    fetch();
  }, [id]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Jadwal Kuliah</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {details.map((item, index) => (
          <View key={item.id} style={styles.courseCard}>
            <View style={styles.badgeRow}>
              <View style={styles.courseNum}>
                <Text style={styles.numText}>0{index + 1}</Text>
              </View>
              <View style={styles.sksBadge}>
                <Text style={styles.sksText}>{item.sks} SKS</Text>
              </View>
            </View>
            <Text style={styles.courseName}>{item.nama_matkul}</Text>
            <View style={styles.infoRow}>
              <Ionicons name="person-outline" size={14} color="#888" />
              <Text style={styles.infoText}>{item.dosen_pengampu}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={14} color="#888" />
              <Text style={styles.infoText}>{item.lokasi}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={14} color="#888" />
              <Text style={styles.infoText}>
                {item.hari}, {item.jam_mulai_selesai}
              </Text>
            </View>
          </View>
        ))}
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
  courseCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 2,
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  courseNum: {
    backgroundColor: "#E8F0F8",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  numText: { color: "#00468C", fontWeight: "bold", fontSize: 10 },
  sksBadge: {
    backgroundColor: "#E8F0F8",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  sksText: { color: "#00468C", fontWeight: "bold", fontSize: 10 },
  courseName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  infoText: { fontSize: 12, color: "#666", marginLeft: 10 },
});

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function NotifikasiScreen() {
  const router = useRouter();
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const { data } = await supabase
        .from("notifikasi")
        .select("*")
        .order("created_at", { ascending: false });
      setList(data || []);
    };
    fetchAll();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifikasi</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.label}>TERBARU</Text>
        {list.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.blueDot} />
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.cardTitle}>{item.judul}</Text>
              <Text style={styles.cardDesc}>{item.keterangan}</Text>
              <Text style={styles.cardTime}>
                {item.tanggal} • {item.lokasi}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#BBB",
    letterSpacing: 1,
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F8F8F8",
  },
  blueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00468C",
    marginTop: 6,
  },
  cardTitle: { fontSize: 15, fontWeight: "bold", color: "#333" },
  cardDesc: { fontSize: 13, color: "#666", marginTop: 4 },
  cardTime: { fontSize: 11, color: "#AAA", marginTop: 8 },
});

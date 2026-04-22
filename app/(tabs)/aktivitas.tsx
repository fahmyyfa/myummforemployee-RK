import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

type TabType = "aktivitas" | "kinerja" | "riwayat";

export default function AktivitasPage() {
  const [activeTab, setActiveTab] = useState<TabType>("aktivitas");
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu();
  }, [activeTab]);

  const fetchMenu = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("menu_aktivitas")
      .select("*")
      .eq("kategori", activeTab);

    if (data) setMenuItems(data);
    setLoading(false);
  };

  const getSectionHeader = () => {
    if (activeTab === "aktivitas")
      return { sub: "Daftar Kegiatan", main: "Kelola Kinerja\nAkademik" };
    if (activeTab === "kinerja")
      return { sub: "Manajemen Karir", main: "Kelola Kinerja\nAkademik" };
    return { sub: "Daftar Riwayat", main: "Kelola Kinerja\nAkademik" };
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aktivitas</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Top Navbar Tabs */}
      <View style={styles.tabBar}>
        {(["aktivitas", "kinerja", "riwayat"] as TabType[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabButton,
              activeTab === tab && styles.tabButtonActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subLabel}>{getSectionHeader().sub}</Text>
        <Text style={styles.mainLabel}>{getSectionHeader().main}</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#00468C"
            style={{ marginTop: 50 }}
          />
        ) : (
          menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card}>
              <View
                style={[styles.iconBox, { backgroundColor: item.warna_bg }]}
              >
                <Ionicons
                  name={item.ikon as any}
                  size={24}
                  color={item.warna_ikon}
                />
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.judul}</Text>
                <Text style={styles.cardDesc}>{item.deskripsi}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#CCC" />
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#FFF",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  tabButton: {
    paddingVertical: 12,
    marginRight: 25,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabButtonActive: { borderBottomColor: "#333" },
  tabText: { fontSize: 13, color: "#AAA", fontWeight: "500" },
  tabTextActive: { color: "#333", fontWeight: "bold" },
  scrollContent: { padding: 25 },
  subLabel: { fontSize: 13, color: "#AAA", fontWeight: "600", marginBottom: 5 },
  mainLabel: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 30,
    lineHeight: 32,
  },
  card: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 25,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBody: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  cardDesc: { fontSize: 12, color: "#888", marginTop: 2 },
});

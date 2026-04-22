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

export default function BiodataSummary() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [jabatanStruktural, setJabatanStruktural] = useState<any[]>([]);
  const [jabatanAkademik, setJabatanAkademik] = useState<any[]>([]);
  const [dataKeluarga, setDataKeluarga] = useState<any[]>([]);

  useEffect(() => {
    const fetchDataPegawai = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const userId = session.user.id;

      // Ambil Jabatan Struktural
      const { data: jabStruktural } = await supabase
        .from("jabatan_struktural")
        .select("*")
        .eq("user_id", userId);
      setJabatanStruktural(jabStruktural || []);

      // Ambil Profil
      const { data: profile } = await supabase
        .from("profil")
        .select("*")
        .eq("id", userId)
        .single();
      setUserData(profile);

      // Ambil Jabatan Akademik
      const { data: jabAkad } = await supabase
        .from("jabatan_akademik")
        .select("*")
        .eq("user_id", userId);
      setJabatanAkademik(jabAkad || []);

      // Ambil Data Keluarga
      const { data: keluarga } = await supabase
        .from("data_keluarga")
        .select("*")
        .eq("user_id", userId);
      setDataKeluarga(keluarga || []);
    };
    fetchDataPegawai();
  }, []);

  const GridItem = ({ label, value, icon }: any) => (
    <View style={styles.gridItem}>
      <View style={styles.gridHeader}>
        <Ionicons name={icon} size={14} color="#888" />
        <Text style={styles.gridLabel}>{label}</Text>
      </View>
      <Text style={styles.gridValue}>{value || "-"}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <View style={styles.headerBlue}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Biodata Diri</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>RINGKASAN BIODATA</Text>
        <View style={styles.gridContainer}>
          <GridItem
            label="Nama Lengkap"
            value={userData?.nama_lengkap}
            icon="person-outline"
          />
          <GridItem label="NIP" value={userData?.nip} icon="card-outline" />
          <GridItem label="KTP" value={userData?.ktp} icon="id-card-outline" />
          <GridItem
            label="Status Pegawai"
            value={userData?.status_pegawai}
            icon="briefcase-outline"
          />
          <GridItem
            label="Status Kerja"
            value="Aktif"
            icon="checkmark-circle-outline"
          />
          <GridItem
            label="Unit Kerja"
            value={userData?.unit_kerja}
            icon="business-outline"
          />
          <GridItem
            label="Masa Kerja"
            value="2 Tahun 2 Bulan"
            icon="time-outline"
          />
        </View>

        <TouchableOpacity
          style={styles.viewAllBtn}
          onPress={() => router.push("/profil_detail")}
        >
          <Ionicons name="eye-outline" size={18} color="#00468C" />
          <Text style={styles.viewAllText}>VIEW ALL</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>DATA PEGAWAI</Text>

        {/* Accordion Jabatan Struktural */}
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() =>
            setExpanded(expanded === "struktural" ? null : "struktural")
          }
        >
          <View style={styles.accordionTitleRow}>
            <View style={styles.iconBox}>
              <Ionicons name="git-network-outline" size={20} color="white" />
            </View>
            <Text style={styles.accordionTitle}>Jabatan Struktural</Text>
          </View>
          <Ionicons
            name={expanded === "struktural" ? "chevron-up" : "chevron-down"}
            size={20}
            color="white"
          />
        </TouchableOpacity>

        {expanded === "struktural" && (
          <View style={styles.accordionContent}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 2 }]}>JABATAN</Text>
              <Text style={styles.tableHeaderText}>UNIT</Text>
              <Text style={styles.tableHeaderText}>TANGGAL</Text>
            </View>
            {jabatanStruktural.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  {item.jabatan}
                </Text>
                <Text style={styles.tableCell}>{item.unit}</Text>
                <Text style={styles.tableCell}>{item.tanggal_awal}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Accordion Jabatan Akademik */}
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() =>
            setExpanded(expanded === "akademik" ? null : "akademik")
          }
        >
          <View style={styles.accordionTitleRow}>
            <View style={styles.iconBox}>
              <Ionicons name="school-outline" size={20} color="white" />
            </View>
            <Text style={styles.accordionTitle}>Jabatan Akademik</Text>
          </View>
          <Ionicons
            name={expanded === "akademik" ? "chevron-up" : "chevron-down"}
            size={20}
            color="white"
          />
        </TouchableOpacity>

        {expanded === "akademik" && (
          <View style={styles.accordionContent}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 2 }]}>JABATAN</Text>
              <Text style={styles.tableHeaderText}>UNIT</Text>
              <Text style={styles.tableHeaderText}>NO. SK</Text>
            </View>
            {jabatanAkademik.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  {item.jabatan}
                </Text>
                <Text style={styles.tableCell}>{item.unit}</Text>
                <Text style={styles.tableCell}>{item.no_sk}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Accordion Data Keluarga */}
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() =>
            setExpanded(expanded === "keluarga" ? null : "keluarga")
          }
        >
          <View style={styles.accordionTitleRow}>
            <View style={styles.iconBox}>
              <Ionicons name="people-outline" size={20} color="white" />
            </View>
            <Text style={styles.accordionTitle}>Data Keluarga</Text>
          </View>
          <Ionicons
            name={expanded === "keluarga" ? "chevron-up" : "chevron-down"}
            size={20}
            color="white"
          />
        </TouchableOpacity>

        {expanded === "keluarga" && (
          <View style={styles.accordionContent}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 2 }]}>NAMA</Text>
              <Text style={styles.tableHeaderText}>HUBUNGAN</Text>
              <Text style={styles.tableHeaderText}>STATUS</Text>
            </View>
            {dataKeluarga.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>{item.nama}</Text>
                <Text style={styles.tableCell}>{item.hubungan}</Text>
                <Text style={styles.tableCell}>{item.status}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerBlue: {
    backgroundColor: "#00468C",
    height: 120,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#AAA",
    marginVertical: 15,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  gridHeader: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  gridLabel: { fontSize: 10, color: "#AAA", marginLeft: 5 },
  gridValue: { fontSize: 13, fontWeight: "bold", color: "#333" },
  viewAllBtn: {
    backgroundColor: "#E8F0F8",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  viewAllText: {
    color: "#00468C",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 12,
  },
  accordionHeader: {
    backgroundColor: "#00468C",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  accordionTitleRow: { flexDirection: "row", alignItems: "center" },
  iconBox: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 10,
    marginRight: 15,
  },
  accordionTitle: { color: "white", fontWeight: "bold" },
  accordionContent: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginTop: -20,
    paddingTop: 30,
    marginBottom: 15,
    zIndex: -1,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingBottom: 5,
  },
  tableHeaderText: { fontSize: 9, color: "#AAA", fontWeight: "bold", flex: 1 },
  tableRow: { flexDirection: "row", paddingTop: 10 },
  tableCell: { fontSize: 11, color: "#333", flex: 1 },
});

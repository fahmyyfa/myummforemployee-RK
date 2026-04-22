import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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
import { supabase } from "../lib/supabase";

export default function LaporanHubScreen() {
  const router = useRouter();
  const { matkulId, matkul, kelas } = useLocalSearchParams();

  const [activeTab, setActiveTab] = useState("Persebaran");
  const [loading, setLoading] = useState(true);
  const [dataMeta, setDataMeta] = useState<any>(null);
  const [dataDetail, setDataDetail] = useState<any[]>([]);

  useEffect(() => {
    fetchDinamis();
  }, [activeTab, matkulId]);

  const fetchDinamis = async () => {
    setLoading(true);
    const { data: meta } = await supabase
      .from("laporan_matkul")
      .select("*")
      .eq("id", matkulId)
      .single();
    setDataMeta(meta);

    let res: any;
    if (activeTab === "Persebaran")
      res = await supabase
        .from("laporan_detail_nilai")
        .select("*")
        .eq("laporan_id", matkulId)
        .order("huruf");
    else if (activeTab === "CPMK" || activeTab === "CPL")
      res = await supabase
        .from("laporan_sub_cpmk")
        .select("*")
        .eq("laporan_id", matkulId);
    else if (activeTab === "Materi")
      res = await supabase
        .from("laporan_evaluasi_materi")
        .select("*")
        .eq("laporan_id", matkulId)
        .order("pertemuan");
    else if (activeTab === "Jurnal")
      res = await supabase
        .from("laporan_jurnal_mengajar")
        .select("*")
        .eq("laporan_id", matkulId)
        .order("pertemuan");

    setDataDetail(res?.data || []);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Laporan Hub</Text>
        <TouchableOpacity>
          <Ionicons name="cloud-download-outline" size={24} color="#00468C" />
        </TouchableOpacity>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          {matkul || dataMeta?.nama_matkul || "Detail Laporan"}
        </Text>
        <Text style={styles.bannerSub}>
          Kelas {kelas || "-"} • ID: {matkulId}
        </Text>
      </View>

      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {["Persebaran", "CPMK", "Materi", "CPL", "Jurnal", "Kinerja"].map(
            (t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setActiveTab(t)}
                style={[styles.tab, activeTab === t && styles.tabActive]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === t && styles.tabTextActive,
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </ScrollView>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#00468C"
          style={{ marginTop: 50 }}
        />
      ) : (
        <ScrollView contentContainerStyle={{ padding: 25 }}>
          {!dataMeta ? (
            <View style={styles.emptyBox}>
              <Ionicons name="alert-circle-outline" size={48} color="#CCC" />
              <Text style={styles.emptyText}>
                Data belum tersedia di database.
              </Text>
            </View>
          ) : (
            <View style={styles.transparentTable}>
              {activeTab === "Persebaran" && <TableNilai items={dataDetail} />}
              {activeTab === "CPMK" && (
                <TableCPMK items={dataDetail} stats={dataMeta} />
              )}
              {activeTab === "Materi" && <TableMateri items={dataDetail} />}
              {activeTab === "CPL" && <TableCPL items={dataDetail} />}
              {activeTab === "Jurnal" && <TableJurnal items={dataDetail} />}
              {activeTab === "Kinerja" && (
                <View style={{ paddingTop: 40 }}>
                  <Text style={styles.bigScore}>{dataMeta.skor_kinerja}</Text>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#888",
                      fontWeight: "bold",
                    }}
                  >
                    SKOR KINERJA DOSEN
                  </Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

// --- HELPER & SUB COMPONENTS ---

const getGradeColor = (grade: string) => {
  if (grade.startsWith("A")) return "#4CAF50";
  if (grade.startsWith("B")) return "#2196F3";
  if (grade.startsWith("C")) return "#FF9800";
  return "#F44336";
};

const TableNilai = ({ items }: any) => (
  <View>
    <View style={styles.tableHeader}>
      <Text style={styles.headerLabel}>GRADE NILAI</Text>
      <Text style={styles.headerLabelRight}>DISTRIBUSI</Text>
    </View>
    {items.map((it: any, i: number) => (
      <View key={i} style={styles.transparentRow}>
        <View style={styles.gradeCol}>
          <View
            style={[styles.dot, { backgroundColor: getGradeColor(it.huruf) }]}
          />
          <Text style={styles.gradeText}>Nilai {it.huruf}</Text>
        </View>
        <Text style={styles.valueText}>
          {it.jumlah} <Text style={styles.percText}>({it.persentase}%)</Text>
        </Text>
      </View>
    ))}
  </View>
);

const TableCPMK = ({ items, stats }: any) => (
  <View>
    <View style={styles.statsSummary}>
      <View style={styles.statItem}>
        <Text style={styles.statVal}>{stats.mhs_tuntas}</Text>
        <Text style={styles.statLab}>TUNTAS</Text>
      </View>
      <View
        style={[
          styles.statItem,
          { borderLeftWidth: 1, borderRightWidth: 1, borderColor: "#EEE" },
        ]}
      >
        <Text style={styles.statVal}>{stats.rata_rata_ip}</Text>
        <Text style={styles.statLab}>AVG IP</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statVal}>{stats.ip_target}</Text>
        <Text style={styles.statLab}>TARGET</Text>
      </View>
    </View>
    <View style={[styles.tableHeader, { marginTop: 30 }]}>
      <Text style={styles.headerLabel}>MAHASISWA</Text>
      <Text style={styles.headerLabelRight}>STATUS</Text>
    </View>
    {items.map((it: any, i: number) => (
      <View key={i} style={styles.transparentRow}>
        <Text style={styles.bodyText}>{it.nama}</Text>
        <Text
          style={[
            styles.bodyText,
            { fontWeight: "bold", color: it.is_tuntas ? "#4CAF50" : "#F44336" },
          ]}
        >
          {it.is_tuntas ? "TUNTAS" : "GAGAL"}
        </Text>
      </View>
    ))}
  </View>
);

const TableMateri = ({ items }: any) => (
  <View>
    <View style={styles.tableHeader}>
      <Text style={styles.headerLabel}>PERTEMUAN</Text>
      <Text style={styles.headerLabelRight}>KESESUAIAN</Text>
    </View>
    {items.map((it: any, i: number) => (
      <View key={i} style={styles.transparentRow}>
        <Text style={styles.bodyText}>Minggu ke-{it.pertemuan}</Text>
        <Ionicons
          name={it.is_sesuai ? "checkmark-circle" : "close-circle"}
          size={22}
          color={it.is_sesuai ? "#4CAF50" : "#F44336"}
        />
      </View>
    ))}
  </View>
);

const TableCPL = ({ items }: any) => (
  <View>
    <View style={styles.tableHeader}>
      <Text style={styles.headerLabel}>NIM</Text>
      <Text style={styles.headerLabelRight}>CAPAIAN CPL</Text>
    </View>
    {items.map((it: any, i: number) => (
      <View key={i} style={styles.transparentRow}>
        <Text style={styles.bodyText}>{it.nim}</Text>
        <Text style={styles.valueText}>{it.ketercapaian_cpl}%</Text>
      </View>
    ))}
  </View>
);

const TableJurnal = ({ items }: any) => (
  <View>
    {items.map((it: any, i: number) => (
      <View
        key={i}
        style={[
          styles.transparentRow,
          { flexDirection: "column", alignItems: "flex-start" },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#00468C", fontSize: 15 }}>
            Pertemuan {it.pertemuan}
          </Text>
          <Text style={{ fontSize: 12, color: "#999" }}>{it.hari_tanggal}</Text>
        </View>
        <Text style={{ marginTop: 6, color: "#444", lineHeight: 20 }}>
          {it.materi}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 12 }}>
          <View style={styles.badgeSml}>
            <Text style={styles.badgeTxt}>HADIR: {it.mhs_hadir}</Text>
          </View>
          <View style={[styles.badgeSml, { backgroundColor: "#FFEBEE" }]}>
            <Text style={[styles.badgeTxt, { color: "#D32F2F" }]}>
              ABSEN: {it.mhs_absen}
            </Text>
          </View>
        </View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  banner: {
    padding: 25,
    backgroundColor: "#00468C",
    marginHorizontal: 20,
    borderRadius: 24,
  },
  bannerTitle: { color: "#FFF", fontSize: 20, fontWeight: "bold" },
  bannerSub: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  tabContainer: { paddingVertical: 15 },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 14,
    backgroundColor: "#F5F7FA",
  },
  tabActive: { backgroundColor: "#00468C" },
  tabText: { color: "#888", fontSize: 13, fontWeight: "bold" },
  tabTextActive: { color: "#FFF" },
  transparentTable: { flex: 1 },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: "#F0F0F0",
  },
  headerLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#BBB",
    letterSpacing: 1.5,
  },
  headerLabelRight: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#BBB",
    textAlign: "right",
    letterSpacing: 1.5,
  },
  transparentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F8F8F8",
  },
  gradeCol: { flexDirection: "row", alignItems: "center" },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  gradeText: { fontSize: 15, color: "#333", fontWeight: "600" },
  valueText: { fontSize: 16, fontWeight: "bold", color: "#333" },
  percText: { color: "#AAA", fontWeight: "normal", fontSize: 13 },
  bodyText: { fontSize: 14, color: "#444", fontWeight: "500" },
  statsSummary: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F9FBFF",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EBF2FF",
  },
  statItem: { flex: 1, alignItems: "center" },
  statVal: { fontSize: 22, fontWeight: "bold", color: "#00468C" },
  statLab: {
    fontSize: 9,
    color: "#AAA",
    marginTop: 6,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  bigScore: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#00468C",
    textAlign: "center",
  },
  badgeSml: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
  },
  badgeTxt: { fontSize: 10, color: "#2E7D32", fontWeight: "bold" },
  emptyBox: { alignItems: "center", marginTop: 100 },
  emptyText: { color: "#AAA", marginTop: 10, textAlign: "center" },
});

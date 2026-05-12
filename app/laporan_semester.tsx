import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRiwayatLaporan } from "../hooks/useRiwayatLaporan"; // disini perubahannya pak

export default function LaporanSemester() {
  const router = useRouter();
  
  const { riwayat, loading, error } = useRiwayatLaporan();

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Riwayat Laporan</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* BANNER */}
        <View style={styles.bannerBlue}>
          <Text style={styles.bannerSub}>Laporan Peningkatan</Text>
          <Text style={styles.bannerTitle}>
            Pilih Semester{"\n"}Laporan Anda
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Tahun Akademik</Text>

        {/* Tampilkan pesan error jika ada */}
        {error && (
          <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
            {error}
          </Text>
        )}

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#00468C"
            style={{ marginTop: 50 }}
          />
        ) : (
          riwayat.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => {
                router.push({
                  pathname: "/laporan_matkul",
                  params: {
                    tahun: item.tahun_akademik,
                    semester: item.semester,
                  },
                });
              }}
            >
              <View style={styles.numberBox}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={styles.yearText}>{item.tahun_akademik}</Text>
                <Text style={styles.semesterText}>
                  Semester {item.semester}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#00468C" />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  bannerBlue: {
    backgroundColor: "#00468C",
    padding: 25,
    borderRadius: 20,
    marginBottom: 25,
  },
  bannerSub: { color: "rgba(255,255,255,0.7)", fontSize: 12 },
  bannerTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 15 },
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },
  numberBox: {
    backgroundColor: "#E8F0F8",
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: { color: "#00468C", fontWeight: "bold" },
  yearText: { fontWeight: "bold", fontSize: 14 },
  semesterText: { fontSize: 12, color: "#777" },
});

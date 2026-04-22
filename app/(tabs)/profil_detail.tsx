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
import { supabase } from "../../lib/supabase";

export default function ProfilDetail() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const { data } = await supabase
        .from("profil")
        .select("*")
        .eq("id", session?.user.id)
        .single();
      setUserData(data);
    };
    fetch();
  }, []);

  const DetailRow = ({ label, value }: { label: string; value: any }) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value || "-"}</Text>
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

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.groupTitle}>IDENTITAS DASAR</Text>
        <View style={styles.card}>
          <DetailRow label="NAMA LENGKAP" value={userData?.nama_lengkap} />
          <DetailRow label="NIP" value={userData?.nip} />
          <DetailRow label="KTP" value={userData?.ktp} />
          <DetailRow label="NBM" value={userData?.nbm} />
          <DetailRow label="NIDN" value={userData?.nidn} />
          <DetailRow label="NUPTK" value={userData?.nuptk} />
        </View>
        <Text style={styles.groupTitle}>PERSONAL & KELAHIRAN</Text>
        <View style={styles.card}>
          <DetailRow label="TEMPAT LAHIR" value={userData?.tempat_lahir} />
          <DetailRow label="TANGGAL LAHIR" value={userData?.tanggal_lahir} />
          <DetailRow label="JENIS KELAMIN" value={userData?.jenis_kelamin} />
          <DetailRow label="AGAMA" value={userData?.agama} />
          <DetailRow
            label="PENDIDIKAN TERAKHIR"
            value={userData?.pendidikan_terakhir}
          />
        </View>
        {/* Tambahkan baris-baris ini di dalam ScrollView file profil_detail.tsx
        Anda */}
        <Text style={styles.groupTitle}>KONTAK & DIGITAL</Text>
        <View style={styles.card}>
          <DetailRow label="WHATSAPP" value={userData?.whatsapp} />
          <DetailRow label="INTERNAL EMAIL" value={userData?.email_internal} />
          <DetailRow label="PERSONAL EMAIL" value={userData?.email_personal} />
        </View>
        <Text style={styles.groupTitle}>DOMISILI</Text>
        <View style={styles.card}>
          <DetailRow label="ALAMAT KTP" value={userData?.alamat_ktp} />
          <DetailRow label="DOMISILI SEKARANG" value={userData?.domisili} />
        </View>
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
  groupTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#AAA",
    marginBottom: 10,
    marginTop: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 5,
    elevation: 1,
  },
  detailRow: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  detailLabel: {
    fontSize: 9,
    color: "#AAA",
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailValue: { fontSize: 14, color: "#333", fontWeight: "600" },
});

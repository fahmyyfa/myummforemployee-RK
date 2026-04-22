import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../../lib/supabase";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Butuh izin kamera untuk scan
        </Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={{ color: "#FFF" }}>Beri Izin</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    console.log("QR Terdeteksi:", data); // Cek apakah ini muncul di console browser (F12)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user.id;

      if (!userId) {
        alert("Sesi tidak ditemukan, silakan login ulang");
        setScanned(false);
        return;
      }

      const { error } = await supabase.from("presensi_kegiatan").insert({
        user_id: userId,
        nama_kegiatan: data,
      });

      if (error) {
        console.error("Gagal Simpan ke DB:", error.message);
        alert("Gagal simpan: " + error.message);
        setScanned(false);
      } else {
        console.log("Simpan Berhasil, Berpindah Halaman...");
        // Gunakan as any jika TypeScript masih komplain masalah path
        router.push("/scan_success");
      }
    } catch (err) {
      console.error("Error Sistem:", err);
      setScanned(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Presensi Kegiatan</Text>
        <View style={{ width: 24 }} />
      </View>

      <CameraView
        style={styles.scanner}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      >
        <View style={styles.overlay}>
          <View style={styles.unfocusedContainer}></View>
          <View style={styles.middleContainer}>
            <View style={styles.unfocusedContainer}></View>
            <View style={styles.focusedContainer}>
              {/* Bingkai Sudut Biru */}
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
            <View style={styles.unfocusedContainer}></View>
          </View>
          <View style={styles.unfocusedContainer}>
            <Text style={styles.instructionText}>
              POSISIKAN KODE QR ATAU BARCODE DI DALAM BINGKAI UNTUK MEMINDAI
              SECARA OTOMATIS
            </Text>
            {/* Tombol Simulasi Khusus Web Testing */}
            <TouchableOpacity
              style={{
                marginTop: 20,
                padding: 10,
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 10,
              }}
              onPress={() => handleBarCodeScanned({ data: "Pengajian Rutin" })}
            >
              <Text style={{ color: "#FFF", fontSize: 12 }}>
                [Simulasi Scan Berhasil]
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  scanner: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  unfocusedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  middleContainer: { flexDirection: "row", height: 280 },
  focusedContainer: {
    width: 280,
    position: "relative",
    backgroundColor: "transparent",
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#00468C",
    borderWidth: 5,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderTopLeftRadius: 30,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderTopRightRadius: 30,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderBottomLeftRadius: 30,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderBottomRightRadius: 30,
  },
  instructionText: {
    color: "#FFF",
    fontSize: 10,
    textAlign: "center",
    paddingHorizontal: 50,
    opacity: 0.8,
  },
  btn: {
    backgroundColor: "#00468C",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
});

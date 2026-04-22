import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function signInWithEmail() {
    if (!email || !password) return alert("Isi email dan password!");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert("Login Gagal: " + error.message);
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        {/* HEADER DENGAN BACKGROUND GAMBAR UMM */}
        <ImageBackground
          source={require("../assets/images/bg-umm.jpg")}
          style={styles.headerBg}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text style={styles.headerTitle}>Sistem{"\n"}Kepegawaian</Text>
            <Text style={styles.headerSubtitle}>
              Universitas Muhammadiyah Malang
            </Text>
          </View>
        </ImageBackground>

        {/* LOGIN CARD */}
        <View style={styles.loginCard}>
          <Text style={styles.welcomeTitle}>Selamat Datang</Text>
          <Text style={styles.welcomeDesc}>
            Masukkan username dan password Anda untuk mengakses portal akademik.
          </Text>

          <Text style={styles.label}>USERNAME</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={18}
              color="#888"
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Masukkan username"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.labelRow}>
            <Text style={styles.label}>PASSWORD</Text>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Lupa Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={18}
              color="#888"
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Masukkan password"
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={signInWithEmail}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Masuk ke Portal</Text>
            )}
          </TouchableOpacity>

          {/* LAYANAN LAINNYA DIVIDER */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>LAYANAN LAINNYA</Text>
            <View style={styles.line} />
          </View>

          {/* GRID LAYANAN LAINNYA */}
          <View style={styles.otherServicesGrid}>
            <TouchableOpacity style={styles.serviceBtn}>
              <View style={styles.iconCircleBlue}>
                <Ionicons name="mail-outline" size={24} color="#00468C" />
              </View>
              <Text style={styles.serviceLabel}>Buat Email Baru</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.serviceBtn}>
              <View style={styles.iconCircleBlue}>
                <Ionicons name="key-outline" size={24} color="#00468C" />
              </View>
              <Text style={styles.serviceLabel}>Reset Password</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.copyrightText}>
            © 2026 Universitas Muhammadiyah Malang
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFF" },
  headerBg: { width: "100%", height: 300 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 70, 140, 0.4)",
    padding: 40,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 47,
    fontWeight: "900",
    color: "#fff",
    lineHeight: 40,
    letterSpacing: 2,
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "300",
    lineHeight: 20,
    letterSpacing: 4,
    marginTop: 20,
  },
  loginCard: {
    backgroundColor: "#fff",
    marginTop: -40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    flex: 1,
  },
  welcomeTitle: { fontSize: 24, fontWeight: "bold", color: "#222" },
  welcomeDesc: {
    fontSize: 13,
    color: "#777",
    marginVertical: 10,
    marginBottom: 25,
  },
  label: { fontSize: 11, fontWeight: "bold", color: "#aaa", marginBottom: 5 },
  labelRow: { flexDirection: "row", justifyContent: "space-between" },
  forgotText: { fontSize: 11, color: "#00468C", fontWeight: "bold" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4F7",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },
  input: { flex: 1, fontSize: 14, color: "#222" },
  loginButton: {
    backgroundColor: "#00468C",
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 5,
    shadowColor: "#00468C",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  line: { flex: 1, height: 1, backgroundColor: "#EEE" },
  dividerText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#CCC",
    marginHorizontal: 15,
  },
  otherServicesGrid: { flexDirection: "row", justifyContent: "space-between" },
  serviceBtn: {
    width: "48%",
    backgroundColor: "#F8F9FA",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  iconCircleBlue: {
    backgroundColor: "#E3F2FD",
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  serviceLabel: { fontSize: 11, fontWeight: "bold", color: "#00468C" },
  copyrightText: {
    textAlign: "center",
    color: "#CCC",
    fontSize: 11,
    marginTop: 40,
    marginBottom: 20,
  },
});

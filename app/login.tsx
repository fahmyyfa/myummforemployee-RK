import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
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
        <View style={styles.headerBlue}>
          <Text style={styles.headerTitle}>Sistem{"\n"}Kepegawaian</Text>
          <Text style={styles.headerSubtitle}>
            Universitas Muhammadiyah Malang
          </Text>
        </View>
        <View style={styles.loginCard}>
          <Text style={styles.welcomeTitle}>Selamat Datang</Text>
          <Text style={styles.welcomeDesc}>
            Masukkan username dan password Anda untuk mengakses portal akademik.
          </Text>

          <Text style={styles.label}>USERNAME</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#888"
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Masukkan email"
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
              size={20}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#00468C" },
  headerBlue: {
    padding: 40,
    backgroundColor: "#00468C",
    height: 250,
    justifyContent: "center",
  },
  headerTitle: { fontSize: 32, fontWeight: "900", color: "#fff" },
  headerSubtitle: { fontSize: 14, color: "#fff", opacity: 0.8 },
  loginCard: {
    backgroundColor: "#fff",
    marginTop: -50,
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
    marginBottom: 20,
  },
  label: { fontSize: 11, fontWeight: "bold", color: "#aaa", marginBottom: 5 },
  labelRow: { flexDirection: "row", justifyContent: "space-between" },
  forgotText: { fontSize: 11, color: "#00468C", fontWeight: "bold" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4F7",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },
  input: { flex: 1, fontSize: 14, color: "#222" },
  loginButton: {
    backgroundColor: "#00468C",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

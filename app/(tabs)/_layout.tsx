import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#00468C",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activePill]}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="akademik"
        options={{
          title: "Akademik",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activePill]}>
              <Ionicons name="school-outline" size={22} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: "",
          tabBarIcon: () => (
            <View style={styles.floatingButton}>
              <Ionicons name="qr-code-outline" size={28} color="white" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="aktivitas"
        options={{
          title: "Aktivitas",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activePill]}>
              <Ionicons name="calendar-outline" size={22} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activePill]}>
              <Ionicons name="person-outline" size={22} color={color} />
            </View>
          ),
        }}
      />

      {/* SEMBUNYIKAN HALAMAN BAWAAN EXPO */}
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Ini akan menghapus ikon & teks dari navbar
        }}
      />

      <Tabs.Screen
        name="profil_biodata"
        options={{ href: null }} // Sembunyikan
      />
      <Tabs.Screen
        name="profil_detail"
        options={{ href: null }} // Sembunyikan
      />

      {/* SEMBUNYIKAN HALAMAN DETAIL AGAR TIDAK MUNCUL DI NAVBAR */}
      <Tabs.Screen
        name="akademik_detail"
        options={{
          href: null, // Ini akan menyembunyikan dari navbar
        }}
      />

      <Tabs.Screen
        name="akademik_jadwal"
        options={{
          href: null, // Ini akan menyembunyikan dari navbar
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 85,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopWidth: 0,
    paddingBottom: 20,
    paddingTop: 10,
    // Shadow untuk efek kedalaman
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: -5,
  },
  iconContainer: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  activePill: {
    backgroundColor: "#E8F0F8", // Warna biru muda transparan saat aktif
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#00468C",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35, // Membuatnya melayang di atas navbar
    borderWidth: 4,
    borderColor: "#FFFFFF",
    elevation: 5,
    shadowColor: "#00468C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

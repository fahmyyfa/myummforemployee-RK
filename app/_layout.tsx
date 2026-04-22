import { Session } from "@supabase/supabase-js";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();
  const segments = useSegments(); // Untuk memantau posisi user saat ini

  useEffect(() => {
    // 1. Ambil session awal
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitialized(true);
    });

    // 2. Pantau perubahan auth
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!initialized) return;

    const inTabsGroup = segments[0] === "(tabs)";
    const isAuthPage = segments[0] === "login";
    // Tambahkan pengecualian untuk halaman yang boleh diakses meski di luar tabs
    const isPublicOrSuccessPage = segments[0] === "scan_success";

    if (!session && !isAuthPage) {
      // Jika tidak ada session dan bukan di halaman login, paksa ke login
      router.replace("/login");
    } else if (session && isAuthPage) {
      // Jika ada session tapi di halaman login, pindah ke tabs
      router.replace("/(tabs)");
    }
    // Hapus logika "else if (session && !inTabsGroup)" yang lama agar tidak memaksa kembali ke beranda
  }, [session, initialized, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

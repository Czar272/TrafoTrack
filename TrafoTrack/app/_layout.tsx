/* eslint-disable react-hooks/exhaustive-deps */
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { View, ActivityIndicator } from "react-native";

import { useFonts, Audiowide_400Regular } from "@expo-google-fonts/audiowide";
import { Asimovian_400Regular } from "@expo-google-fonts/asimovian";
/**
 * Root Layout
 *
 * Aquí inicializamos la sesión al arrancar la app.
 * También bloqueamos la UI hasta que sepamos si el usuario está logueado.
 */
export default function Layout() {
  const loadSession = useAuthStore((state) => state.loadSession);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [fontsLoaded] = useFonts({
    Audiowide_400Regular,
    Asimovian_400Regular,
  });

  useEffect(() => {
    loadSession();
  }, []);

  // Mientras carga sesión mostramos loader
  if (isLoading || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

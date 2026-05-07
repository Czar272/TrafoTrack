import { View } from "react-native";
import { Stack } from "expo-router";
import FloatingFooter from "@/components/common/floating_footer";

/**
 * Layout protegido
 *
 * Este layout envuelve TODAS las pantallas dentro de (protected)
 * Aquí agregamos el footer global
 */
export default function ProtectedLayout() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      <FloatingFooter />
    </View>
  );
}

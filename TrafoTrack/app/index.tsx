import { View, Text, Button } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";

/**
 * Pantalla principal (Home)
 *
 * Esta pantalla solo debe mostrarse si el usuario está autenticado.
 * Si no lo está, usamos <Redirect /> para enviarlo al login.
 *
 * IMPORTANTE:
 * Usamos <Redirect /> en lugar de router.replace() en useEffect
 * porque evita errores de navegación antes de que el layout esté listo.
 */
export default function Home() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (!isAuthenticated) {
    return <Redirect href={"/login"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Home - Trabajos</Text>

      <Button
        title="Crear Trabajo"
        onPress={() => router.push("/create-job")}
      />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

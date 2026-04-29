import { View, Text, Button } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

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
    </View>
  );
}

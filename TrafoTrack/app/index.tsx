import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

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

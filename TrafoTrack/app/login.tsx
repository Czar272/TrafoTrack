import { View, Text, TextInput, Button } from "react-native";
import { useEffect, useState } from "react";
import { useRouter, Redirect } from "expo-router";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const handleLogin = () => {
    if (email && password) {
      login();
      router.replace("/");
    }
  };

  if (isAuthenticated) {
    return <Redirect href={"/"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>TrafoTrack Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter, Redirect } from "expo-router";
import { useAuthStore } from "../store/authStore";
import { Colors } from "@/constants/theme";

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

  const handleLogin = async () => {
    if (email && password) {
      await login();
      router.replace("/");
    }
  };

  if (isAuthenticated) {
    return <Redirect href={"/"} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>TrafoTrack Login</Text>
      </View>

      <View style={styles.formContainer}>
        <View>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.textInput}
            placeholderTextColor={Colors.dark.text}
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.textInput}
            placeholderTextColor={Colors.dark.text}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            onPress={handleLogin}
            color={Colors.light.text}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 20,
    backgroundColor: Colors.dark.background,
  },
  textInput: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    color: "black",
    backgroundColor: Colors.dark.tabIconDefault,
    borderRadius: 10,
  },
  title: {
    color: Colors.dark.text,
    fontSize: 24,
  },
  titleContainer: {
    height: "50%",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  formContainer: {
    height: "50%",
    width: "100%",
  },
  buttonContainer: {
    marginVertical: 50,
    backgroundColor: Colors.light.tabIconSelected,
    width: "30%",
    alignSelf: "center",
    borderRadius: 5,
  },
});

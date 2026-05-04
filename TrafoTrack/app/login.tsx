import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter, Redirect } from "expo-router";
import { useAuthStore } from "../store/authStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Login() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { colorPallet, styles } = getStyles();

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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (isAuthenticated) {
    return <Redirect href={"/"} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>TrafoTrack</Text>
        <Text style={styles.subTitle}>Login</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={{ width: "70%" }}>
          <TextInput
            placeholder="Username / Email"
            value={email}
            onChangeText={setEmail}
            style={styles.textInput}
            placeholderTextColor={colorPallet.texto_secundario}
          />

          <View
            style={{
              justifyContent: "center",
            }}
          >
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.textInput}
              placeholderTextColor={colorPallet.texto_secundario}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.icon}
            >
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={24}
                color={colorPallet.texto_secundario}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={handleLogin} color={"white"} />
          </View>
        </View>
      </View>
    </View>
  );
}

const getStyles = () => {
  const colorPallet = {
    primario: "#1E3A8A",
    secundario: "#3B82F6",
    acento: "#06B6D4",
    fondo: "#64748B",
    texto_principal: "#0F172A",
    texto_secundario: "#64748B",
  };

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      padding: 20,
      backgroundColor: "#1517181e",
    },
    textInput: {
      marginBottom: 10,
      padding: 10,
      color: colorPallet.texto_secundario,
      borderBottomColor: "#284325",
      borderBottomWidth: 2,
      textAlign: "left",
      alignItems: "flex-start",
      width: "100%",
      marginVertical: 20,
    },
    title: {
      color: "#284325",
      fontSize: 30,
      textAlign: "center",
      fontFamily: "Audiowide_400Regular",
    },
    subTitle: {
      color: colorPallet.texto_secundario,
      fontSize: 22,
      textAlign: "center",
      alignSelf: "flex-end",
      fontFamily: "Audiowide_400Regular",
    },
    titleContainer: {
      height: "30%",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
    formContainer: {
      display: "flex",
      width: "100%",
      height: "35%",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      marginBottom: 50,
    },
    buttonContainer: {
      // backgroundColor: "#425c07",
      backgroundColor: "#284325",
      width: "100%",
      alignSelf: "center",
      marginTop: 100,
    },
    icon: {
      aspectRatio: 1,
      position: "absolute",
      alignSelf: "flex-end",
    },
  });

  return { colorPallet, styles };
};

import { workSpaceDimensions } from "@/constants/types";
import { useAuthStore } from "@/store/authStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

export default function Profile() {
  const { width, height } = useWindowDimensions();

  const { styles } = getStyles({ width, height });

  const logout = useAuthStore.getState().logout;

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile_image_area}>
        <TouchableOpacity style={styles.profile_image}>
          <MaterialIcons
            name="person"
            size={height * 0.224}
            style={{
              borderRadius: "100%",
            }}
            color={"#284325"}
          />
        </TouchableOpacity>
        <View style={styles.profile_name_cont}>
          <Text style={styles.profile_name}>Cesar Lopez </Text>
          <Text style={styles.profile_role}>/ Administrador</Text>
        </View>
      </View>
      <View style={styles.options_area}>
        <ScrollView
          style={styles.options_cont}
          contentContainerStyle={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.title_options_cont}>
            <Text>Archivos Generados </Text>
          </TouchableOpacity>
          <View style={styles.separator_line} />
          <TouchableOpacity style={styles.title_options_cont}>
            <Text>Equipos</Text>
          </TouchableOpacity>
          <View style={styles.separator_line} />
          <TouchableOpacity style={styles.title_options_cont}>
            <Text>Cuenta</Text>
          </TouchableOpacity>
          <View style={styles.separator_line} />
          <TouchableOpacity style={styles.title_options_cont}>
            <Text>Notificaciones</Text>
          </TouchableOpacity>
          <View style={styles.separator_line} />
          <TouchableOpacity style={styles.title_options_cont}>
            <Text>Ayuda</Text>
          </TouchableOpacity>
          <View style={styles.separator_line} />
          <TouchableOpacity style={styles.title_options_cont}>
            <Text>Informacion de Pruebas</Text>
          </TouchableOpacity>
          <View style={styles.separator_line} />
          <TouchableOpacity style={styles.title_options_cont}>
            <Text>Almacenamiento</Text>
          </TouchableOpacity>
          <View style={styles.separator_line} />
          <TouchableOpacity
            style={styles.title_options_cont}
            onPress={handleLogout}
          >
            <Text>Cerrar Sesión</Text>
          </TouchableOpacity>
          <View style={styles.separator_line} />
        </ScrollView>
      </View>
    </View>
  );
}

const getStyles = (dimensions: workSpaceDimensions) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      gap: dimensions.height * 0.01,
    },
    profile_image_area: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    profile_name_cont: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      marginVertical: 10,
    },
    profile_name: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      color: "#284325",
    },
    profile_role: {
      fontSize: 16,
      color: "#64748B",
      textAlign: "center",
    },
    profile_image: {
      width: "50%",
      aspectRatio: 1,
      borderRadius: "100%",
      borderWidth: 2,
      borderColor: "#284325",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      backgroundColor: "#50653fae",
    },
    options_area: {
      width: "100%",
      height: "50%",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
    options_cont: {
      width: "85%",
      borderRadius: 15,
      borderWidth: 2,
      borderColor: "#284325",
    },
    title_options_cont: {
      display: "flex",
      height: dimensions.height * 0.065,
      width: "100%",
      paddingHorizontal: 15,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "flex-start",
    },
    separator_line: {
      width: "90%",
      height: dimensions.height * 0.002,
      backgroundColor: "#284325",
    },
  });

  return { styles };
};

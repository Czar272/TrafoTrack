import { MaterialIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

const FloatingFooter: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { styles } = getStyles();

  const isActive = (route: string) => pathname === route;

  const goToHome = () => {
    if (isActive("/")) return;
    router.push("/");
  };

  const goToFiles = () => {
    if (isActive("/files")) return;
    // Cuando cree la pantalla files
    // router.push("/files");
  };

  const goToProfile = () => {
    if (isActive("/profile")) return;
    router.push("/profile");
  };

  return (
    <View style={styles.floating_footer}>
      <TouchableOpacity
        style={[
          styles.footer_page_button,
          isActive("/") && { backgroundColor: "#28432563" },
        ]}
        onPress={goToHome}
      >
        <MaterialIcons name="home" size={34} />
        <Text>Trabajos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.footer_page_button,
          isActive("/files") && { backgroundColor: "#28432563" },
        ]}
        onPress={goToFiles}
      >
        <MaterialIcons name="file-present" size={34} />
        <Text>Archivos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.footer_page_button,
          isActive("/profile") && { backgroundColor: "#28432563" },
        ]}
        onPress={goToProfile}
      >
        <MaterialIcons name="person" size={34} />
        <Text>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = () => {
  const styles = StyleSheet.create({
    floating_footer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      alignSelf: "center",
      alignItems: "center",
      position: "absolute",
      height: 65,
      borderRadius: 50,
      backgroundColor: "#ffffff8b",
      bottom: 30,
      borderWidth: 2,
    },
    footer_page_button: {
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 30,
      paddingHorizontal: 20,
      marginHorizontal: 10,
    },
  });

  return { styles };
};

export default FloatingFooter;

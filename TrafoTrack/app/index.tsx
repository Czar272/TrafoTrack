import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";

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

  const [showActiveJobs, setShowActiveJobs] = useState(true);
  const [showDoneJobs, setShowDoneJobs] = useState(true);

  const { styles } = getStyles();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const handleCreateJob = () => {
    router.push("/create-job");
  };

  const toggleActiveJobsVisibility = () => {
    setShowActiveJobs((prev) => !prev);
  };

  const toggleDoneJobsVisibility = () => {
    setShowDoneJobs((prev) => !prev);
  };

  if (!isAuthenticated) {
    return <Redirect href={"/login"} />;
  }

  return (
    <View style={styles.general}>
      <View style={styles.header}>
        <View style={styles.title_and_button_cont}>
          <Text style={styles.header_title}>Mis Trabajos</Text>
          <TouchableOpacity
            onPress={handleCreateJob}
            style={styles.create_job_button}
          >
            <MaterialIcons name="add" size={34} />
          </TouchableOpacity>
        </View>
        <View style={styles.logout_button_cont}>
          <TouchableOpacity onPress={handleLogout} style={styles.logout_button}>
            <MaterialIcons name="logout" size={34} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.blocks_and_title_cont}>
          <View style={styles.block_title_container}>
            <TouchableOpacity onPress={toggleActiveJobsVisibility}>
              <MaterialIcons
                name={
                  showActiveJobs ? "keyboard-arrow-down" : "keyboard-arrow-up"
                }
                size={24}
                color={"#64748B"}
              />
            </TouchableOpacity>
            <Text style={styles.block_title}>Trabajos Activos</Text>
          </View>
          <View style={styles.blocks_container}>
            {[0, 1, 2, 3].map((i) =>
              showActiveJobs ? (
                <View key={`active_job_${i}`} style={styles.job_block}>
                  <Text style={styles.job_block_title}>
                    LALA - Don Sergio - 03/05/2026
                  </Text>
                  <TouchableOpacity>
                    <MaterialIcons name="more-vert" size={24} />
                  </TouchableOpacity>
                </View>
              ) : null,
            )}
          </View>
        </View>

        <View style={styles.blocks_and_title_cont}>
          <View style={styles.block_title_container}>
            <TouchableOpacity onPress={toggleDoneJobsVisibility}>
              <MaterialIcons
                name={
                  showDoneJobs ? "keyboard-arrow-down" : "keyboard-arrow-up"
                }
                size={24}
                color={"#64748B"}
              />
            </TouchableOpacity>
            <Text style={styles.block_title}>Trabajos Hechos</Text>
          </View>
          <View style={styles.blocks_container}>
            {[0, 1, 2, 3].map((i) =>
              showDoneJobs ? (
                <View key={`done_job_${i}`} style={styles.job_block}>
                  <Text style={styles.job_block_title}>
                    LALA - Don Sergio - 03/05/2026
                  </Text>
                  <TouchableOpacity>
                    <MaterialIcons name="more-vert" size={24} />
                  </TouchableOpacity>
                </View>
              ) : null,
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.floating_footer}>
        <TouchableOpacity
          style={[
            styles.footer_page_button,
            { backgroundColor: "rgba(0, 0, 255, 0.3)" },
          ]}
        >
          <MaterialIcons name="home" size={34} />
          <Text>Trabajos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footer_page_button}>
          <MaterialIcons name="file-present" size={34} />
          <Text>Archivos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footer_page_button}>
          <MaterialIcons name="person" size={34} />
          <Text>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = () => {
  const styles = StyleSheet.create({
    general: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
      alignContent: "center",
      alignItems: "center",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      height: "10%",
      width: "100%",
      backgroundColor: "rgba(0, 0, 255, 0.3)",
      alignItems: "center",
      paddingTop: 40,
      paddingHorizontal: 15,
    },
    header_title: {
      fontFamily: "Audiowide_400Regular",
      fontSize: 26,
    },
    title_and_button_cont: {
      flexDirection: "row",
      width: "85%",
      alignContent: "center",
      alignItems: "center",
      gap: 10,
    },
    create_job_button: {
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255, 0, 0, 0.3)",
      borderRadius: 100,
    },
    logout_button_cont: {
      display: "flex",
      height: "100%",
      width: "15%",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    logout_button: {
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255, 0, 0, 0.3)",
      borderRadius: 100,
    },
    content: {
      backgroundColor: "rgba(0, 255, 0, 0.3)",
      width: "100%",
      padding: 20,
      overflow: "scroll",
    },
    blocks_and_title_cont: {
      backgroundColor: "rgba(0, 0, 255, 0.3)",
    },
    block_title_container: {
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      flexDirection: "row",
      borderBottomWidth: 2,
      borderBottomColor: "#64748B",
      padding: 5,
      width: "95%",
    },
    block_title: {
      fontSize: 20,
    },
    blocks_container: {
      backgroundColor: "rgba(255, 0, 0, 0.3)",
    },
    job_block: {
      display: "flex",
      flexDirection: "row",
      alignContent: "center",
      alignItems: "flex-start",
      margin: 10,
      borderRadius: 10,
      backgroundColor: "rgba(0, 0, 255, 0.3)",
      padding: 15,
      height: 90,
    },
    job_block_title: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      width: "95%",
    },
    floating_footer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      position: "absolute",
      height: 65,
      borderRadius: 50,
      backgroundColor: "rgba(255, 0, 0, 0.3)",
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

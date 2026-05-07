import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef, useState } from "react";
import { shuffleArray } from "@/util/array_functions";
import * as Progress from "react-native-progress";
import { workSpaceDimensions } from "@/constants/types";

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

  const searchBarRef = useRef<TextInput>(null);

  const [showActiveJobs, setShowActiveJobs] = useState(true);
  const [showDoneJobs, setShowDoneJobs] = useState(true);
  const [filterJobs, setFilterJobs] = useState(false);

  const { width, height } = useWindowDimensions();
  const { styles } = getStyles({ width, height });

  const handleCreateJob = () => {
    router.push("/create-job");
  };

  const handleFilterJobs = () => {
    setFilterJobs((prev) => !prev);
  };

  const toggleActiveJobsVisibility = () => {
    setShowActiveJobs((prev) => !prev);
  };

  const toggleDoneJobsVisibility = () => {
    setShowDoneJobs((prev) => !prev);
  };

  useEffect(() => {
    if (filterJobs) {
      setTimeout(() => {
        searchBarRef.current?.focus();
      }, 100);
    } else if (!filterJobs) {
      searchBarRef.current?.blur();
    }
  }, [filterJobs]);

  if (!isAuthenticated) {
    return <Redirect href={"/login"} />;
  }

  return (
    <View style={styles.general}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.title_and_button_cont}>
          <Text style={styles.header_title}>Mis Trabajos</Text>
          <View style={styles.header_buttons_cont}>
            <TouchableOpacity
              onPress={handleCreateJob}
              style={styles.header_button}
            >
              <MaterialIcons name="add" size={26} color={"#284325"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleFilterJobs}
              style={styles.header_button}
            >
              <MaterialIcons name="search" size={26} color={"#284325"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Contenido */}
      <ScrollView style={styles.content}>
        {/* Search Bar desplegable */}
        {filterJobs && (
          <View style={styles.retractable_search_bar_cont}>
            <MaterialIcons
              name="search"
              size={26}
              color={"#284325"}
              style={styles.search_bar_icon}
            />
            <TextInput
              style={styles.retractable_search_bar}
              ref={searchBarRef}
            />
            <TouchableOpacity style={styles.filter_bar_icon}>
              <MaterialIcons name="filter-list" size={26} color={"#284325"} />
            </TouchableOpacity>
          </View>
        )}
        {/* Trabajos Activos */}
        <View style={styles.blocks_and_title_cont}>
          <View style={styles.block_title_container}>
            <TouchableOpacity
              onPress={toggleActiveJobsVisibility}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name={
                  showActiveJobs ? "keyboard-arrow-down" : "keyboard-arrow-up"
                }
                size={24}
                color={"#64748B"}
              />
              <Text style={styles.block_title}>Trabajos Activos</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.blocks_container}>
            {shuffleArray([0, 1, 2, 3]).map((i) =>
              showActiveJobs ? (
                <View key={`active_job_${i}`} style={styles.job_block}>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: "25%",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Progress.Circle
                        size={60}
                        progress={i / 10}
                        color="#50653f"
                        showsText
                        textStyle={{
                          fontWeight: "bold",
                        }}
                        formatText={() => `${Math.round((i / 10) * 100)}%`}
                      />
                    </View>
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.job_block_title}>
                        LALA - Don Sergio
                      </Text>
                      <Text style={styles.job_block_date}>03/05/2026</Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: "25%",
                        justifyContent: "flex-start",
                        alignContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <MaterialIcons
                        name="more-vert"
                        size={24}
                        color={"#50653f"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null,
            )}
          </View>
        </View>

        {/* Trabajos Hechos */}
        <View style={styles.blocks_and_title_cont}>
          <View style={styles.block_title_container}>
            <TouchableOpacity
              onPress={toggleDoneJobsVisibility}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name={
                  showDoneJobs ? "keyboard-arrow-down" : "keyboard-arrow-up"
                }
                size={24}
                color={"#64748B"}
              />
              <Text style={styles.block_title}>Trabajos Hechos</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.blocks_container}>
            {shuffleArray([0, 1, 2, 3]).map((i) =>
              showDoneJobs ? (
                <View key={`done_job_${i}`} style={styles.job_block}>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        width: "25%",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Progress.Circle
                        size={60}
                        progress={1}
                        color="#50653f"
                        style={{
                          justifyContent: "center",
                          alignContent: "center",
                          overflow: "visible",
                        }}
                      >
                        <MaterialIcons
                          name="check"
                          size={32}
                          style={{ position: "absolute", alignSelf: "center" }}
                          color={"#50653f"}
                        />
                      </Progress.Circle>
                    </View>
                    <View
                      style={{ width: "50%", justifyContent: "space-between" }}
                    >
                      <Text style={styles.job_block_title}>
                        LALA - Don Sergio
                      </Text>
                      <Text style={styles.job_block_date}>03/05/2026</Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: "25%",
                        justifyContent: "flex-start",
                        alignContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <MaterialIcons
                        name="more-vert"
                        size={24}
                        color={"#50653f"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null,
            )}
          </View>
        </View>
        {/* Espacio muerto para que se pueda ver la footer flotante */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const getStyles = (dimensions: workSpaceDimensions) => {
  const { width, height } = dimensions;
  const baseUnit = Math.min(width, height);
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
      height: "13%",
      width: "100%",
      backgroundColor: "#50653f",
      alignItems: "center",
      paddingTop: 60,
      paddingHorizontal: 15,
    },
    header_title: {
      fontFamily: "Audiowide_400Regular",
      fontSize: 26,
      color: "white",
    },
    title_and_button_cont: {
      flexDirection: "row",
      width: "100%",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "space-between",
    },
    header_buttons_cont: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      gap: 10,
    },
    header_button: {
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
      backgroundColor: "white",
      padding: 3,
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
      borderRadius: 100,
      padding: 10,
    },
    content: {
      width: "100%",
      padding: 20,
      overflow: "scroll",
    },
    retractable_search_bar_cont: {
      justifyContent: "center",
      borderRadius: baseUnit * 0.05,
      borderWidth: baseUnit * 0.003,
      borderColor: "#284325",
      marginVertical: baseUnit * 0.04,
    },
    search_bar_icon: {
      position: "absolute",
      left: baseUnit * 0.02,
    },
    filter_bar_icon: {
      position: "absolute",
      right: width * 0.03,
    },
    retractable_search_bar: {
      height: baseUnit * 0.1,
      width: baseUnit * 0.8,
      left: baseUnit * 0.09,
    },
    blocks_and_title_cont: {},
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
      color: "#50653f",
      fontWeight: "bold",
    },
    blocks_container: {},
    job_block: {
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      alignItems: "flex-start",
      marginVertical: 10,
      padding: 15,
      height: 90,
      gap: 20,
      borderColor: "#00000037",
      borderWidth: 2,
      borderRadius: 10,
    },
    job_block_title: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      width: "95%",
      color: "#071943",
      fontWeight: "bold",
    },
    job_block_date: {
      display: "flex",
      justifyContent: "flex-end",
      color: "#64748B",
      bottom: 0,
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

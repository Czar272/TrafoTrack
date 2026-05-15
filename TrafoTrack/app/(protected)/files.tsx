import CollapsibleSection from "@/components/common/collapsible_section";
import Header from "@/components/common/header";
import { workSpaceDimensions } from "@/constants/types";
import { shuffleArray } from "@/util/array_functions";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  useWindowDimensions,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";

const Files: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const { styles, baseUnit } = getStyles({ width, height });

  return (
    <View style={styles.container}>
      <Header title="Archivos Generados" addBtn={() => {}} />

      <ScrollView style={styles.content_area}>
        {/* Mis archivos generados */}
        <CollapsibleSection title="Mis Archivos">
          {shuffleArray([0]).map((_, i) => (
            <View key={`my_file_${i}`} style={styles.file_block}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    width: "25%",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    name="file-present"
                    size={baseUnit * 0.08}
                    color={"#50653f"}
                  />
                </View>
                <View
                  style={{
                    width: "50%",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.file_block_title}>LALA - Don Sergio</Text>
                  <Text style={styles.file_block_date}>03/05/2026</Text>
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
                    size={baseUnit * 0.055}
                    color={"#50653f"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </CollapsibleSection>
        {/* Archivos de grupo generados */}
        <CollapsibleSection title="Archivos de Grupo">
          {shuffleArray([1, 2, 3]).map((_, i) => (
            <View key={`team_file_${i}`} style={styles.file_block}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    width: "25%",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    name="file-present"
                    size={baseUnit * 0.08}
                    color={"#50653f"}
                  />
                </View>
                <View
                  style={{
                    width: "50%",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.file_block_title}>LALA - Don Sergio</Text>
                  <Text style={styles.file_block_date}>03/05/2026</Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: "25%",
                    justifyContent: "center",
                    alignContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <MaterialIcons
                    name="more-vert"
                    size={baseUnit * 0.055}
                    color={"#50653f"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </CollapsibleSection>
        <View style={{ height: baseUnit * 0.25 }} />
      </ScrollView>
    </View>
  );
};

const getStyles = (dimensions: workSpaceDimensions) => {
  const { width, height } = dimensions;
  const baseUnit = Math.min(width, height);

  const styles = StyleSheet.create({
    container: {
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
      height: height * 0.13,
      width: "100%",
      backgroundColor: "#50653f",
      alignItems: "center",
      paddingTop: baseUnit * 0.14,
      paddingHorizontal: baseUnit * 0.015,
    },
    title_and_button_cont: {
      flexDirection: "row",
      width: "100%",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "space-between",
    },
    header_title: {
      fontFamily: "Audiowide_400Regular",
      fontSize: 26,
      color: "white",
    },
    header_buttons_cont: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
    header_button: {
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: baseUnit,
      backgroundColor: "white",
      padding: baseUnit * 0.01,
      marginRight: baseUnit * 0.02,
    },
    content_area: {
      width: "100%",
      padding: baseUnit * 0.046,
      overflow: "scroll",
    },
    blocks_and_title_cont: {},
    block_title_container: {
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      flexDirection: "row",
      borderBottomWidth: 2,
      borderBottomColor: "#64748B",
      padding: baseUnit * 0.012,
      width: width * 0.95,
    },
    block_title: {
      fontSize: 20,
      color: "#50653f",
      fontWeight: "bold",
    },
    blocks_container: {},
    file_block: {
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      alignItems: "flex-start",
      marginVertical: baseUnit * 0.023,
      padding: baseUnit * 0.033,
      paddingHorizontal: 0,
      height: baseUnit * 0.15,
      borderColor: "#00000037",
      borderWidth: baseUnit * 0.004,
      borderRadius: baseUnit * 0.023,
    },
    file_block_title: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      width: "95%",
      color: "#071943",
      fontWeight: "bold",
    },
    file_block_date: {
      display: "flex",
      justifyContent: "flex-end",
      color: "#64748B",
      bottom: 0,
    },
  });

  return { styles, baseUnit };
};

export default Files;

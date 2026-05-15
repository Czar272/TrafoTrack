import { workSpaceDimensions } from "@/constants/types";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useRouter } from "expo-router";

type JobDetailsProps = {
  plantsNtrafos: number[][];
};
const JobDetails: React.FC<JobDetailsProps> = ({
  plantsNtrafos = [[0, 1], [0, 1, 2], [0]],
}) => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { styles, baseUnit } = getStyles({ width, height });

  const NoPlantsArr = new Array(plantsNtrafos.length).fill(0).map((_, i) => i);
  const [showPlants, setShowPlants] = useState<boolean[]>(
    NoPlantsArr.map(() => true),
  );

  const toggleShowPlant = (index: number) => {
    setShowPlants((prev) => {
      const newShowPlants = [...prev];
      newShowPlants[index] = !newShowPlants[index];
      return newShowPlants;
    });
  };

  const goBack = () => router.back();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.title_and_button_cont}>
          <TouchableOpacity onPress={goBack}>
            <MaterialIcons
              name="arrow-back-ios"
              color={"white"}
              size={baseUnit * 0.05}
            />
          </TouchableOpacity>
          <Text style={styles.header_title}>LALA - Don Sergio</Text>
          <View style={styles.header_buttons_cont}>
            <TouchableOpacity style={styles.header_button}>
              <MaterialIcons
                name="add"
                size={baseUnit * 0.05}
                color={"#284325"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Area scrolleable */}
      <ScrollView style={styles.content_area}>
        {NoPlantsArr.map((plant, i) => (
          <View key={`title-${plant}`} style={styles.blocks_and_title_cont}>
            <View style={styles.block_title_container}>
              <TouchableOpacity
                onPress={() => toggleShowPlant(i)}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name={
                    showPlants[i] ? "keyboard-arrow-down" : "keyboard-arrow-up"
                  }
                  size={baseUnit * 0.05}
                  color={"#64748B"}
                />
                <Text style={styles.block_title}>Planta {i + 1}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.blocks_container}>
              {plantsNtrafos[i].map(
                (trafo, j) =>
                  showPlants[i] && (
                    <View
                      key={`Planta-${i}-trafo-${j}-`}
                      style={styles.trafo_block}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          style={{ flexDirection: "row", width: "75%" }}
                          onPress={() => router.push("/trafo-details")}
                        >
                          <View
                            style={{
                              width: "25%",
                              justifyContent: "center",
                              alignContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              width={baseUnit * 0.08}
                              height={baseUnit * 0.08}
                              source={require("../../assets/images/transformador (1).png")}
                              style={{
                                width: baseUnit * 0.08,
                                height: baseUnit * 0.08,
                                justifyContent: "center",
                                alignContent: "center",
                                alignItems: "center",
                                resizeMode: "contain",
                              }}
                              resizeMode="contain"
                            />
                          </View>
                          <View
                            style={{
                              width: "50%",
                              justifyContent: "center",
                            }}
                          >
                            <Text style={styles.trafo_block_title}>
                              Trafo {trafo + 1}
                            </Text>
                          </View>
                        </TouchableOpacity>
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
                  ),
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{ height: baseUnit * 0.25 }} />
    </View>
  );
};

const getStyles = (dimensions: workSpaceDimensions) => {
  const { width, height } = dimensions;
  const baseUnit = Math.min(width, height);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
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
    trafo_block: {
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
    trafo_block_title: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      width: "95%",
      color: "#071943",
      fontWeight: "bold",
    },
  });

  return { styles, baseUnit };
};

export default JobDetails;

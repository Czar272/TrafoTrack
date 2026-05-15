import Header from "@/components/common/header";
import { workSpaceDimensions } from "@/constants/types";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

type TrafoDetailsProps = {
  trafoId: number;
  plantId: number;
};

const TrafoDetails: React.FC<TrafoDetailsProps> = ({
  trafoId = 1,
  plantId = 2,
}) => {
  const { width, height } = useWindowDimensions();
  const { styles, baseUnit } = getStyles({ width, height });

  const [showTTR, setShowTTR] = useState<boolean>(true);
  const [showMicro, setShowMicro] = useState<boolean>(true);
  const [showMeg, setShowMeg] = useState<boolean>(true);

  const toggleShowTTR = () => setShowTTR((prev) => !prev);
  const toggleShowMicro = () => setShowMicro((prev) => !prev);
  const toggleShowMeg = () => setShowMeg((prev) => !prev);

  const handleTitlePress = (testType: string) => {
    switch (testType) {
      case "TTR":
        toggleShowTTR();
        break;
      case "Micrómetro":
        toggleShowMicro();
        break;
      case "Megómetro":
        toggleShowMeg();
        break;
      default:
        break;
    }
  };

  const arrowDirection = (test: string) => {
    switch (test) {
      case "TTR":
        return showTTR ? "keyboard-arrow-down" : "keyboard-arrow-up";
      case "Micrómetro":
        return showMicro ? "keyboard-arrow-down" : "keyboard-arrow-up";
      case "Megómetro":
        return showMeg ? "keyboard-arrow-down" : "keyboard-arrow-up";
      default:
        return "keyboard-arrow-down";
    }
  };

  const tests = ["TTR", "Micrómetro", "Megómetro"];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title={`Planta ${plantId} - Trafo ${trafoId}`}
        GoBackBtn
        addBtn={() => {}}
      />

      {/* Content Area */}
      <ScrollView style={styles.content_area}>
        {tests.map((test, i) => (
          <View key={`test-${test}-${i}`}>
            <View style={styles.block_title_container}>
              <TouchableOpacity
                onPress={() => handleTitlePress(test)}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name={arrowDirection(test)}
                  size={baseUnit * 0.05}
                  color={"#64748B"}
                />
                <Text style={styles.block_title}>{test}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  });

  return { styles, baseUnit };
};

export default TrafoDetails;

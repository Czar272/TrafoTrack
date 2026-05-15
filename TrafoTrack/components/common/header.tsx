import { workSpaceDimensions } from "@/constants/types";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

type HeaderProps = {
  title: string;
  GoBackBtn?: boolean;
  addBtn?: () => void;
  searchBtn?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  GoBackBtn,
  title = "Header",
  addBtn,
  searchBtn,
}) => {
  const router = useRouter();

  const goBack = () => router.back();

  const { width, height } = useWindowDimensions();
  const { styles, baseUnit } = getStyles({ width, height });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.title_and_button_cont}>
          {GoBackBtn ? (
            <TouchableOpacity
              onPress={goBack}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="arrow-back-ios"
                color={"white"}
                size={baseUnit * 0.05}
              />
              <Text style={styles.header_title}>{title}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.header_title}>{title}</Text>
          )}
          {(addBtn || searchBtn) && (
            <View style={styles.header_buttons_cont}>
              {addBtn && (
                <TouchableOpacity onPress={addBtn} style={styles.header_button}>
                  <MaterialIcons
                    name="add"
                    size={baseUnit * 0.057}
                    color={"#284325"}
                  />
                </TouchableOpacity>
              )}
              {searchBtn && (
                <TouchableOpacity
                  onPress={searchBtn}
                  style={styles.header_button}
                >
                  <MaterialIcons
                    name="search"
                    size={baseUnit * 0.057}
                    color={"#284325"}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
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
      alignSelf: "flex-end",
      right: 0,
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
  });

  return { styles, baseUnit };
};

export default Header;

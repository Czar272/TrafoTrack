import { workSpaceDimensions } from "@/constants/types";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";

type CollapsibleSectionProps = {
  title: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  style,
}) => {
  const { width, height } = useWindowDimensions();
  const { styles, baseUnit } = getStyles({ width, height });

  const [visible, setVisible] = useState<boolean>(true);

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  return (
    <View style={[styles.blocks_and_title_cont, style]}>
      <View style={styles.block_title_container}>
        <TouchableOpacity onPress={toggleVisibility} style={styles.touchable}>
          <MaterialIcons
            name={visible ? "keyboard-arrow-down" : "keyboard-arrow-up"}
            size={baseUnit * 0.06}
            color={"#64748B"}
          />
          <Text style={styles.block_title}>{title}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.block_container}>{visible && children}</View>
    </View>
  );
};

const getStyles = (dimensions: workSpaceDimensions) => {
  const { width, height } = dimensions;
  const baseUnit = Math.min(width, height);

  const styles = StyleSheet.create({
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
    touchable: {
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
    block_container: {},
  });

  return { styles, baseUnit };
};

export default CollapsibleSection;

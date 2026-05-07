import { workSpaceDimensions } from "@/constants/types";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  useWindowDimensions,
  ViewStyle,
} from "react-native";

type BasicButtonTypes = {
  title?: string;
  variant: "primary" | "secundary";
  onPress?: () => void;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
};

const BasicButton: React.FC<BasicButtonTypes> = ({
  title = "Press",
  containerStyles,
  textStyles,
  variant,
  onPress,
}) => {
  const { width, height } = useWindowDimensions();
  const { styles } = getStyles({ width, height });

  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isPrimary ? styles.primaryCont : styles.secondCont,
        containerStyles,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.textStyle,
          isPrimary ? styles.primaryTextSTyle : styles.secundTextSTyle,
          textStyles,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
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
      borderRadius: baseUnit * 0.05,
      width: baseUnit * 0.3,
      height: baseUnit * 0.13,
    },
    primaryCont: {
      backgroundColor: "#284325",
    },
    secondCont: {
      borderWidth: baseUnit * 0.005,
      borderColor: "#284325",
    },
    textStyle: {
      fontWeight: "bold",
      fontSize: baseUnit * 0.035,
    },
    primaryTextSTyle: {
      color: "white",
    },
    secundTextSTyle: {
      color: "#284325",
    },
  });

  return { styles, baseUnit };
};

export default BasicButton;

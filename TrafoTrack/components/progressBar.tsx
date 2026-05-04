import { View } from "react-native";

/**
 * Componente ProgressBar
 *
 * Props:
 * - progress: número entre 0 y 1 (ej: 0.5 = 50%)
 *
 * Este componente crea una barra visual usando dos Views:
 * - fondo (gris)
 * - progreso (color)
 */

type ProgressBarProps = {
  progress: number; // 0 - 1
  color: string;
};
const ProgressBar = ({ progress, color }: ProgressBarProps) => {
  return (
    <View
      style={{
        height: 10,
        width: "100%",
        backgroundColor: "#e0e0e0", // fondo gris
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          backgroundColor: color,
        }}
      />
    </View>
  );
};

export default ProgressBar;

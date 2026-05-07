import { workSpaceDimensions } from "@/constants/types";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function CreateJob() {
  const { width, height } = useWindowDimensions();
  const { styles, baseUnit } = getStyles({ width, height });

  const router = useRouter();

  const [showClientInfo, setShowClientInfo] = useState<boolean>(true);
  const [showTeaminfo, setShowTeamInfo] = useState<boolean>(true);
  const [showJobInfo, setShowJobInfo] = useState<boolean>(true);

  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [newMember, setNewMember] = useState<string>("");

  const handleAddMember = () => {
    if (!newMember.trim()) return;

    setTeamMembers((prev) => [...prev, newMember.trim()]);
    setNewMember("");
  };

  const handleDeleteMember = (i: number) => {
    setTeamMembers((prev) => prev.filter((_, index) => index !== i));
  };

  const toggleShowClientInfo = () => {
    setShowClientInfo((prev) => !prev);
  };

  const toggleShowTeamInfo = () => {
    setShowTeamInfo((prev) => !prev);
  };

  const toggleShowJobInfo = () => {
    setShowJobInfo((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.title_and_button_cont}>
          <TouchableOpacity onPress={() => router.push("/")}>
            <MaterialIcons name="arrow-back-ios" color={"white"} size={24} />
          </TouchableOpacity>
          <Text style={styles.header_title}>Crear Trabajo</Text>
        </View>
      </View>

      {/* Lista a Llenar */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Campos de informacion del cliente */}
        <View style={styles.subtitle_and_fields_cont}>
          {/* Titulo */}
          <TouchableOpacity
            onPress={toggleShowClientInfo}
            style={styles.subtitle_desplegable_cont}
          >
            <MaterialIcons
              name={
                showClientInfo ? "keyboard-arrow-down" : "keyboard-arrow-up"
              }
              size={24}
              color={"#64748B"}
            />
            <Text style={styles.subtitle_text}>Informacion del cliente</Text>
          </TouchableOpacity>
          {/* Forms to fill */}
          {showClientInfo && (
            <View style={styles.form_container}>
              <View style={styles.form_field_cont}>
                <Text style={styles.form_field_name}>Cliente:</Text>
                <TextInput style={styles.form_field_input} />
              </View>
              <View style={styles.form_field_cont}>
                <Text style={styles.form_field_name}>Ubicacion:</Text>
                <TextInput style={styles.form_field_input} />
              </View>
              <View style={styles.form_field_cont}>
                <Text style={styles.form_field_name}>Fecha:</Text>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <TextInput
                    editable={false}
                    style={styles.form_field_input}
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor={"#284325"}
                  />
                  <MaterialIcons
                    name="calendar-month"
                    style={{ position: "absolute", right: width * 0.01 }}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        {/* Campos de informacion del equipo */}
        <View style={styles.subtitle_and_fields_cont}>
          {/* Titulo */}
          <TouchableOpacity
            onPress={toggleShowTeamInfo}
            style={styles.subtitle_desplegable_cont}
          >
            <MaterialIcons
              name={showTeaminfo ? "keyboard-arrow-down" : "keyboard-arrow-up"}
              size={24}
              color={"#64748B"}
            />
            <Text style={styles.subtitle_text}>Informacion del equipo</Text>
          </TouchableOpacity>
          {/* Forms to fill */}
          {showTeaminfo && (
            <View style={styles.form_container}>
              <View style={styles.form_field_cont}>
                <Text style={styles.form_field_name}>Equipo:</Text>
                <TextInput style={styles.form_field_input} />
              </View>
              <View style={styles.form_field_cont}>
                <Text style={styles.form_field_name}>Jefe de equipo:</Text>
                <TextInput style={styles.form_field_input} />
              </View>
              <View style={styles.form_field_cont}>
                <Text style={styles.form_field_name}>Integrantes:</Text>
                <View
                  style={{
                    gap: baseUnit * 0.05,
                  }}
                >
                  {teamMembers.map((member, i) => (
                    <View
                      key={`member-${i}`}
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: baseUnit * 0.03,
                      }}
                    >
                      <Text style={styles.form_field_name}>{member}</Text>
                      <TouchableOpacity onPress={() => handleDeleteMember(i)}>
                        <MaterialIcons
                          name="delete"
                          size={24}
                          color={"#a93723"}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      gap: baseUnit * 0.03,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderRadius: "100%",
                        backgroundColor: "#284325",
                      }}
                      onPress={handleAddMember}
                    >
                      <MaterialIcons name="add" color={"white"} size={24} />
                    </TouchableOpacity>
                    <TextInput
                      value={newMember}
                      onChangeText={setNewMember}
                      placeholder="Agregar Integrante"
                      placeholderTextColor={"#284325"}
                      style={[styles.form_field_input, { width: width * 0.4 }]}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
        {/* Campos de informacion del trabajo */}
        <View style={styles.subtitle_and_fields_cont}>
          {/* Titulo */}
          <TouchableOpacity
            onPress={toggleShowJobInfo}
            style={styles.subtitle_desplegable_cont}
          >
            <MaterialIcons
              name={showJobInfo ? "keyboard-arrow-down" : "keyboard-arrow-up"}
              size={24}
              color={"#64748B"}
            />
            <Text style={styles.subtitle_text}>Informacion del trabajo</Text>
          </TouchableOpacity>
          {/* Forms to Fill */}
          {showJobInfo && (
            <View style={styles.form_container}>
              <View style={styles.form_field_cont}>
                <Text style={styles.form_field_name}>No. de trafos:</Text>
                <TextInput
                  style={styles.form_field_input}
                  keyboardType="number-pad"
                  placeholder="Ingresa un numero"
                  placeholderTextColor={"#284325"}
                />
              </View>
              <View style={styles.form_field_cont}>
                <Text style={styles.form_field_name}>No. de plantas:</Text>
                <TextInput
                  style={styles.form_field_input}
                  keyboardType="number-pad"
                  placeholder="Ingresa un numero"
                  placeholderTextColor={"#284325"}
                />
              </View>
              <View style={styles.form_field_cont}>
                <Text style={styles.form_field_name}>Procedimiento:</Text>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <View style={styles.form_field_input} />
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={24}
                    color={"#284325"}
                    style={{
                      position: "absolute",
                      right: width * 0.01,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View style={{ height: height * 0.09 }} />
      </ScrollView>
    </View>
  );
}

const getStyles = (dimensions: workSpaceDimensions) => {
  const { width, height } = dimensions;
  const baseUnit = Math.min(width, height);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      width: "100%",
      height: "100%",
      justifyContent: "flex-start",
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
      justifyContent: "flex-start",
    },
    content: {
      width: width,
      padding: baseUnit * 0.05,
    },
    contentContainer: {
      gap: baseUnit * 0.05,
    },
    subtitle_desplegable_cont: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignContent: "center",
      alignItems: "center",
      borderBottomWidth: 2,
      borderBottomColor: "#64748B",
      width: "100%",
    },
    subtitle_text: {
      fontSize: 20,
      color: "#50653f",
      fontWeight: "bold",
    },
    subtitle_and_fields_cont: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: baseUnit * 0.03,
      width: "100%",
    },
    form_container: {
      width: "100%",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
    form_field_cont: {
      width: "95%",
      flexDirection: "row",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "space-between",
      borderBottomWidth: baseUnit * 0.004,
      padding: baseUnit * 0.03,
      borderBottomColor: "#64748b80",
    },
    form_field_name: {},
    form_field_input: {
      height: height * 0.04,
      width: width * 0.5,
      borderRadius: baseUnit * 0.01,
      borderWidth: baseUnit * 0.003,
      borderColor: "#284325",
      textAlign: "center",
    },
    form_integrants_cont: {},
    form_integrant: {},
  });

  return { styles, baseUnit };
};

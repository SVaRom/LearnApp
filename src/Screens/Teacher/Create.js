import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Button, Pressable } from "react-native";
import { useToast } from "native-base";
import { Input } from "@rneui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import firebase, { auth } from "../../../database/firebase";

const CreateAsesoriaScreen = ({ navigation, route }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("");
  const [textT, setTextT] = useState("HH:MM");
  const [textD, setTextD] = useState("DD/MM/YYYY");
  const [show, setShow] = useState(false);
  const toast = useToast();

  const [state, setState] = useState({
    subject: "",
    assessor: "",
    room: "",
    cdate: "",
    ctime: "",
    nameTeacher: route.params.name,
    numTeacher: route.params.number,
  });
  const handleChangeText = (subject, value) => {
    setState({ ...state, [subject]: value });
  };

  const SaveNewClass = async () => {
    //! await porque es asincrono y debemos usar async porque es sincronizable a datos nota: podemos agregar un loader
    if (
      state.subject === "" ||
      state.assessor === "" ||
      state.room === "" ||
      state.date === "" ||
      state.time === ""
    ) {
      alert("Please fill all fields");
    } else {
      try {
        await firebase.db.collection("asesorias").add({
          subject: state.subject,
          assessor: state.assessor,
          room: state.room,
          date: textD,
          time: textT,
          numTeacher: state.numTeacher,
          nameTeacher: state.nameTeacher,
        });
        toast.show({
          description: "You added a class",
          placement: "top",
        });
        navigation.goBack();
      } catch (error) {
        alert("Something went wrong, please try again later.");
      }
    }
  };

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      "-" +
      addZero(tempDate.getMonth() + 1) +
      "-" +
      addZero(tempDate.getDate());

    let fTime =
      addZero(tempDate.getHours()) + ":" + addZero(tempDate.getMinutes());

    if (mode === "date") {
      handleChangeText("cdate", fDate);
      setTextD(fDate);
    } else {
      handleChangeText("ctime", fTime);
      setTextT(fTime);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <Input
          label="Assignment"
          placeholder="Assignment"
          onChangeText={(value) => handleChangeText("subject", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Input
          label="Assessor"
          placeholder="Assessor"
          onChangeText={(value) => handleChangeText("assessor", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Input
          label="Classroom"
          placeholder="Classroom"
          onChangeText={(value) => handleChangeText("room", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Pressable onPress={() => showMode("date")}>
          <Input disabled="true" label="Date" placeholder={textD} />
        </Pressable>
      </View>
      <View style={styles.inputGroup}>
        <Pressable onPress={() => showMode("time")}>
          <Input disabled="true" label="Time" placeholder={textT} />
        </Pressable>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <View style={styles.inputGroup}>
        <Button title="Add group" onPress={SaveNewClass} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default CreateAsesoriaScreen;

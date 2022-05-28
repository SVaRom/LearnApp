import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Pressable,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { Input } from "@rneui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import firebase from "../../../database/firebase";

const DetailsScreen = ({ navigation, route }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [textT, setTextT] = useState();
  const [textD, setTextD] = useState();
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
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

    mode === "date" ? setTextD(fDate) : setTextT(fTime);
  };

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const initialState = {
    id: "",
    subject: "",
    assessor: "",
    room: "",
    date: "",
    time: "",
  };
  const [advisor, setAdvisor] = useState(initialState);
  const [advisorH, setAdvisorH] = useState(initialState);

  const getClassById = async (advisorid) => {
    const dbRef = firebase.db.collection("asesorias").doc(advisorid);
    const doc = await dbRef.get();
    const advisor = doc.data();
    setAdvisor({ ...advisor, id: doc.id });
    let tempD = advisor.date;
    let tempT = advisor.time;
    setTextD(tempD);
    setTextT(tempT);
  };
  useEffect(() => {
    let abortController = new AbortController();
    getClassById(route.params.id);
    abortController.abort();
  }, []);

  const handleChangeText = (subject, value) => {
    setAdvisorH({ ...advisorH, [subject]: value });
  };

  const updateClass = async () => {
    let abortController = new AbortController();

    if (advisorH.subject === "") advisorH.subject = advisor.subject;
    if (advisorH.assessor === "") advisorH.assessor = advisor.assessor;
    if (advisorH.room === "") advisorH.room = advisor.room;
    const dbRef = firebase.db.collection("asesorias").doc(advisor.id);
    await dbRef.update({
      subject: advisorH.subject,
      assessor: advisorH.assessor,
      room: advisorH.room,
      date: textD,
      time: textT,
    });
    setAdvisorH(initialState);
    console.log(advisor);
    abortController.abort();
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text></Text>
      <View style={styles.inputGroup}>
        <Input
          label="Assignment"
          placeholder={advisor.subject}
          onChangeText={(value) => handleChangeText("subject", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Input
          label="Assessor"
          placeholder={advisor.assessor}
          onChangeText={(value) => handleChangeText("assessor", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Input
          label="Classroom"
          placeholder={advisor.room}
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
          onChange={onChangeDate}
        />
      )}
      <View style={styles.inputGroup}>
        <Button title="Save Changes" onPress={updateClass} />
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

export default DetailsScreen;

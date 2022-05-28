import React, { useState, useEffect } from "react";
import {
  NativeBaseProvider,
  View,
  Modal,
  FormControl,
  Button,
  ScrollView,
} from "native-base";
import { ListItem, Avatar } from "@rneui/themed";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Icon from "react-native-vector-icons/AntDesign";
import firebase from "../../../database/firebase";

const CalendarS = ({ navigation, data }) => {
  const [showModal, setShowModal] = useState(false);
  const [formDate, setFormDate] = useState("");
  const [datesC, setDatesC] = useState({});

  const nTeacher = data.number;

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  useEffect(() => {
    let abortController = new AbortController();
    firebase.db
      .collection("asesorias")
      .where("numTeacher", "==", nTeacher)
      .onSnapshot((querySnapshot) => {
        const datesC = {};
        querySnapshot.docs.forEach((doc) => {
          const { color, date } = doc.data();
          const id = doc.id;
          datesC[date] = {
            marked: true,
            selectedColor: getRandomColor(),
            selected: true,
          };
        });
        setDatesC(datesC);
      });
    abortController.abort();
  }, []);

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1 }} on>
        <Calendar
          renderArrow={(direction) =>
            direction === "left" ? (
              <Icon name="left" size={26} />
            ) : (
              <Icon name="right" size={26} />
            )
          }
          markedDates={datesC}
          onDayPress={(day) => {
            let fDate =
              addZero(day.month) + "/" + addZero(day.day) + "/" + day.year;
            setFormDate(fDate);
            setShowModal(true);
            navigation.navigate("DayDetails", {
              selectDay: day.dateString,
              number: data.number,
            });
          }}
          markingType={"multi-dot"}
          monthFormat={"MMMM yyyy"}
        />
      </View>
    </NativeBaseProvider>
  );
};
export default CalendarS;

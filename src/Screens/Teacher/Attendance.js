import React, { useState, useEffect } from "react";
import { NativeBaseProvider, ScrollView } from "native-base";
import firebase from "../../../database/firebase";
import { ListItem, Avatar } from "@rneui/themed";
import { Button, FAB } from "@rneui/base";
import { Pressable } from "react-native";
const Attendance = ({ navigation, route }) => {
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    let abortController = new AbortController();
    firebase.db
      .collection("asesorias-student")
      .where("numStudent", "==", route.params.data)
      .where("numTeacher", "==", route.params.numT)
      .onSnapshot((querySnapshot) => {
        const classes = [];
        querySnapshot.docs.forEach((doc) => {
          const { subject, assessor, date, time, status, room, nameStudent } =
            doc.data();
          const id = doc.id;
          classes.push({
            id: id,
            subject: subject,
            assessor: assessor,
            date: date,
            time: time,
            status: status,
            room: room,
            nameStudent: nameStudent,
          });
        });
        setClasses(classes);
      });
    abortController.abort();
  }, []);

  const handleAttendace = (selectedItem) => {
    if (selectedItem.status) {
      selectedItem.status = "true";
      selectedItem.avatarUrl =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Yes_Check_Circle.svg/1200px-Yes_Check_Circle.svg.png";
    } else {
      selectedItem.status = "false";
      selectedItem.avatarUrl =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx062PdX4FMGEDi9dpGfcYZdnzVeeLFahEsQ&usqp=CAU";
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        {classes.map((advisory) => {
          return (
            <ListItem
              key={advisory.id}
              bottomDivider
              onPress={() => handleAttendace(advisory)}
            >
              <Avatar size={64} rounded />
              <ListItem.Content>
                <ListItem.Title>{advisory.subject}</ListItem.Title>
                <ListItem.Subtitle>
                  Date & Time: {advisory.time} - {advisory.date}
                </ListItem.Subtitle>
                <ListItem.Subtitle>
                  Classroom: {advisory.room}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Attendance;

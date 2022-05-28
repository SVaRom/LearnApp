import React, { useState, useEffect } from "react";
import { NativeBaseProvider, ScrollView } from "native-base";
import firebase from "../../../database/firebase";
import { ListItem, Avatar } from "@rneui/themed";
import { Button, FAB } from "@rneui/base";
import { Pressable } from "react-native";
const Attendance = ({ navigation, route }) => {
  let nctrlst = route.params.data;
  console.log(nctrlst);

  const [classes, setClasses] = useState([]);
  useEffect(() => {
    let abortController = new AbortController();
    firebase.db
      .collection("curso-student")
      .where("idStudent", "==", nctrlst)
      .onSnapshot((querySnapshot) => {
        const classes = [];
        querySnapshot.docs.forEach((doc) => {
          const { materia, profesor, fecha, hora, status } = doc.data();
          const id = doc.id;
          classes.push({
            id: id,
            materia: materia,
            profesor: profesor,
            fecha: fecha,
            hora: hora,
            status: status,
          });
        });
        setClasses(classes);
      });
    abortController.abort();
  }, []);

  const handleAttendace = (selectedItem) => {
    if (advisory.status) {
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
            <Pressable onPress={() => handleAttendace()}>
              <ListItem key={advisory.id} bottomDivider>
                <Avatar size={64} rounded />
                <ListItem.Content>
                  <ListItem.Title>{advisory.subject}</ListItem.Title>
                  <ListItem.Subtitle>
                    Date & Time: {advisory.hora}, {advisory.fecha}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    Classroom: {advisory.room}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </Pressable>
          );
        })}
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Attendance;

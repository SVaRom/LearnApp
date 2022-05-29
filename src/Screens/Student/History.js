import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import firebase from "../../../database/firebase";
import { ListItem, Avatar } from "@rneui/themed";
import { Box, Divider, HStack } from "native-base";
const History = ({ navigation, data }) => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();
    let today = new Date();
    let todayH = "";
    for (let i = 0; i < 10; i++) todayH += today.toISOString().charAt(i);
    firebase.db
      .collection("asesorias-student")
      .where("numStudent", "==", data.number)
      .onSnapshot((querySnapshot) => {
        const cursos = [];
        querySnapshot.docs.forEach((doc) => {
          const { subject, nameTeacher, time, state, date } = doc.data();
          const actualDate = new Date(todayH);
          const dateReference = new Date(date);
          const id = doc.id;
          let aux, icon;
          if (state === "true") {
            aux = "#209f19";
            icon = "account-check";
          } else if (state === "false" || dateReference < actualDate + 1) {
            aux = "#9e1b21";
            icon = "account-cancel";
          } else {
            aux = "#a1adb9";
            icon = "account-clock";
          }
          cursos.push({
            id: id,
            subject: subject,
            nameTeacher: nameTeacher,
            date: date,
            state: aux,
            time: time,
            icon: icon,
          });
        });

        setCursos(cursos);
      });
    return () => abortController.abort();
  }, []);
  return (
    <View>
      <Box bg="#FDFDFE">
        <Text style={styles.title}>Attendance</Text>
      </Box>
      <Divider />
      <ScrollView>
        {cursos.map((curso) => {
          return (
            <ListItem key={curso.id} bottomDivider>
              <ListItem.Chevron />
              <Avatar
                size={64}
                rounded
                icon={{ name: curso.icon }}
                containerStyle={{ backgroundColor: curso.state }}
              />
              <ListItem.Content>
                <ListItem.Title>{curso.subject}</ListItem.Title>
                <ListItem.Subtitle>
                  Date & Time: {curso.time}, {curso.date}
                </ListItem.Subtitle>
                <ListItem.Subtitle>
                  Proffessor: {curso.nameTeacher}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  title: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 25,
    backgroundColor: "#FDFDFE",
  },
  textAlign: {
    textAlign: "left",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default History;

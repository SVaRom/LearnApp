import React, { useEffect, useState } from "react";
import { NativeBaseProvider, ScrollView, Heading } from "native-base";
import firebase from "../../../database/firebase";
import { ListItem, Avatar } from "@rneui/themed";

const DayDetails = ({ navigation, route }) => {
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const [classes, setClasses] = useState([]);
  useEffect(() => {
    let abortController = new AbortController();
    firebase.db
      .collection("asesorias")
      .where("numTeacher", "==", route.params.number)
      .where("date", "==", route.params.selectDay)
      .onSnapshot((querySnapshot) => {
        const classes = [];
        querySnapshot.docs.forEach((doc) => {
          const { subject, assessor, date, time, room } = doc.data();
          const id = doc.id;
          classes.push({
            id: id,
            subject: subject,
            assessor: assessor,
            date: date,
            time: time,
            room: room,
          });
        });
        setClasses(classes);
      });
    return () => abortController.abort();
  }, []);
  return (
    <NativeBaseProvider>
      <ScrollView>
        <Heading>Classes for {route.params.selectDay}</Heading>
        {classes.map((advisory) => {
          return (
            <ListItem key={advisory.id} bottomDivider>
              <Avatar
                size={64}
                rounded
                title={advisory.subject.charAt(0)}
                containerStyle={{ backgroundColor: getRandomColor() }}
              />
              <ListItem.Content>
                <ListItem.Title>{advisory.subject}</ListItem.Title>
                <ListItem.Subtitle>
                  Date & Time: {advisory.time}, {advisory.date}
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
export default DayDetails;

import React, { useEffect, useState } from "react";
import { NativeBaseProvider, ScrollView } from "native-base";
import firebase from "../../../database/firebase";
import { ListItem, Avatar } from "@rneui/themed";
import { Button, FAB } from "@rneui/base";

const Home = ({ navigation, data }) => {
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const tMail = data.email;
  console.log(tMail);

  const [classes, setClasses] = useState([]);
  useEffect(() => {
    let abortController = new AbortController();
    firebase.db
      .collection("asesorias")
      .where("teacherMail", "==", tMail)
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
    abortController.abort();
  }, []);
  return (
    <NativeBaseProvider>
      <ScrollView>
        {classes.map((advisory) => {
          return (
            <ListItem.Swipeable
              key={advisory.id}
              bottomDivider
              leftContent={(reset) => (
                <Button
                  title="Edit"
                  onPress={() => {
                    navigation.navigate("Details", { advisoryID: advisory.id });
                  }}
                  icon={{ name: "edit", color: "white" }}
                  buttonStyle={{ minHeight: "100%" }}
                />
              )}
              rightContent={(reset) => (
                <Button
                  title="Delete"
                  onPress={() => {
                    firebase.db
                      .collection("asesorias")
                      .doc(advisory.id)
                      .delete();
                  }}
                  icon={{ name: "delete", color: "white" }}
                  buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
                />
              )}
            >
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
            </ListItem.Swipeable>
          );
        })}
      </ScrollView>
      <FAB
        style={{ margin: 15 }}
        placement="right"
        color="#03A9F4"
        icon={{ name: "add", color: "#fff" }}
        onPress={() => navigation.navigate("Create", { email: data.email })}
      />
    </NativeBaseProvider>
  );
};
export default Home;

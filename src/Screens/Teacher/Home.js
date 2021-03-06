import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  ScrollView,
  Box,
  Text,
  Divider,
} from "native-base";
import { StyleSheet } from "react-native";
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
  const nTeacher = data.number;

  const [classes, setClasses] = useState([]);
  useEffect(() => {
    let abortController = new AbortController();
    let isMounted = true;
    setClasses([]);
    firebase.db
      .collection("asesorias")
      .where("numTeacher", "==", nTeacher)
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
        if (isMounted) setClasses(classes);
      });
    return () => {
      abortController.abort();
      isMounted = false;
    };
  }, []);

  const handleDelete = (item) => {
    firebase.db.collection("asesorias").doc(item.id).delete();
    firebase.db
      .collection("asesorias-student")
      .where("numTeacher", "==", data.number)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          firebase.db.collection("asesorias-student").doc(doc.id).delete();
        });
      });
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Box bg="#FDFDFE">
          <Text style={styles.title}>Classes offered</Text>
        </Box>
        <Divider />
        {classes.map((advisory) => {
          return (
            <ListItem.Swipeable
              key={advisory.id}
              bottomDivider
              leftContent={(reset) => (
                <Button
                  title="Edit"
                  onPress={() => {
                    navigation.navigate("Details", {
                      id: advisory.id,
                      number: data.number,
                      name: data.name,
                    });
                  }}
                  icon={{ name: "edit", color: "white" }}
                  buttonStyle={{ minHeight: "100%" }}
                />
              )}
              rightContent={(reset) => (
                <Button
                  title="Delete"
                  onPress={() => {
                    handleDelete(advisory);
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
        onPress={() =>
          navigation.navigate("Create", {
            number: data.number,
            name: data.name,
          })
        }
      />
    </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
  title: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 25,
    backgroundColor: "#FDFDFE",
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
export default Home;

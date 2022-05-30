import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  Modal,
  StyleSheet,
} from "react-native";
import firebase from "../../../database/firebase";
import { ListItem, Avatar, CheckBox } from "@rneui/themed";
import { Box, Divider, HStack } from "native-base";
const Attendance = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [check1, setCheck1] = useState(false);
  const expandModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  const closeModal = () => {
    setSelectedItem("");
    setModalVisible(false);
  };

  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();
    let isMounted = true;
    let today = new Date();
    firebase.db
      .collection("asesorias-student")
      .where("numStudent", "==", route.params.numS)
      .onSnapshot((querySnapshot) => {
        const cursos = [];
        querySnapshot.docs.forEach((doc) => {
          const {
            subject,
            nameStudent,
            time,
            state,
            date,
            numTeacher,
            assessor,
          } = doc.data();
          const actualDate = new Date(today);
          actualDate.setDate(actualDate.getDate() - 1);
          const dateReference = new Date(date);
          const id = doc.id;
          let aux, icon, bool;
          if (state === "true") {
            aux = "#209f19";
            icon = "account-check";
            bool = true;
          } else if (state === "false" || dateReference < actualDate) {
            aux = "#9e1b21";
            icon = "account-cancel";
            bool = true;
          } else {
            aux = "#a1adb9";
            icon = "account-clock";
            bool = false;
          }
          if (numTeacher === route.params.numT) {
            cursos.push({
              id: id,
              subject: subject,
              nameStudent: nameStudent,
              date: date,
              state: aux,
              time: time,
              icon: icon,
              bool: bool,
              assessor: assessor,
            });
          }
        });
        if (isMounted) setCursos(cursos);
      });
    return () => {
      abortController.abort();
      isMounted = false;
    };
  }, []);
  const handleAttendance = async (id) => {
    const dbRef = firebase.db.collection("asesorias-student").doc(id);
    await dbRef.update({
      state: "" + !check1,
    });
  };
  return (
    <View>
      <Box bg="#FDFDFE">
        <Text style={styles.title}> Attendance</Text>
      </Box>
      <Divider />
      <ScrollView>
        {cursos.map((curso) => {
          return (
            <ListItem
              disabled={curso.bool}
              key={curso.id}
              onPress={() => {
                expandModal(curso);
              }}
              bottomDivider
            >
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
                  Assessor: {curso.assessor}
                </ListItem.Subtitle>
              </ListItem.Content>
              <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.textAlign}>Curso </Text>
                    <Text>Subject: {selectedItem.subject}</Text>
                    <Text>Time: {selectedItem.time}</Text>
                    <CheckBox
                      center
                      title="Assist?"
                      checked={check1}
                      onPress={() => {
                        setCheck1(!check1);
                        handleAttendance(selectedItem.id);
                      }}
                    />
                    <HStack space={3} justifyContent="center" margin={5}>
                      <Button
                        title="Cerrar"
                        onPress={() => {
                          closeModal();
                          setCheck1(!check1);
                        }}
                      />
                    </HStack>
                  </View>
                </View>
              </Modal>
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
export default Attendance;

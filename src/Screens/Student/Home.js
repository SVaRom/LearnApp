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
import { Box, Divider, HStack, useToast } from "native-base";
import { ListItem, Avatar } from "@rneui/themed";

const Home = ({ navigation, data }) => {
  const toast = useToast();
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const expandModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  const closeModal = () => {
    setSelectedItem("");
    setModalVisible(false);
  };
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();
    let isMounted = true;
    setOfertas([]);
    firebase.db.collection("asesorias").onSnapshot((querySnapshot) => {
      const ofertas = [];
      querySnapshot.docs.forEach((doc) => {
        const { assessor, date, nameTeacher, numTeacher, time, room, subject } =
          doc.data();
        const id = doc.id;
        ofertas.push({
          id: id,
          subject: subject,
          assessor: assessor,
          time: time,
          room: room,
          date: date,
          numTeacher: numTeacher,
          nameTeacher: nameTeacher,
        });
      });
      setOfertas(ofertas);
    });
    return () => {
      abortController.abort();
      isMounted = false;
    };
  }, []);

  const handleJoin = async (item) => {
    try {
      await firebase.db.collection("asesorias-student").add({
        subject: item.subject,
        assessor: item.assessor,
        room: item.room,
        date: item.date,
        time: item.time,
        numTeacher: item.numTeacher,
        nameTeacher: item.nameTeacher,
        numStudent: data.number,
        nameStudent: data.name,
        state: "",
      });
      toast.show({
        description: "You've joined the class!",
        placement: "top",
      });
    } catch (error) {
      alert("Something went wrong, please try again later.");
    }
  };

  return (
    <View>
      <Box bg="#FDFDFE">
        <Text style={styles.title}>Classes offered</Text>
      </Box>
      <Divider />
      <ScrollView>
        {ofertas.map((oferta) => {
          return (
            <ListItem
              key={oferta.id}
              onPress={() => {
                expandModal(oferta);
              }}
              bottomDivider
            >
              <ListItem.Chevron />
              <Avatar
                size={64}
                rounded
                title={oferta.subject.charAt(0)}
                containerStyle={{ backgroundColor: getRandomColor() }}
              />
              <ListItem.Content>
                <ListItem.Title>{oferta.subject}</ListItem.Title>
                <ListItem.Subtitle>
                  Date & Time: {oferta.time}, {oferta.date}
                </ListItem.Subtitle>
                <ListItem.Subtitle>
                  Proffessor: {oferta.nameTeacher}
                </ListItem.Subtitle>
                <ListItem.Subtitle> Classroom: {oferta.room}</ListItem.Subtitle>
              </ListItem.Content>
              <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.title}>Offer!</Text>
                    <Text>Date: {selectedItem.date}</Text>
                    <Text>Subject: {selectedItem.subject}</Text>
                    <Text>Assessor: {selectedItem.assessor}</Text>
                    <Text>Time: {selectedItem.time}</Text>
                    <Text>Classroom: {selectedItem.room}</Text>
                    <HStack space={3} justifyContent="center" margin={5}>
                      <Button
                        title="Join"
                        onPress={() => {
                          handleJoin(selectedItem);
                          closeModal();
                        }}
                      />
                      <Button
                        title="Close"
                        onPress={() => {
                          closeModal();
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

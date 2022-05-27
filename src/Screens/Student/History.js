import React, { useEffect, useState } from "react";
import { 
  View,
  Text,
  ScrollView,
  Button,
  Modal,
  Alert,
  StyleSheet, } from "react-native";
import firebase from "../../../database/firebase";
import { ListItem, Avatar } from "@rneui/themed";
const History = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const expandModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
    console.log(item);
  };
  const closeModal = () => {
    setSelectedItem("");
    setModalVisible(false);
  };

const [cursos, setCursos] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();
    firebase.db.collection("curso-student").onSnapshot((querySnapshot) => {
      const cursos = [];
      querySnapshot.docs.forEach((doc) => {
        console.log("aki");
        const { materia, profesor, hora, status } = doc.data();
        console.log(doc.data());
        const id = doc.id;
        cursos.push({
          id: id,
          materia: materia,
          profesor: profesor,
          hora: hora,
          status: status,
        });
      });
      setCursos(cursos);
    });
    abortController.abort();
  }, []);
  return (
    <ScrollView>
    {cursos.map((curso) => {
        return (
          <ListItem key={curso.id}
           onPress={() => {
              expandModal(curso);
            }}
           bottomDivider>
            <ListItem.Chevron/>
            <Avatar rounded />
            <ListItem.Content>
              <ListItem.Title>{curso.materia}</ListItem.Title>
              <ListItem.Subtitle>{curso.hora}</ListItem.Subtitle>
              <ListItem.Subtitle>{curso.profesor}</ListItem.Subtitle>
            </ListItem.Content>
            <Modal
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text>Curso </Text> 
                  <Text>Materia:  {selectedItem.materia}</Text>
                  <Text>Profesor:  {selectedItem.profesor}</Text>
                  <Text>Hora:  {selectedItem.hora}</Text>
                  <Text>Status: {selectedItem.status}</Text>
                  <Button
                    title="Cerrar"
                    onPress={() => {
                      closeModal();
                    }}
                  />
                </View>
              </View>
            </Modal>
          </ListItem>
        );
      })}
      
    </ScrollView>
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
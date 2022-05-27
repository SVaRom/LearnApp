import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  Modal,
  Alert,
  StyleSheet } from "react-native";
import firebase from "../../../database/firebase";
import { ListItem, Avatar, ButtonGroup } from "@rneui/themed";

const Home= ({ navigation }) => {

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
    firebase.db.collection("curso-teacher").onSnapshot((querySnapshot) => {
      const ofertas = [];
      querySnapshot.docs.forEach((doc) => {
        console.log("aki");

        const { materia, profesor, hora, aula} = doc.data();
        console.log(doc.data());
        const id = doc.id;
        ofertas.push({
          id: id,
          materia: materia,
          profesor: profesor,
          hora: hora,
          aula: aula,
        });
      });
      setOfertas(ofertas);
    });
    abortController.abort();
  }, []);
  return (
    <ScrollView>
      {ofertas.map((oferta) => {
        return (
          <ListItem key={oferta.id}
            onPress={() => {
              expandModal(oferta);
            }}
            bottomDivider>
            <ListItem.Chevron/>
            <Avatar rounded />
            <ListItem.Content>
              <ListItem.Title>{oferta.materia}</ListItem.Title>
              <ListItem.Subtitle>{oferta.hora}</ListItem.Subtitle>
              <ListItem.Subtitle>{oferta.profesor}</ListItem.Subtitle>
              <ListItem.Subtitle>{oferta.aula}</ListItem.Subtitle>
            </ListItem.Content>
            <Modal
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text>Oferta</Text>
                  <Text>Fecha:  {selectedItem.date}</Text>
                  <Text>Materia: {selectedItem.materia}</Text>
                  <Text>Profesor:  {selectedItem.profesor}</Text>
                  <Text>Hora:  {selectedItem.time}</Text>
                  <Text>Aula:  {selectedItem.aula}</Text>
                  <Button
                    title="Unirse"
                    onPress={() => {
                      openConfirmationAlert(selectedItem.id);
                      closeModal();
                    }}
                  />
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
export default Home;
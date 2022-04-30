import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Checkbox,
  Heading,
  VStack,
  Box,
  FlatList,
  HStack,
  Avatar,
  Spacer,
  Modal,
  Button,
  FormControl,
} from "native-base";
const Attendance = ({ navigation, route }) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");
  const [status, setStatus] = React.useState(false);

  const expandModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedItem("");
    setModalIsOpen(false);
  };
  const handleAttendace = (selectedItem) => {
    if (status) {
      selectedItem.estatus = "Tomada";
      selectedItem.avatarUrl =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Yes_Check_Circle.svg/1200px-Yes_Check_Circle.svg.png";
    } else {
      selectedItem.estatus = "Perdida";
      selectedItem.avatarUrl =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx062PdX4FMGEDi9dpGfcYZdnzVeeLFahEsQ&usqp=CAU";
    }
    console.log(selectedItem.estatus);
    console.log(route.params.data);
    closeModal();
  };

  const data1 = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Matematicas Aplicadas",
      timeStamp: "12:00 PM",
      estatus: "Tomada",
      aula: "54",
      recentText: "Rosendo Ramirez",
      avatarUrl: "",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "Programación Aplicada",
      timeStamp: "11:00 AM",
      aula: "54",
      estatus: "Tomada",
      recentText: "Fabricio Perez",
      avatarUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Yes_Check_Circle.svg/1200px-Yes_Check_Circle.svg.png",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fullName: "Negocios Eléctronicos",
      timeStamp: "10:00 AM",
      aula: "54",
      estatus: "Perdida",
      recentText: "Ilda Díaz",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx062PdX4FMGEDi9dpGfcYZdnzVeeLFahEsQ&usqp=CAU",
    },
    {
      id: "68694a0f-3da1-431f-bd56-142371e29d72",
      fullName: "Programación WEB",
      timeStamp: "12:00 PM",
      aula: "54",
      estatus: "tomada",
      recentText: "Dzul Lopéz",
      avatarUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Yes_Check_Circle.svg/1200px-Yes_Check_Circle.svg.png",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Cálculo Integral",
      timeStamp: "11:00 AM",
      aula: "54",
      estatus: "Perdida",
      recentText: "Cuquito",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx062PdX4FMGEDi9dpGfcYZdnzVeeLFahEsQ&usqp=CAU",
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        margin: 2,
      }}
    >
      <Box>
        <Heading fontSize="xl" p="3" pb="3">
          Historial De Asesorias
        </Heading>
        <FlatList
          data={data1}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => expandModal(item)}>
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                pl="4"
                pr="5"
                py="2"
              >
                <HStack space={3} justifyContent="space-between">
                  <Avatar
                    size="48px"
                    source={{
                      uri: item.avatarUrl,
                    }}
                  />
                  <VStack>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.fullName}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.recentText}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start"
                  >
                    {item.timeStamp}
                  </Text>
                  <Modal isOpen={modalIsOpen} onClose={closeModal}>
                    <Modal.Content maxWidth="400px">
                      <Modal.CloseButton />
                      <Modal.Header>
                        Asesoria de {route.params.data}
                      </Modal.Header>
                      <Modal.Body>
                        <FormControl>
                          <FormControl.Label>Materia:</FormControl.Label>
                          <FormControl.Label>
                            {selectedItem.fullName}
                          </FormControl.Label>
                          <FormControl.Label>Hora:</FormControl.Label>
                          <FormControl.Label>
                            {selectedItem.timeStamp}
                          </FormControl.Label>
                          <FormControl.Label>Maestro:</FormControl.Label>
                          <FormControl.Label>
                            {selectedItem.recentText}
                          </FormControl.Label>
                          <FormControl.Label>Aula:</FormControl.Label>
                          <FormControl.Label>
                            {selectedItem.aula}
                          </FormControl.Label>
                          <Checkbox
                            onChange={(state) => {
                              state ? setStatus(true) : setStatus(false);
                            }}
                          >
                            Confirmar asistencia
                          </Checkbox>
                        </FormControl>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button.Group space={2}>
                          <Button
                            variant="ghost"
                            colorScheme="blue"
                            onPress={() => handleAttendace(selectedItem)}
                          >
                            Hecho
                          </Button>
                        </Button.Group>
                      </Modal.Footer>
                    </Modal.Content>
                  </Modal>
                </HStack>
              </Box>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </Box>
    </View>
  );
};

export default Attendance;

import React, { useState } from "react";
import {
  NativeBaseProvider,
  View,
  Fab,
  Box,
  Modal,
  FormControl,
  Button,
  Text,
  Pressable,
  FlatList,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Input,
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const Home = ({ navigation, data }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [textT, setTextT] = useState("HH:MM");
  const [textD, setTextD] = useState("DD/MM/YYYY");
  const [materia, setMateria] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    setTextD(fDate);
    setTextT(fTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const HandleAdd = () => {
    console.log(textD);
    console.log(textT);
    console.log(materia);
    setShowModal(false);
  };

  const HandleEdit = () => {
    console.log(textD);
    console.log(textT);
    console.log(materia);
    setShowModalEdit(false);
  };

  const dataItems = [
    {
      id: "1",
      nameMateria: "Calculo Diferencial",
      timeAsesoria: "12:30",
      fechaAsesoria: "04/05/2022",
      avatarUrl: "CD",
    },
    {
      id: "2",
      nameMateria: "Algebra lineal",
      timeAsesoria: "14:00",
      fechaAsesoria: "07/05/2022",
      avatarUrl: "AL",
    },
    {
      id: "3",
      nameMateria: "Algebra lineal",
      timeAsesoria: "10:20",
      fechaAsesoria: "13/05/2022",
      avatarUrl: "AL",
    },
    {
      id: "4",
      nameMateria: "Calculo Diferencial",
      timeAsesoria: "8:30",
      fechaAsesoria: "04/05/2022",
      avatarUrl: "CD",
    },
    {
      id: "5",
      nameMateria: "Calculo Diferencial",
      timeAsesoria: "11:20",
      fechaAsesoria: "05/06/2022",
      avatarUrl: "CD",
    },
  ];

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1 }}>
        <FlatList
          data={dataItems}
          renderItem={({ item }) => (
            <Pressable onPress={() => setShowModalEdit(true)}>
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "muted.50",
                }}
                borderColor="muted.800"
                pl="4"
                pr="5"
                py="2"
              >
                <HStack space={3} justifyContent="space-between">
                  <Avatar size="48px">{item.avatarUrl}</Avatar>
                  <VStack>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.nameMateria}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.fechaAsesoria}
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
                    {item.timeAsesoria}
                  </Text>
                </HStack>
              </Box>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
        <Fab
          renderInPortal={false}
          icon={<MaterialCommunityIcons color="white" name="plus" />}
          onPress={() => setShowModal(true)}
        />
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Agregar asesoria</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Materia</FormControl.Label>
                <Picker
                  selectedValue={materia}
                  placeholder="Seleccionar Materia"
                  onValueChange={(itemValue, itemIndex) =>
                    setMateria(itemValue)
                  }
                >
                  <Picker.Item label="Calculo Diferencial" value="cd" />
                  <Picker.Item label="Programación Web" value="web" />
                  <Picker.Item label="Desarrollo movil" value="movdev" />
                </Picker>
              </FormControl>
              <FormControl>
                <FormControl.Label>Fecha</FormControl.Label>
                <Pressable onPress={() => showMode("date")}>
                  <Text fontSize="lg">{textD}</Text>
                </Pressable>
              </FormControl>
              <FormControl>
                <FormControl.Label>Hora</FormControl.Label>
                <Pressable onPress={() => showMode("time")}>
                  <Text fontSize="lg">{textT}</Text>
                </Pressable>
              </FormControl>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button onPress={() => HandleAdd()}>Agregar</Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal isOpen={showModalEdit} onClose={() => setShowModalEdit(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Editar asesoria</Modal.Header>
            <Modal.Body>
              <FormControl isDisabled>
                <FormControl.Label>Materia</FormControl.Label>
                <Input placeholder={materia}>{materia}</Input>
              </FormControl>
              <FormControl>
                <FormControl.Label>Fecha</FormControl.Label>
                <Pressable onPress={() => showMode("date")}>
                  <Text fontSize="lg">{textD}</Text>
                </Pressable>
              </FormControl>
              <FormControl>
                <FormControl.Label>Hora</FormControl.Label>
                <Pressable onPress={() => showMode("time")}>
                  <Text fontSize="lg">{textT}</Text>
                </Pressable>
              </FormControl>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModalEdit(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button onPress={() => HandleEdit()}>Editar</Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </View>
    </NativeBaseProvider>
  );
};
export default Home;

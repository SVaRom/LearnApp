import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  ScrollView,
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
  useToast,
} from "native-base";
const Home = ({ navigation, data }) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");
  const expandModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedItem("");
    setModalIsOpen(false);
  };
  const toast = useToast();
  const data1 = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Matematicas Aplicadas",
      timeStamp: "12:00 PM",
      estatus: "Tomada",
      aula: "54",
      recentText: "Rosendo Ramirez",
      avatarUrl:
        "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "Programación Aplicada",
      timeStamp: "11:00 AM",
      aula: "54",
      estatus: "Tomada",
      recentText: "Fabricio Perez",
      avatarUrl:
        "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fullName: "Negocios Eléctronicos",
      timeStamp: "10:00 AM",
      aula: "54",
      estatus: "Perdida",
      recentText: "Ilda Díaz",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: "68694a0f-3da1-431f-bd56-142371e29d72",
      fullName: "Programación WEB",
      timeStamp: "12:00 PM",
      aula: "54",
      estatus: "tomada",
      recentText: "Dzul Lopéz",
      avatarUrl:
        "https://estaticos-cdn.elperiodico.com/clip/83488bba-f6cb-48e2-8c55-3db542457029_alta-libre-aspect-ratio_default_0.jpg",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Cálculo Integral",
      timeStamp: "11:00 AM",
      aula: "54",
      estatus: "Perdida",
      recentText: "Cuquito",
      avatarUrl:
        "https://101noticias.com/wp-content/uploads/2022/03/cad19-16478003136654-1920-800x600.jpg",
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
      <ScrollView
        maxW="400"
        h="60"
        _contentContainerStyle={{
          px: "10px",
          mb: "10",
          minW: "40",
        }}
      >
        <Box>
          <Heading fontSize="xl" p="3" pb="3">
            Asesorias Ofertadas
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
                      size="xl"
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
                  </HStack>
                </Box>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
          <Modal isOpen={modalIsOpen} onClose={closeModal}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>Unirse</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label fontSize="2xl">Materia:</FormControl.Label>
                  <FormControl.Label>{selectedItem.fullName}</FormControl.Label>
                  <FormControl.Label fontSize="2xl">Maestro:</FormControl.Label>
                  <FormControl.Label>
                    {selectedItem.recentText}
                  </FormControl.Label>
                  <FormControl.Label fontSize="2xl">Hora:</FormControl.Label>
                  <FormControl.Label>
                    {selectedItem.timeStamp}
                  </FormControl.Label>
                  <FormControl.Label fontSize="2xl">Aula:</FormControl.Label>
                  <FormControl.Label>{selectedItem.aula}</FormControl.Label>
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={closeModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    onPress={() => {
                      toast.show({ description: "Inscripción correcta!" });
                      closeModal();
                    }}
                  >
                    Unirme
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Box>
      </ScrollView>
    </View>
  );
};

export default Home;

import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  HStack,
  Avatar,
  Heading,
  VStack,
  FlatList,
  useToast,
  Center,
  Divider,
  Box,
  Flex,
  Link,
  Modal,
  Button,
  FormControl,
  Input,
  Fab,
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const dataItems = [
  {
    id: "1",
    nameMateria: "Calculo Diferencial",
    avatarUrl: "CD",
  },
  {
    id: "2",
    nameMateria: "Algebra Lineal",
    avatarUrl: "AL",
  },
  {
    id: "3",
    nameMateria: "Negocios Electronicos",
    avatarUrl: "NE",
  },
  {
    id: "4",
    nameMateria: "Redes Emergentes",
    avatarUrl: "RE",
  },
];

const Profile = ({ navigation, data }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [materia, setMateria] = useState("");
  const toast = useToast();
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const getInitials = (name) => {
    const fullName = name.split(" ");
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
  };

  return (
    <View
      style={{
        justifyContent: "center",
        display: "flex",
        margin: 10,
      }}
    >
      <Center paddingBottom="2">
        <Avatar bg={getRandomColor()} size="xl">
          {getInitials(data.name)}
        </Avatar>
      </Center>
      <HStack justifyContent="center" space={2} paddingBottom="2">
        <Heading size="md">{data.name}</Heading>
      </HStack>
      <Divider />
      <VStack space="2.5" mt="4" px="5">
        <Heading size="md">Número de control</Heading>
        <Text>{data.number}</Text>
        <Heading size="md">Carrera</Heading>
        <Text>{data.career}</Text>
      </VStack>
      <Box alignItems="center">
        <Flex direction="row" h="58" p="4">
          <Link
            onPress={() => {
              setShowModal(true);
            }}
            _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "#be8800",
            }}
            alignSelf="flex-end"
            mt="1"
          >
            Eliminar cuenta
          </Link>
          <Divider bg="#E0E0E0" thickness="2" mx="2" orientation="vertical" />
          <Link
            onPress={() => {
              navigation.push("Change", { data: data });
            }}
            _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "#007abc",
            }}
            alignSelf="flex-end"
            mt="1"
          >
            Cambiar contraseña
          </Link>
        </Flex>

        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>¿Estás seguro de eliminar tu cuenta?</Modal.Header>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    setShowModal(false);
                    toast.show({ description: "Cuenta eliminada" });
                    navigation.navigate("Login");
                  }}
                >
                  Confirmar
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Box>
      <Box flex="1"></Box>
    </View>
  );
};
export default Profile;

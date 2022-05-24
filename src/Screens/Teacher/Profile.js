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
  return (
    <View
      style={{
        justifyContent: "center",
        display: "flex",
        margin: 10,
      }}
    >
      <Center paddingBottom="2">
        <Avatar bg="green.500" size="xl">
          {data.name}
        </Avatar>
      </Center>
      <HStack justifyContent="center" space={2} paddingBottom="2">
        <Heading size="md">{data.name}</Heading>
      </HStack>

      <Divider />
      <VStack space="2.5" mt="4" px="5">
        <Heading size="md">Número de control</Heading>
        <Text>{data.name}</Text>
        <Heading size="md">Carrera</Heading>
        <Text>{data.name}</Text>
        <Heading size="md">Lista de materias</Heading>
        <FlatList
          data={dataItems}
          renderItem={({ item }) => (
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
              <Text
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                bold
              >
                {item.nameMateria}
              </Text>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
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

        <Fab
          renderInPortal={false}
          icon={<MaterialCommunityIcons color="white" name="plus" />}
          onPress={() => setShowModal2(true)}
        />

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

        <Modal
          isOpen={showModal2}
          onClose={() => {
            setShowModal2(false);
          }}
        >
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Agregar Materia</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Materia</FormControl.Label>
                <Input
                  placeholder="Nombre de la materia"
                  onChangeText={(text) => setMateria(text)}
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal2(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onPress={() => {
                    setShowModal2(false);
                    toast.show({ description: "Materia agregada" });
                    console.log(materia);
                  }}
                >
                  Agregar
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

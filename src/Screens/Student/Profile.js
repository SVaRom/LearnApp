import React from "react";
import { View, Text } from "react-native";
import QRCode from "react-qr-code";
import {
  HStack,
  Avatar,
  Heading,
  VStack,
  ScrollView,
  Divider,
  Pressable,
  Center,
  Box,
  Link,
  Flex,
  Menu,
  Modal,
  Button,
  useToast,
} from "native-base";
const Profile = ({ navigation, data }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalIsOpen1, setModalIsOpen1] = React.useState(false);
  const toast = useToast();
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        margin: 10,
      }}
    >
      <Center paddingBottom="2">
        <HStack space={3} justifyContent="center">
          <Menu
            shadow={2}
            w="190"
            trigger={(triggerProps) => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <Avatar
                    bg="green.500"
                    size="xl"
                    source={{
                      uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                    }}
                  >
                    AJ
                  </Avatar>
                </Pressable>
              );
            }}
          >
            <Menu.Item
              onPress={() => {
                console.log("Responsive press");
              }}
            >
              Cambiar foto de perfil
            </Menu.Item>
          </Menu>
        </HStack>
      </Center>
      <HStack justifyContent="center" space={2} paddingBottom="2">
        <Heading size="md">{data.name}</Heading>
      </HStack>

      <ScrollView>
        <Divider />
        <VStack space="2.5" mt="4" px="5">
          <Heading size="md">Número de control</Heading>
          <Text>{data.name}</Text>
          <Heading size="md">Carrera</Heading>
          <Text>{data.name}</Text>
          <Button onPress={() => setModalIsOpen1(true)}>Pasar lista</Button>
        </VStack>
      </ScrollView>
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
              navigation.navigate("Change", { data: data });
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
            <Modal.Header>Eliminar la cuenta!</Modal.Header>
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
        <Modal isOpen={modalIsOpen1} onClose={() => setModalIsOpen1(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Pase de lista</Modal.Header>
            <Modal.Body>
              <Center>
                <QRCode
                  value={data.number}
                  size={150}
                  bgColor="#282c34"
                  fgColor="#fff"
                  level="H"
                />
              </Center>
            </Modal.Body>
            <Modal.Footer>
              <Button onPress={() => setModalIsOpen1(false)}>Hecho</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Box>
      <Box flex="1"></Box>
    </View>
  );
};
export default Profile;

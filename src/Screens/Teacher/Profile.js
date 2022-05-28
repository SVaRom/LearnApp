import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  HStack,
  Avatar,
  Heading,
  VStack,
  useToast,
  Center,
  Divider,
  Box,
  Flex,
  Link,
  Modal,
  Button,
} from "native-base";
import { auth } from "../../../database/firebase";
import firebase from "../../../database/firebase";

const Profile = ({ navigation, data, id }) => {
  const [showModal, setShowModal] = React.useState(false);
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

  const handleDelete = () => {
    firebase.db.collection("users").doc(id).delete();
    auth.signOut();
    auth.currentUser.delete();
    navigation.replace("Login");
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
        <Heading size="md">Control number</Heading>
        <Text>{data.number}</Text>
        <Heading size="md">Career</Heading>
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
            Delete account
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
            Change password
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
            <Modal.Header>
              Are you sure you want to delete your account?
            </Modal.Header>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  No
                </Button>
                <Button
                  onPress={() => {
                    setShowModal(false);
                    handleDelete();
                    toast.show({ description: "Account deleted successfully" });
                  }}
                >
                  Yes
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

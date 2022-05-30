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
  FormControl,
  Input,
} from "native-base";
import { auth } from "../../../database/firebase";
import firebase from "../../../database/firebase";

const Profile = ({ navigation, data, id }) => {
  const [showModal, setShowModal] = React.useState(false);
  const toast = useToast();
  const [password, setPassword] = React.useState("");

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

  const handleFullDelete = () => {
    firebase.db
      .collection("asesorias-student")
      .where("numTeacher", "==", data.number)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          firebase.db.collection("asesorias-student").doc(doc.id).delete();
        });
      });
    firebase.db
      .collection("asesorias")
      .where("numTeacher", "==", data.number)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          firebase.db.collection("asesorias").doc(doc.id).delete();
        });
      });
  };

  const handleDelete = () => {
    const idX = id;
    try {
      console.log(id);
      firebase.db.collection("users").doc(idX).delete();
      handleFullDelete();
      auth.currentUser.delete();
    } catch (error) {
      auth.signOut();
      auth.signInWithEmailAndPassword(data.email, password);
      firebase.db.collection("users").doc(idX).delete();
      handleFullDelete();
      auth.currentUser.delete();
    } finally {
      auth.signOut();
      toast.show({
        description: "Account deleted successfully",
        placement: "top",
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
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
          <Divider bg="#E0E0E0" thickness="2" mx="2" orientation="vertical" />

          <Link
            onPress={() => {
              navigation.push("Rating", { data: data });
            }}
            _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "#8d7e00",
            }}
            alignSelf="flex-end"
            mt="1"
          >
            Rate the app
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
            <Modal.Body>
              <FormControl.Label>
                Type your current password to confirm
              </FormControl.Label>
              <Input
                onChangeText={(txt) => setPassword(txt)}
                type="password"
                variant="underlined"
              />
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
                  No
                </Button>
                <Button
                  onPress={() => {
                    setShowModal(false);
                    handleDelete();
                  }}
                >
                  Yes
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Box>
    </View>
  );
};
export default Profile;

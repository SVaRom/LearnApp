import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  Image,
  View,
  IconButton,
  Icon,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { auth } from "../../database/firebase";
import firebase from "../../database/firebase";
const LoginScreen = ({ navigation }) => {
  const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;
  useEffect(() => {
    let abortController = new AbortController();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        handleSearch(auth.currentUser.email);
      }
    });
    abortController.abort();
    return unsubscribe;
  });
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const login = () => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
      })
      .catch((error) => alert("Something went wrong, please try again later."));
  };
  const handleSearch = (mail) => {
    let abortController = new AbortController();
    firebase.db
      .collection("users")
      .where("email", "==", mail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().type === "Teacher")
            navigation.replace("MyTabsTeacher", {
              data: doc.data(),
              id: doc.id,
            });
          else navigation.replace("MyTabs", { data: doc.data(), id: doc.id });
        });
      });
    abortController.abort();
  };
  return (
    <View flex={1}>
      <Box flexDirection={"row"}>
        <IconButton
          icon={<Icon as={Entypo} name="globe" />}
          borderRadius="full"
          _icon={{
            color: "gray.500",
            size: "xl",
          }}
          _hover={{
            bg: "gray.600:alpha.20",
          }}
          _pressed={{
            bg: "gray.600:alpha.20",
            _icon: {
              name: "emoji-flirt",
            },
            _ios: {
              _icon: {
                size: "xl",
              },
            },
          }}
          _ios={{
            _icon: {
              size: "xl",
            },
          }}
          onPress={() => {
            console.log("Change language");
          }}
        />
      </Box>

      <Center w="100%">
        <Box
          safeArea
          p="2"
          py="8"
          w="90%"
          maxW="290"
          textAlign="center"
          alignItems="center"
        >
          <Image
            source={require("../images/Logo.png")}
            style={{ width: 150, height: 150 }}
            alt={"Alternate Text"}
          />
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Welcome!
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Type to continue...
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>
                Email {tab}
                {tab}
                {tab}
                {tab}
                {tab}
                {tab}
                {tab}
                {tab}
                {tab}
                {tab}
                {tab}
                {tab}
                {tab}
              </FormControl.Label>
              <Input
                onChangeText={(txt) => handleChange("email", txt)}
                variant="underlined"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                Password
                {tab}
                {tab}
                {tab}
                {tab}
                {tab}
                {tab}
                {tab}
                {tab}
                {tab}
                {tab}
                {tab}
                {tab}
              </FormControl.Label>
              <Input
                onChangeText={(txt) => handleChange("password", txt)}
                type="password"
                variant="underlined"
              />
            </FormControl>
            <Button mt="2" colorScheme="gray" onPress={login}>
              Log in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Link
                onPress={() => {
                  navigation.push("Identity");
                }}
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "#007abc",
                }}
                alignSelf="flex-end"
                mt="1"
              >
                Forgot password?
              </Link>
            </HStack>
            <HStack mt="6" justifyContent="center">
              <Link
                onPress={() => {
                  navigation.push("Register");
                }}
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "#be8800",
                }}
                alignSelf="flex-end"
                mt="1"
              >
                You don't have an account? Sign up!
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </View>
  );
};

export default LoginScreen;

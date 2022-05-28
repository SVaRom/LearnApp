import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  Image,
  ScrollView,
} from "native-base";
import { auth } from "../../database/firebase";
const UpdateScreen = ({ navigation }) => {
  const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;
  const [data, setData] = useState({
    email: "",
  });
  const handleChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  const changePwd = () => {
    auth
      .sendPasswordResetEmail(data.email)
      .then(() => {
        alert("Please check your email... (Also check in SPAM folder)");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      })
      .catch(function (e) {
        alert("Something went wrong, please try again later.");
      });
  };
  return (
    <ScrollView flex={1}>
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
            Restore password
          </Heading>
          <Heading
            mt="5"
            space={3}
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Type your email to continue.
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
            <Button mt="2" colorScheme="gray" onPress={changePwd}>
              Restore password
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};
export default UpdateScreen;

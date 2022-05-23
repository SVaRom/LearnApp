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
        alert(
          "Porfavor revisa tu correo electrónico... (También revisa en SPAM)"
        );
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      })
      .catch(function (e) {
        alert(
          "Algo salio mal, verifique que este utilizando en correo registrado"
        );
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
            Restablecer contraseña
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
            Introduce tu correo electrónico para continuar.
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Correo electrónico</FormControl.Label>
              <Input
                onChangeText={(txt) => handleChange("email", txt)}
                variant="underlined"
              />
            </FormControl>
            <Button mt="2" colorScheme="gray" onPress={changePwd}>
              Cambiar contraseña
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};
export default UpdateScreen;

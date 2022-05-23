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
import firebase from "../../database/firebase";
const RegisterScreen = ({ navigation }) => {
  const [data, setData] = useState({
    name: "",
    number: "",
    career: "",
    email: "",
    password: "",
    type: "",
  });
  const handleChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  const SaveNewUser = async () => {
    //! await porque es asincrono y debemos usar async porque es sincronizable a datos nota: podemos agregar un loader
    try {
      let aux;
      if (data.number.length === 4) aux = "Teacher";
      else if (data.number.length === 8) aux = "Student";
      await firebase.db.collection("users").add({
        name: data.name,
        number: data.number,
        career: data.career,
        email: data.email.toLowerCase(),
        type: aux,
      });
    } catch (error) {
      alert("Algo salio mal, intente de nuevo");
    }
  };
  const register = () => {
    if (
      data.name === "" ||
      data.number === "" ||
      data.email === "" ||
      data.password === "" ||
      data.career === ""
    ) {
      alert("Porfavor llene todos los campos");
    } else {
      auth
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredentials) => {
          SaveNewUser();
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        })
        .catch((error) => alert(error.message));
    }
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
            Registro
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
            Favor de llenar los datos correspondientes con la debida información
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Nombre completo</FormControl.Label>
              <Input
                onChangeText={(txt) => handleChange("name", txt)}
                variant="underlined"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Número de control</FormControl.Label>
              <Input
                onChangeText={(txt) => handleChange("number", txt)}
                variant="underlined"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Carrera</FormControl.Label>
              <Input
                onChangeText={(txt) => handleChange("career", txt)}
                variant="underlined"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Correo electrónico</FormControl.Label>
              <Input
                onChangeText={(txt) => handleChange("email", txt)}
                variant="underlined"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Contraseña</FormControl.Label>
              <Input
                onChangeText={(txt) => handleChange("password", txt)}
                type="password"
                variant="underlined"
              />
            </FormControl>
            <Button mt="2" colorScheme="gray" onPress={register}>
              Registrarte
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};
export default RegisterScreen;

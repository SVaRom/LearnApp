import React from "react";
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
const RegisterScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    name: "",
    number: "",
    career: "",
    email: "",
    password: "",
  });
  const handleChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  const register = () => {
    console.log("Register responsive " + data.name);
    // ! If registro es exitoso
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
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

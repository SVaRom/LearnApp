import React from "react";
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
} from "native-base";
const LoginScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    number: "",
    password: "",
    type: "",
  });
  const handleChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  const checkType = () => {
    if (data.number.length === 4) handleChange("type", "Teacher");
    else if (data.number.length === 8) handleChange("type", "Student");
    else handleChange("type", "");
  };

  const login = () => {
    console.log("hi " + data.number + " you are " + data.type);
    data.type === "Student"
      ? navigation.navigate("MyTabs", { data: data })
      : data.type === "Teacher"
      ? navigation.navigate("MyTabsTeacher", { data: data })
      : navigation.navigate("Login", window.alert("Datos erroneos"));
  };
  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290" textAlign="center">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          ¡Bienvenido!
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
          Ingresa para continuar
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Número de control</FormControl.Label>
            <Input
              onChangeText={(txt) => handleChange("number", txt)}
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
          <Button mt="2" colorScheme="gray" onPress={login} onFocus={checkType}>
            Ingresar
          </Button>
          <HStack mt="6" justifyContent="center">
            <Link
              onPress={() => {
                console.log("Supon un modificar");
              }}
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "#007abc",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </HStack>
          <HStack mt="6" justifyContent="center">
            <Link
              onPress={() => {
                console.log("Supon un registro");
              }}
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "#be8800",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              ¿No tienes cuenta? ¡Registrate aquí!
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};
export default LoginScreen;

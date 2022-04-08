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
  const [text, setText] = React.useState("");
  const login = () => {
    console.log("hi");
    navigation.navigate("MyTabs", { name: text });
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
            <Input onChangeText={setText} variant="underlined" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input type="password" variant="underlined" />
          </FormControl>
          <Button mt="2" colorScheme="gray" onPress={login}>
            Ingresar
          </Button>
          <HStack mt="6" justifyContent="center">
            <Link
              onPress={console.log("Supon un modificar")}
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
              onPress={console.log("Supon un registro")}
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

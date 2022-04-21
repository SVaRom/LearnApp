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
  Image,
  View,
  IconButton,
  Icon,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
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
      ? navigation.push("MyTabs", { data: data })
      : data.type === "Teacher"
      ? navigation.push("MyTabsTeacher", { data: data })
      : navigation.navigate("Login", window.alert("Datos erroneos"));
  };
  return (
    <View flex={1}>
      <Box flexDirection={"row"}>
        <IconButton
          icon={<Icon as={Entypo} name="globe" />}
          borderRadius="full"
          _icon={{
            color: "gray.500",
            size: "md",
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
                size: "md",
              },
            },
          }}
          _ios={{
            _icon: {
              size: "md",
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
                onSelectionChange={checkType}
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
            <Button mt="2" colorScheme="gray" onPress={login}>
              Ingresar
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
                ¿Olvidaste tu contraseña?
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
                ¿No tienes cuenta? ¡Registrate aquí!
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </View>
  );
};
export default LoginScreen;

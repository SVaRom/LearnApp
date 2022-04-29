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
const ChangeScreen2 = ({ navigation, route }) => {
  const [data, setData] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const handleChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  const changePwd = () => {
    if (data.password === data.confirmPassword) {
      console.log(
        "Update responsive " +
          route.params.data.number +
          " new_pwd:" +
          data.password
      );
      // ! If update es exitoso
      navigation.goBack();
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
            Cambiar contraseña
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
            Introduce tu nueva contraseña.
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Nueva contraseña</FormControl.Label>
              <Input
                onChangeText={(txt) => handleChange("password", txt)}
                type="password"
                variant="underlined"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirmar contraseña</FormControl.Label>
              <Input
                onChangeText={(txt) => handleChange("confirmPassword", txt)}
                type="password"
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
export default ChangeScreen2;

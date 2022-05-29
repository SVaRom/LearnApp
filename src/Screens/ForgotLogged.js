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
  useToast,
} from "native-base";
import { auth } from "../../database/firebase";
const ChangeScreen2 = ({ navigation }) => {
  const toast = useToast();
  const [data, setData] = React.useState({
    oldPassword: "",
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
    let mail = auth.currentUser.email;
    auth.signOut();
    auth.signInWithEmailAndPassword(mail, data.oldPassword);
    if (data.password === data.confirmPassword) {
      auth.currentUser.updatePassword(data.password);
      toast.show({
        description: "Please log out to save all changes",
        placement: "top",
      });
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
            Change password
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Type your current password</FormControl.Label>
              <Input
                onChangeText={(txt) => handleChange("oldPassword", txt)}
                type="password"
                variant="underlined"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>New Password</FormControl.Label>
              <Input
                onChangeText={(txt) => handleChange("password", txt)}
                type="password"
                variant="underlined"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm password</FormControl.Label>
              <Input
                onChangeText={(txt) => handleChange("confirmPassword", txt)}
                type="password"
                variant="underlined"
              />
            </FormControl>
            <Button mt="2" colorScheme="gray" onPress={changePwd}>
              Change password
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};
export default ChangeScreen2;

import React from "react";
import { View, Text } from "react-native";
import { HStack,Avatar,Heading,VStack,ScrollView, Divider,ZStack,Center,Box,IconButton,Icon, Link,Flex,Menu } from "native-base";
import { Entypo } from "@expo/vector-icons";
const Profile = ({ navigation, data}) => {
  const [text, setText] = React.useState("");
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        margin: 10,
      }}
    >
  <Center paddingBottom="2">
        <Avatar bg="green.500"  size="xl" source={{
          uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        }}>
        AJ
      </Avatar>
     
  </Center>
   <HStack justifyContent="center" space={2} paddingBottom="2">
      <Heading size="md">{data.number}</Heading>
   </HStack>
    
   <ScrollView>
   <Divider /> 
      <VStack space="2.5" mt="4" px="5">
        <Heading size="md">Número de control</Heading>
        <Text>{data.number}</Text>
        <Heading size="md">Carrera</Heading>
        <Text>{data.number}</Text>
      </VStack>
      </ScrollView>
      <Box alignItems="center">
      <Flex direction="row" h="58" p="4">
      <Link
                onPress={() => {
                  navigation.navigate("Login");
                }}
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "#be8800",
                }}
                alignSelf="flex-end"
                mt="1"
              >
                Eliminar cuenta
              </Link>
        <Divider bg="#E0E0E0" thickness="2" mx="2" orientation="vertical" />
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
                Cambiar contraseña
            
              </Link>
      </Flex>
    </Box>
    </View>
  );
};
export default Profile;

import React from "react";
import { TextInput, Button, View, Text } from "react-native";
const Home = ({ navigation, name }) => {
  const [text, setText] = React.useState("");
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        margin: 10,
      }}
    >
      <Text>Aquí es home {name}</Text>
    </View>
  );
};
export default Home;

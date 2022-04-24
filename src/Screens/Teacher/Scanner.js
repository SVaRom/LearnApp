import React from "react";
import { TextInput, Button, View, Text } from "react-native";
const Scanner = ({ navigation, data }) => {
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
      <Text>Aquí es scanner {data.number}</Text>
      <Button onPress={() => navigation.push("Attendance", { data: data })} />
    </View>
  );
};
export default Scanner;

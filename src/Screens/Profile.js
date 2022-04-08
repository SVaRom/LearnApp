import React from "react";
import { View, Text } from "react-native";
const Profile = ({ navigation, name }) => {
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
      <Text>Aquí es perfil {name}</Text>
    </View>
  );
};
export default Profile;

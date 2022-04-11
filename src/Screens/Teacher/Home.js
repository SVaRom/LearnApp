import React from "react";
import { View, Text } from "react-native";
import { Agenda } from "react-native-calendars";
const Home = ({ navigation, data }) => {
  const [text, setText] = React.useState("");
  return (
    <View style={{ flex: 1 }}>
      <Agenda />
    </View>
  );
};
export default Home;

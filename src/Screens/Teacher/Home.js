import React from "react";
import { View, Text } from "react-native";
import { Agenda } from "react-native-calendars";
const Home = ({ navigation, data }) => {
  const [text, setText] = React.useState("");
  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={{
          "2022-04-12": [{ name: "item 1 - any js object" }],
          "2022-04-13": [{ name: "item 2 - any js object", height: 80 }],
          "2022-04-14": [],
          "2022-04-15": [
            { name: "item 3 - any js object" },
            { name: "any js object" },
          ],
        }}
        theme={{
          agendaDayTextColor: "yellow",
          agendaDayNumColor: "green",
          agendaTodayColor: "red",
          agendaKnobColor: "blue",
        }}
      />
    </View>
  );
};
export default Home;

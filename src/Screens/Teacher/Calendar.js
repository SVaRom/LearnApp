import React, { useState } from "react";
import { NativeBaseProvider, View, Box, Text, Pressable } from "native-base";
import { Agenda } from "react-native-calendars";

const Calendar = ({ navigation, route }) => {
  const [items, setItems] = useState({});
  const fechas = [
    { date: "2022-04-28", name: "Asesoria Robles", time: "12:00" },
    { date: "2022-04-28", name: "Asesoria Mascorro", time: "13:00" },
    { date: "2022-04-28", name: "Asesoria Ilda", time: "14:00" },
    { date: "2022-04-29", name: "Asesoria Mascorro", time: "13:00" },
    { date: "2022-04-29", name: "Asesoria Ilda", time: "14:00" },
  ];
  const loadItems = () => {
    for (let i = 0; i < fechas.length; i++) {
      if (!items[fechas[i].date]) {
        items[fechas[i].date] = [];
      }
    }
    for (let i = 0; i < fechas.length; i++) {
      let aux = false;
      for (let j = 0; j < items[fechas[i].date].length; i++) {
        if (fechas[i] != items[fechas[i].date][j]) {
          aux = true;
        } else {
          aux = false;
        }
        console.log("entré");
      }
      console.log(aux);

      if (aux || items[fechas[i].date] === []) {
        items[fechas[i].date].push(fechas[i]);
      }
    }
    setItems(items);
  };

  const renderItem = (item) => {
    return (
      <Pressable style={{ marginRight: 10, marginTop: 17 }}>
        <Box>
          <Text>{item.name}</Text>
          <Text>{item.date}</Text>
          <Text>{item.time}</Text>
        </Box>
      </Pressable>
    );
  };

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1 }} on>
        <Agenda
          items={items}
          renderItem={renderItem}
          loadItemsForMonth={loadItems}
          hideKnob={true}
          showClosingKnob={true}
          theme={{ agendaKnobColor: "#00aeff" }}
        />
      </View>
    </NativeBaseProvider>
  );
};
export default Calendar;

import React, { useState } from "react";
import { NativeBaseProvider, View, Box, Text, Pressable } from "native-base";
import { Agenda } from "react-native-calendars";

const Calendar = ({ navigation, route }) => {
  const [items, setItems] = useState({});
  const fechas = [
    { id: "1", date: "2022-04-28", name: "Asesoria Robles", time: "12:00" },
    { id: "2", date: "2022-04-28", name: "Asesoria Mascorro", time: "13:00" },
    { id: "3", date: "2022-04-28", name: "Asesoria Ilda", time: "14:00" },
    { id: "4", date: "2022-04-29", name: "Asesoria Mascorro", time: "13:00" },
    { id: "5", date: "2022-04-29", name: "Asesoria Ilda", time: "14:00" },
  ];
  const loadItems = () => {
    for (let i = 0; i < fechas.length; i++) {
      if (!items[fechas[i].date]) {
        items[fechas[i].date] = [];
      }
    }
    console.log(items);
    for (let i = 0; i < fechas.length; i++) {
      items[fechas[i].date].push(fechas[i]);
      //console.log(items);
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
          renderItem={(item) => {
            return (
              <Pressable style={{ marginRight: 10, marginTop: 17 }}>
                <Box>
                  <Text>{item.name}</Text>
                  <Text>{item.time}</Text>
                </Box>
              </Pressable>
            );
          }}
          loadItemsForMonth={() => {
            for (let i = 0; i < fechas.length; i++) {
              if (!items[fechas[i].date]) {
                items[fechas[i].date] = [];
              }
            }
            console.log(items);
            for (let i = 0; i < fechas.length; i++) {
              items[fechas[i].date].push(fechas[i]);
              //console.log(items);
            }
            setItems(items);
          }}
          hideKnob={true}
        />
      </View>
    </NativeBaseProvider>
  );
};
export default Calendar;

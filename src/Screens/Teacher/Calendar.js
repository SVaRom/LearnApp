import React, { useState } from "react";
import { NativeBaseProvider, View, Box, Text, Pressable } from "native-base";
import { Agenda } from "react-native-calendars";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const hourToString = (timestamp) => {
  const date = new Date(timestamp * 1000);
  let hour = date.getHours();
  let minutes = date.getMinutes();
  return hour + ":" + minutes;
};

const Calendar = () => {
  const [items, setItems] = useState({});
  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -1; i < 5; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        console.log(time);
        const strTime = timeToString(time);
        const strClock = hourToString(time);
        console.log(strTime);
        console.log(strClock);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: "Asesoria del día " + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              hora: strClock,
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 3);
  };

  const renderItem = (item) => {
    return (
      <Pressable style={{ marginRight: 10, marginTop: 17 }}>
        <Box>
          <Text>{item.name}</Text>
          <Text>{item.time}</Text>
          <Text>{item.hora}</Text>
        </Box>
      </Pressable>
    );
  };

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1 }}>
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

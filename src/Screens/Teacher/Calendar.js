import React, { useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Calendario = ({ navigation, data }) => {
  return (
    <View style={{ flex: 1 }}>
      <Calendar
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        hideArrows={false}
        renderArrow={(direction) =>
          direction === "left" ? (
            <MaterialCommunityIcons
              name="chevron-left"
              color="#B2BEB5"
              size={26}
            />
          ) : (
            <MaterialCommunityIcons
              name="chevron-right"
              color="#B2BEB5"
              size={26}
            />
          )
        }
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        disableArrowLeft={false}
        disableArrowRight={false}
        enableSwipeMonths={true}
      />
    </View>
  );
};

export default Calendario;

import React, { useState } from "react";
import { NativeBaseProvider, View, Modal } from "native-base";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Icon from "react-native-vector-icons/AntDesign";

const Calendario = ({ navigation, data }) => {
  const [showModal, setShowModal] = useState(false);
  const [formDate, setFormDate] = useState("");

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1 }} on>
        <Calendar
          renderArrow={(direction) =>
            direction === "left" ? (
              <Icon name="left" size={26} />
            ) : (
              <Icon name="right" size={26} />
            )
          }
          markedDates={{
            "2022-04-16": {
              selected: true,
              marked: true,
              selectedColor: "blue",
            },
            "2022-04-17": { marked: true },
            "2022-04-18": {
              marked: true,
              dots: [{ color: "red" }],
              activeOpacity: 0,
            },
            "2022-04-19": { disabled: true, disableTouchEvent: true },
          }}
          onDayPress={(day) => {
            let fDate = day.day + "/" + day.month + "/" + day.year;
            setFormDate(fDate);
            console.log(formDate);
            setShowModal(true);
          }}
          markingType={"period"}
          monthFormat={"MMMM yyyy"}
        />
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>{formDate}</Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal.Content>
        </Modal>
      </View>
    </NativeBaseProvider>
  );
};
export default Calendario;

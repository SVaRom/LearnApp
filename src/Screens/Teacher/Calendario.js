import React, { useState } from "react";
import { NativeBaseProvider, View, Modal } from "native-base";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Icon from "react-native-vector-icons/AntDesign";

LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Juilio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene.",
    "Feb.",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul.",
    "Ago",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dic.",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ],
  dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab."],
  today: "Hoy",
};
LocaleConfig.defaultLocale = "es";

const Calendario = ({ navigation, route }) => {
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
<<<<<<< Updated upstream
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
=======
            "2022-04-16": { marked: true },
            "2022-04-27": {
              startingDay: true,
              color: "green",
              endingDay: true,
            },
            "2022-04-28": { marked: true, dotColor: "red" },
            "2022-04-29": { marked: true },
>>>>>>> Stashed changes
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

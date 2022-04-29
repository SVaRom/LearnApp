import React, { useState } from "react";
import { NativeBaseProvider, View, Modal,FormControl,Button } from "native-base";
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

const CalendarS = ({ navigation, route }) => {
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
            "2012-05-16": {
              selected: true,
              marked: true,
              selectedColor: "blue",
            },
            "2012-05-17": { marked: true },
            "2012-05-18": { marked: true, dotColor: "red", activeOpacity: 0 },
            "2012-05-19": { disabled: true, disableTouchEvent: true },
          }}
          onDayPress={(day) => {
            let fDate = day.day + "/" + day.month + "/" + day.year;
            setFormDate(fDate);
            console.log(formDate);
            setShowModal(true);
          }}
          markingType={"multi-dot"}
          monthFormat={"yyyy MMMM"}
        />
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>{formDate}</Modal.Header>
            <FormControl.Label fontSize="2xl"> usted no tiene asesorias este dia </FormControl.Label>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
            <Button onPress={() => setShowModal(false)}>Hecho</Button>
          </Modal.Footer>
          </Modal.Content>
        </Modal>
      </View>
    </NativeBaseProvider>
  );
};
export default CalendarS;
import QRCode from "react-qr-code";
import React from "react";
import { View, Text } from "react-native";
function Codigo({ navigation, data }) {

  return (
    <view>
      <div className="Codigo">
        <header className="Codigo-header">
         <QRCode value="Hola Mundo" size={256} bgColor="#282c34" fgColor="#fff" level="H" />
      </header>
    </div>
    </view>
   
  );
}
export default Codigo;
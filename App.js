// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import HomeScreen from "./src/Screens/Student/Home";
import LoginScreen from "./src/Screens/Login";
import ProfileScreen from "./src/Screens/Student/Profile";
import CalendarScreen from "./src/Screens/Student/Calendar";
import HistoryScreen from "./src/Screens/Student/History";
import HomeTeacherScreen from "./src/Screens/Teacher/Home";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
function MyTabs({ navigation, route }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#449e9d"
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarColor: "#041C32",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      >
        {route.params.data.type === "Student"
          ? (props) => <HomeScreen {...props} data={route.params.data} />
          : route.params.data.type === "Teacher"
          ? (props) => <HomeTeacherScreen {...props} data={route.params.data} />
          : window.alert("Datos erroneos", window.location.reload())}
      </Tab.Screen>
      <Tab.Screen
        name="Agenda"
        options={{
          tabBarColor: "#04293A",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}
      >
        {(props) => <CalendarScreen {...props} name={route.params.name} />}
      </Tab.Screen>
      <Tab.Screen
        name="Historial"
        options={{
          tabBarColor: "#064663",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookshelf" color={color} size={26} />
          ),
        }}
      >
        {(props) => <HistoryScreen {...props} name={route.params.name} />}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          tabBarColor: "#ECB365",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      >
        {(props) => <ProfileScreen {...props} name={route.params.name} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: true }}
          initialRouteName="Login"
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "LearnApp",
            }}
          />
          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{
              title: "LearnApp",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;

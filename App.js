// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import HomeScreen from "./src/Screens/Home";
import LoginScreen from "./src/Screens/Login";
import ProfileScreen from "./src/Screens/Profile";
import CalendarScreen from "./src/Screens/Calendar";
import HistoryScreen from "./src/Screens/History";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
function MyTabs({ navigation, route }) {
  const name = route.params;
  const [color, setColor] = React.useState();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#449e9d"
    >
      <Tab.Screen
        name="Home"
        component={() => <HomeScreen name={route.params.name} />}
        options={{
          tabBarColor: "#041C32",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Agenda"
        component={() => <CalendarScreen name={route.params.name} />}
        options={{
          tabBarColor: "#04293A",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Historial"
        component={() => <HistoryScreen name={route.params.name} />}
        options={{
          tabBarColor: "#064663",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookshelf" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={() => <ProfileScreen name={route.params.name} />}
        options={{
          tabBarColor: "#ECB365",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
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

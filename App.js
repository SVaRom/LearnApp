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
import RegisterScreen from "./src/Screens/Register";
import CalendarTeacherScreen from "./src/Screens/Teacher/Calendar";
import ScannerScreen from "./src/Screens/Teacher/Scanner";
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
        {(props) => <HomeScreen {...props} data={route.params.data} />}
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
        {(props) => <CalendarScreen {...props} data={route.params.data} />}
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
        {(props) => <HistoryScreen {...props} data={route.params.data} />}
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
        {(props) => <ProfileScreen {...props} data={route.params.data} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
function MyTabsTeacher({ navigation, route }) {
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
        {(props) => <HomeTeacherScreen {...props} data={route.params.data} />}
      </Tab.Screen>
      <Tab.Screen
        name="Calendar"
        options={{
          tabBarColor: "#041C32",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar-month"
              color={color}
              size={26}
            />
          ),
        }}
      >
        {(props) => (
          <CalendarTeacherScreen {...props} data={route.params.data} />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Scanner"
        options={{
          tabBarColor: "#041C32",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              color={color}
              size={26}
            />
          ),
        }}
      >
        {(props) => <ScannerScreen {...props} data={route.params.data} />}
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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: "LearnApp",
            }}
          />
          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={({ navigation }) => ({
              title: "LearnApp",
              headerLeft: () => null,
              headerRight: () => (
                <MaterialCommunityIcons
                  name="dots-vertical"
                  onPress={() => navigation.navigate("Login")}
                  title="Log Out"
                  color="#5c5c5c"
                  size={26}
                />
              ),
            })}
          />
          <Stack.Screen
            name="MyTabsTeacher"
            component={MyTabsTeacher}
            options={({ navigation }) => ({
              title: "LearnApp",
              headerLeft: () => null,
              headerRight: () => (
                <MaterialCommunityIcons
                  name="dots-vertical"
                  onPress={() => navigation.navigate("Login")}
                  title="Log Out"
                  color="#5c5c5c"
                  size={26}
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;

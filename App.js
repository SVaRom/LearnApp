// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Menu, Box, Pressable, NativeBaseProvider } from "native-base";
import HomeScreen from "./src/Screens/Student/Home";
import LoginScreen from "./src/Screens/Login";
import ProfileScreen from "./src/Screens/Student/Profile";
import CalendarScreen from "./src/Screens/Student/Calendar";
import HistoryScreen from "./src/Screens/Student/History";
import HomeTeacherScreen from "./src/Screens/Teacher/Home";
import RegisterScreen from "./src/Screens/Register";
import CalendarTeacherScreen from "./src/Screens/Teacher/Calendario";
import ScannerScreen from "./src/Screens/Teacher/Scanner";
import ProfileTeacherScreen from "./src/Screens/Teacher/Profile";
import UpdateScreen from "./src/Screens/Identity";
import ForgotScreen from "./src/Screens/Forgot";
import ChangeScreen2 from "./src/Screens/ForgotLogged";
import Attendance from "./src/Screens/Teacher/Attendance";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
          tabBarColor: "#006a85",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      >
        {(props) => <HomeTeacherScreen {...props} data={route.params.data} />}
      </Tab.Screen>
      <Tab.Screen
        name="Calendario"
        options={{
          tabBarColor: "#290a80",
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
          tabBarColor: "#810b81",
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
      <Tab.Screen
        name="Profile"
        options={{
          tabBarColor: "#179e6a",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      >
        {(props) => (
          <ProfileTeacherScreen {...props} data={route.params.data} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const LogoutMenu = () => {
  const navigation = useNavigation();
  return (
    <Box>
      <Menu
        defaultIsOpen={false}
        w="190"
        trigger={(triggerProps) => {
          return (
            <Pressable {...triggerProps}>
              <MaterialCommunityIcons
                name="dots-vertical"
                color="#5c5c5c"
                size={26}
              />
            </Pressable>
          );
        }}
      >
        <Menu.Item onPress={() => navigation.navigate("Login")}>
          Log Out
        </Menu.Item>
      </Menu>
    </Box>
  );
};

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
            options={{
              title: "LearnApp",
              headerBackVisible: false,
              headerLeft: () => null,
              headerRight: () => <LogoutMenu />,
            }}
          />
          <Stack.Screen
            name="MyTabsTeacher"
            component={MyTabsTeacher}
            options={{
              title: "LearnApp",
              headerBackVisible: false,
              headerLeft: () => null,
              headerRight: () => <LogoutMenu />,
            }}
          />
          <Stack.Screen
            name="Identity"
            component={UpdateScreen}
            options={{
              title: "LearnApp",
            }}
          />
          <Stack.Screen
            name="Forgot"
            component={ForgotScreen}
            options={{
              title: "LearnApp",
            }}
          />
          <Stack.Screen
            name="Change"
            component={ChangeScreen2}
            options={{
              title: "LearnApp",
            }}
          />
          <Stack.Screen
            name="Attendance"
            component={Attendance}
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

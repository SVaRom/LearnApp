// In App.js in a new project

import * as React from "react";
import { auth } from "./database/firebase";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Menu, Box, Pressable, NativeBaseProvider } from "native-base";
import HomeScreen from "./src/Screens/Student/Home";
import LoginScreen from "./src/Screens/Login";
import ProfileScreen from "./src/Screens/Student/Profile";
import CalendarScreen from "./src/Screens/Student/Calendar";
import HistoryScreen from "./src/Screens/Student/History";
import HomeTeacherScreen from "./src/Screens/Teacher/Home";
import CreateAsesoriaScreen from "./src/Screens/Teacher/Create";
import DetailsScreen from "./src/Screens/Teacher/Details";
import DayDetails from "./src/Screens/Teacher/SelectedDay";
import DayDetailsS from "./src/Screens/Student/SelectedDay";
import RegisterScreen from "./src/Screens/Register";
import CalendarTeacherScreen from "./src/Screens/Teacher/Calendario";
import ScannerScreen from "./src/Screens/Teacher/Scanner";
import ProfileTeacherScreen from "./src/Screens/Teacher/Profile";
import UpdateScreen from "./src/Screens/Identity";
import ChangeScreen2 from "./src/Screens/ForgotLogged";
import Attendance from "./src/Screens/Teacher/Attendance";
import Rating from "./src/Screens/Rating";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import SSRProvider from "react-bootstrap/SSRProvider";

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
        name="Calendar"
        options={{
          tabBarColor: "#041C32",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}
      >
        {(props) => <CalendarScreen {...props} data={route.params.data} />}
      </Tab.Screen>
      <Tab.Screen
        name="History"
        options={{
          tabBarColor: "#041C32",
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
          tabBarColor: "#041C32",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      >
        {(props) => (
          <ProfileScreen
            {...props}
            data={route.params.data}
            id={route.params.id}
          />
        )}
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
      <Tab.Screen
        name="Profile"
        options={{
          tabBarColor: "#041C32",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      >
        {(props) => (
          <ProfileTeacherScreen
            {...props}
            data={route.params.data}
            id={route.params.id}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
const LogoutMenu = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
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
        <Menu.Item onPress={handleSignOut}>Log Out</Menu.Item>
      </Menu>
    </Box>
  );
};

const App = () => {
  return (
    <SSRProvider>
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
            <Stack.Screen
              name="Create"
              component={CreateAsesoriaScreen}
              options={{
                title: "LearnApp",
              }}
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{
                title: "LearnApp",
              }}
            />
            <Stack.Screen
              name="DayDetails"
              component={DayDetails}
              options={{
                title: "LearnApp",
              }}
            />
            <Stack.Screen
              name="DayDetailsS"
              component={DayDetailsS}
              options={{
                title: "LearnApp",
              }}
            />
            <Stack.Screen
              name="Rating"
              component={Rating}
              options={{
                title: "LearnApp",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SSRProvider>
  );
};

export default App;

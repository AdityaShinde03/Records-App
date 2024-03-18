import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const StackNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Stack = createNativeStackNavigator();

  function StackNav() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
      </Stack.Navigator>
    );
  }

  function BottomTabs() {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#0F0F0F",
            borderTopColor: "#212121",
            borderTopWidth: 0.5,
            paddingBottom: 4,
          },
          tabBarActiveTintColor: "#2B9D64",
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => {
              return <Entypo name="home" size={24} color={color} />;
            },
          }}
        />

        <Tab.Screen
          name="Profile"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => {
              return <FontAwesome name="user" size={24} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  // const LoginNav = () => {
  //   return(
  //   <Stack.Navigator screenOptions={{ headerShown: false }}>
  //     <Stack.Screen
  //       name="login"
  //       component={LoginScreen}
  //       options={{
  //         headerShown: false,
  //       }}
  //     />
  //     <Stack.Screen
  //       name="register"
  //       component={RegisterScreen}
  //       options={{ headerShown: false }}
  //     />
  //     <Stack.Screen
  //       name="main"
  //       component={BottomTabs}
  //       options={{ headerShown: false }}
  //     />
  //   </Stack.Navigator>
  //   );
  // };

  const getData = () => {
    const data = AsyncStorage.getItem("isLoggedIn");
    console.log(data);
    setIsLoggedIn(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="login"
              component={LoginScreen}
            />
            <Stack.Screen
              name="register"
              component={RegisterScreen}

            />
            {isLoggedIn?<Stack.Screen
            name="main"
            component={BottomTabs}
          />:<></>}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});

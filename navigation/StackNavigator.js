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
import ProfileScreen from "../screens/ProfileScreen";
import ClientDetailsScreen from "../screens/ClientDetailsScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";




const StackNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();


  function StackNav() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="main" component={BottomTabs} />
        <Stack.Screen name="clientDetails" component={ClientDetailsScreen} />
        <Stack.Screen name="orderDetails" component={OrderDetailsScreen} />
        <Stack.Screen name="loginUser" component={LoginNav} />
      </Stack.Navigator>
    );
  }

  function BottomTabs() {
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
          tabBarHideOnKeyboard: true,
          tabBarVisibilityAnimationConfig: false,
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
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => {
              return <FontAwesome name="user" size={24} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("isLoggedIn");
      if (data !== null) {
        console.log("is LoggedIn data is here", JSON.stringify(data));
        setIsLoggedIn(JSON.parse(data)); // Parse only if necessary
      } else {
        setIsLoggedIn(false); // or true depending on your default behavior
      }
    } catch (error) {
      console.error("Error reading isLoggedIn from AsyncStorage: ", error);
      // Handle error appropriately
    }

    // console.log("IsLoggedIn Data is here",JSON.parse(data))
    // setIsLoggedIn(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const LoginNav = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="main" component={StackNav} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="home" component={StackNav} />
        ) : (
          <>
            <Stack.Screen name="loginUser" component={LoginNav} />
            {/* <Stack.Screen name="register" component={RegisterScreen} /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});

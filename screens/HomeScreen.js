import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const logoutHandler = async() => {
    console.log("clicked")
   await AsyncStorage.setItem("isLoggedIn",'').then(()=>{
      console.log("successfully removed token")
    })
   await AsyncStorage.setItem("authToken",'')
    navigation.replace("login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F0F0F" }}>
      <Text style={{ color: "white" }}>HomeScreen</Text>
      <View>
        <Pressable
          style={{ padding: 10, backgroundColor: "#2B9D64" }}
          onPress={logoutHandler}
        >
          <Text style={{ color: "white" }}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

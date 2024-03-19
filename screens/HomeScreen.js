import {
  Animated,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { clients } from "../clients";
import Client from "../components/Client";
import SearchBar from "../components/SearchBar";

const HomeScreen = () => {
  const navigation = useNavigation();
  const logoutHandler = async () => {
    console.log("clicked");
    await AsyncStorage.setItem("isLoggedIn", "").then(() => {
      console.log("successfully removed token");
    });
    await AsyncStorage.setItem("authToken", "");
    navigation.replace("loginUser");
  };

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 100);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F0F0F",position:"relative"}}>
      <View>
        <Animated.View
          style={{
            alignItems: "center",
            paddingTop:8,
            transform: [
              {
                translateY: translateY,
              },
            ],
            zIndex: 100,
            position: "absolute",
            top: 0,
            left: 0,
            right:0,
            backgroundColor:"#0F0F0F"
          }}
        >
          <SearchBar filterList={clients} />
        </Animated.View>

        {/* <View horizontal={true} style={{ marginLeft: 25 }}>
          <Text
            style={{ color: "#868686", textAlign: "left", letterSpacing: 0.5 }}
          >
            Clients
          </Text>
        </View> */}

        <FlatList
        style={{paddingTop:80,borderBottomWidth:0.5,borderBottomColor:"#26282a"}}
          onScroll={(e) => {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}
          contentContainerStyle={{ }}
          data={clients}
          renderItem={({ item }) => <Client client={item} />}
        />
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

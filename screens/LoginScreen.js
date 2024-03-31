import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const onPressHandler = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post("https://records-app-0vuo.onrender.com/login", user)
      .then((res) => {
        console.log(res);
        const token = res.data.token;
        AsyncStorage.setItem("authToken", token);
        console.log(token);
        AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
        navigation.replace("main");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Error occured while login");
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent style="light" />
      <ImageBackground
        style={styles.backgroundImg}
        resizeMode="cover"
        source={require("../assets/bg-img.png")}
      >
        <View style={styles.headerContainer}>
          <Image
            resizeMode="contain"
            style={{ width: 150, height: 100, marginTop: 50, marginBottom: 20 }}
            source={require("../assets/Records.png")}
          />
          <KeyboardAvoidingView>
            <Text style={styles.loginTitle}>Login to your account</Text>
          </KeyboardAvoidingView>
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={28}
            color="#545454"
          />
          <TextInput
            value={email}
            onChangeText={(enteredEmail) => setEmail(enteredEmail)}
            placeholderTextColor="#5D5D5D"
            selectionColor="#5D5D5D"
            style={{
              backgroundColor: "transparent",
              fontSize: 20,
              color: "white",
              width: "85%",
            }}
            placeholder="enter your email"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome6 name="lock" size={24} color="#545454" />
          <TextInput
            value={password}
            placeholderTextColor="#5D5D5D"
            selectionColor="#5D5D5D"
            secureTextEntry={true}
            style={{
              backgroundColor: "transparent",
              fontSize: 20,
              color: "white",
              width: "85%",
            }}
            placeholder="enter your password"
            onChangeText={(enteredPassword) => setPassword(enteredPassword)}
          />
        </View>
        <Pressable
          style={styles.loginBtn}
          android_disableSound={true}
          onPress={onPressHandler}
        >
          <Text
            style={{
              color: "#2B9D64",
              fontWeight: "700",
              fontSize: 24,
              textAlign: "center",
            }}
          >
            Login
          </Text>
        </Pressable>
        <Pressable
          android_disableSound={true}
          onPress={() => navigation.navigate("register")}
        >
          <Text style={{ color: "gray", fontSize: 18 }}>
            Don't have an account?{" "}
            <Text style={{ color: "white" }}>create one</Text>
          </Text>
        </Pressable>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0F0F0F",
    flex: 1,
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    height: 250,
    marginBottom: 60,
    backgroundColor: "#0F0F0F",
    borderWidth: 0.1,
    borderBottomWidth: 1,
    borderLeftColor: "#2B9D64",
    borderRightColor: "#2B9D64",
    borderBottomColor: "#2B9D64",
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
    alignItems: "center",
    elevation: Platform.OS === "android" ? 60 : undefined,
    shadowColor: "#2B9D64",
    shadowOffset: { width: 0, height: 2 }, // shadow offset
    shadowOpacity: 0.5, // shadow opacity
    shadowRadius: 4, // shadow radius
  },
  loginTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "white",
  },
  backgroundImg: {
    // height: "100%",
    // width: "100%",
    alignItems: "center",
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  inputContainer: {
    width: 360,
    height: 60,
    marginTop: 35,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 0.8,
    borderColor: "#BBBBBB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0F0F0F",
    borderRadius: 40,
  },
  loginBtn: {
    width: 240,
    marginTop: 130,
    marginBottom: 20,
    backgroundColor: "#0F0F0F",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 40,
    borderWidth: 0.8,
    borderColor: "#7f3df5",
  },
});

import { Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Avatar, Divider, Text } from "react-native-paper";

const ProfileScreen = () => {
  const [userData, setUserData] = useState("");

  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [totalClients, setTotalClients] = useState(0);

  useEffect(() => {
    fetchTotalClients();
  }, []);

  const fetchTotalClients = async () => {
    try {
      // Retrieve total clients count from AsyncStorage
      const totalClientsCount = await AsyncStorage.getItem("totalClients");
      if (totalClientsCount !== null) {
        setTotalClients(parseInt(totalClientsCount, 10));
      } else {
        setTotalClients(0);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching total clients count:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const logoutHandler = async () => {
    await AsyncStorage.setItem("isLoggedIn", "").then(() => {
      console.log("successfully removed token");
    });
    await AsyncStorage.removeItem("authToken");
    // AsyncStorage.clear();
    navigation.replace("loginUser");
  };

  const getUserData = async () => {
    const token = await AsyncStorage.getItem("authToken");
    // console.log(token);
    axios
      .post("http://10.0.2.2:8000/userdata", { token: token })
      .then((res) => {
        setUserData(res.data.userData);
        // console.log(res.data.userData);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0F0F0F", alignItems: "center" }}>
      {/* <View
        style={{
          width: 200,
          height: 200,
          backgroundColor: "#0F0F0F",
          marginTop: 50,
          marginBottom: 25,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: "#2B9D64",
        }}
      >
        <Text style={{ color: "white", fontSize: 158, textAlign: "center" }}>
          {userData.name?.slice(0, 1)}
        </Text>
      </View> */}
      <Avatar.Text
        style={{
          marginTop: 50,
          marginBottom: 20,
          backgroundColor: "#e8a592",
          elevation: 50,
          shadowColor: "white",
        }}
        labelStyle={{ fontSize: 100 }}
        color="black"
        size={150}
        label={userData.name?.slice(0, 1)}
      />
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 38,
          fontWeight: "700",
        }}
      >
        {userData.name}
      </Text>

      <View style={{marginTop:30}}>
        <View style={{ flexDirection: "row", marginVertical: 20  }}>
          <Text variant="headlineSmall" style={{ color: "gray", fontWeight:"700" }}>
            Email ~{" "}
          </Text>
          <Text style={{ color: "violet" }} variant="headlineSmall">
            {userData.email}
          </Text>
        </View>
        <Divider style={styles.dividerStyle} />
        <View style={{ flexDirection: "row", marginVertical: 20 }}>
          <Text variant="headlineSmall" style={{ color: "gray", fontWeight:"700" }}>
            Total Clients ~
          </Text>
          <Text style={{ color: "violet" }} variant="headlineSmall">
            {" "}
            {totalClients}
          </Text>
        </View>
        <Divider style={styles.dividerStyle} />
        <View style={{ flexDirection: "row", marginVertical: 20 }}>
          <Text variant="headlineSmall" style={{ color: "gray", fontWeight:"700" }}>
            Total Orders ~
          </Text>
          <Text style={{ color: "violet" }} variant="headlineSmall">
            {" "}
            {0}
          </Text>
        </View>
        <Divider style={styles.dividerStyle} />
      </View>

      <Pressable
        style={{
          width: 200,
          padding: 15,
          backgroundColor: "#2B9D64",
          borderRadius: 12,
          marginVertical: 50,
        }}
        onPress={logoutHandler}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "700",
            fontSize: 20,
          }}
        >
          Logout
        </Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  dividerStyle:{
    backgroundColor:"#26282a"
  }
});

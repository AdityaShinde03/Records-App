import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const ProfileScreen = () => {

  const [userData,setUserData] = useState("")


  const navigation = useNavigation();


  const logoutHandler = async () => {
    await AsyncStorage.setItem("isLoggedIn","").then(() => {
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

  useEffect(() => {
    getUserData();
  }, []);

  
  return (
    <View style={{flex:1, backgroundColor:"#0F0F0F",alignItems:"center",justifyContent:"center"}}>
      <Text style={{color:"white",textAlign:"center"}}>{userData.name}</Text>
      <Pressable
          style={{width:100, padding: 10, backgroundColor: "#2B9D64",borderRadius:10 }}
          onPress={logoutHandler}
        >
          <Text style={{ color: "white",textAlign:"center" }}>Logout</Text>
        </Pressable>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})
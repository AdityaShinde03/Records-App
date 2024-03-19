import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Client = ({ client }) => {
    const navigation = useNavigation();
    const [clients,setClients] = useState(client)

  return (
    <Pressable onPress={()=>{navigation.navigate("clientDetails")}} style={styles.clientsContainer}>
    <View style={styles.imgContainer}></View>
      <View>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
          {clients.name}
        </Text>
        <Text style={{ color: "#4d5154", fontSize:16 }}>{clients.companyName}</Text>
      </View>
    </Pressable>
  );
};

export default Client;

const bottomBorderColor = "#26282a";

const styles = StyleSheet.create({
  clientsContainer: {
    width: "100%",
    height: 80,
    borderBottomWidth: 0.5,
    borderBottomColor: bottomBorderColor,
    flexDirection:"row",
    gap:20,
    alignItems:"center",
    paddingHorizontal:5
  },
  imgContainer:{
    width:40,
    height:40,
    borderRadius:30,
    backgroundColor:"gray"
  }
});

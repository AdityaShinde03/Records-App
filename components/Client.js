import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Client = ({ client }) => {
  const navigation = useNavigation();
  // const [clients, setClients] = useState(client);
  const [color, setColor] = useState("gray");

  const colors = [
    "#e91e63",
    "#f44336",
    "#8a4af3",
    "#673ab7",
    "#3f51b5",
    "#00bcd4",
    "#009688",
    "#f4f3f9",
    "#5475b8",
    "#e8a592",
  ];

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  useEffect(() => {
    setColor(getRandomColor());
  }, []);

  return (
    <Pressable
      key={client._id}
      onPress={() => {
        navigation.navigate("clientDetails", {
          clientId:client._id,
          clientName: client.clientName,
          companyName: client.companyName,
        });
      }}
      style={styles.clientsContainer}
    >
      <View style={[styles.imgContainer, { backgroundColor: color }]}>
        <Text style={{ textAlign: "center", fontSize: 22 }}>
          {client.clientName.slice(0, 1)}
        </Text>
      </View>
      <View>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
          {client.clientName}
        </Text>
        <Text style={{ color: "#4d5154", fontSize: 16, marginTop: 3 }}>
          {client.companyName}
        </Text>
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
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    paddingHorizontal: 5,
  },
  imgContainer: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

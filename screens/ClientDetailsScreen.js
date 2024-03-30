import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Order from "../components/Order";
import axios from "axios";
import { useOrderContext } from "../contexts/orderContext";


const ClientDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { clientId, clientName, companyName } = route.params;

  // const [order, setOrder] = useState([]);
  const {order, addNewOrder, setNewOrder} = useOrderContext();

  const getOrderData = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/order/${clientId}`
      );

      console.log(response.data);
      setNewOrder(response.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  console.log("This is orders from context",order)

  // const handelAddNewOrder = async(newOrder)=>{
  //   try {
  //     const updatedOrders = [...order, newOrder];
  //     setOrder(updatedOrders);

  //     // Pass the new order back to the previous screen
  //     navigation.navigate("clientDetails", { newOrder: newOrder });
  //   } catch (error) {
  //     console.error("Error adding new order:", error);
  //   }
  //   // setOrder((prevOrder)=>[...prevOrder,newOrder]);
  // }

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: "#0F0F0F" }}
    >
      <Appbar.Header style={{ width: "100%", backgroundColor: "#0F0F0F" }}>
        <Appbar.BackAction
          color="gray"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content color="#2B9D64" title={clientName} />
      </Appbar.Header>

      <View
        style={{
          backgroundColor: "#2B9D64",
          width: "100%",
          alignItems: "center",
          paddingVertical: 3,
        }}
      >
        <Text style={{ fontSize: 18, color: "white", textAlign: "center" }}>
          {companyName}
        </Text>
      </View>
      <FlatList
      style={{width:"100%"}}
      contentContainerStyle={{gap:10,marginTop:20,paddingBottom:30,paddingHorizontal:8,paddingTop:10}}
        data={order.reverse()}
        renderItem={({ item }) => <Order order={item} />}
        keyboardShouldPersistTaps="always"
      />
      <Pressable
        style={{
          backgroundColor: "#2B9D64",
          padding: 14,
          width: 160,
          borderRadius: 10,
          position:"absolute",
          bottom:20,
          right:10
        }}
        onPress={() =>
          navigation.navigate("orderDetails", {
            clientId: clientId,
            clientName: clientName,
            companyName: companyName,
            // handelAddNewOrder:handelAddNewOrder
          })
        }
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Create Order
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ClientDetailsScreen;

const styles = StyleSheet.create({});

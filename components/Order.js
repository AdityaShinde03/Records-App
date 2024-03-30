import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


const Order = ({ order }) => {
  const navigation = useNavigation();
  function formatDate(rawDate) {
    const date = new Date(rawDate);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  const formattedorderDate = formatDate(order.orderDate);
  const formatteddispatchedDate = formatDate(order.dispatchedDate);
  return (
    <Pressable onPress={()=>{
      navigation.navigate("singleOrderDetails",{
        order:order,
        formattedorderDate:formattedorderDate,
        formatteddispatchedDate:formatteddispatchedDate
      })
    }} style={styles.orderContainer}>
      <Text style={styles.textContainer}><Text style={{fontWeight:"700"}}>Order ID :</Text> {order._id}</Text>
      <Text style={[styles.textContainer]}><Text style={{fontWeight:"700"}}>Type Of Spring : </Text>{order.typesOfSpring}</Text>
      <View
        style={{
          width: "100%",
          // paddingHorizontal: 20,
          // flexDirection: "row",
          justifyContent: "space-between",
          gap:5
          // marginTop:10
        }}
      >
        <View style={{flexDirection:"row",gap:10}}>
          <Text style={[styles.textContainer,{fontWeight:"700"}]}>Order Date :</Text>
          <Text style={styles.textContainer}>{formattedorderDate}</Text>
        </View>

        <View style={{flexDirection:"row",gap:10}}>
          <Text style={[styles.textContainer,{fontWeight:"700"}]}>Dispatch Date :</Text>
          <Text style={styles.textContainer}>{formatteddispatchedDate}</Text>
        </View>
      </View>

        <View style={{position:"absolute",bottom:10,
        right:20}}>
          <Pressable onPress={()=>{navigation.navigate("singleOrderDetails",{order:order,formattedorderDate:formattedorderDate,formatteddispatchedDate:formatteddispatchedDate})}}>
            <Entypo name="arrow-with-circle-right" size={32} color="#2B9D64" />
          </Pressable>
        </View>
    </Pressable>
  );
};

export default Order;

const styles = StyleSheet.create({
  orderContainer: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    backgroundColor: "#1a1a1c",
    // alignItems: "center",
    justifyContent:"center",
   paddingHorizontal:15,
   gap:5,
   borderWidth:1,
   borderColor:"#26282a",
   position:"relative"
  },
  textContainer: { color: "white", 
  // textAlign: "center"
 },
});

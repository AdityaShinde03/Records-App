import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Order = ({order}) => {
  return (
    <View style={styles.orderContainer}>
        <Text style={styles.textContainer}>{order._id}</Text>
      <Text style={styles.textContainer}>{order.typesOfSpring}</Text>
    </View>
  )
}

export default Order

const styles = StyleSheet.create({
    orderContainer:{
        width:"100%",
        height:200,
        borderRadius:18,
        backgroundColor:"#003366",
        alignItems:"center"
    },
    textContainer:{color:"white",textAlign:"center"},
})
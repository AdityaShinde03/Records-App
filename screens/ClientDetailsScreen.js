import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const ClientDetailsScreen = () => {
  const route = useRoute();
  const {clientName,companyName} = route.params;
  return (
    <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"#0F0F0F"}}>
      <Text style={{color:"white"}}>{clientName}</Text>
      <Text style={{color:"white"}}>{companyName}</Text>
    </View>
  )
}

export default ClientDetailsScreen

const styles = StyleSheet.create({})
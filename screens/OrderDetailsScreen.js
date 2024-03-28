import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Appbar, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import axios from "axios";
import { useOrderContext } from "../contexts/orderContext";

const OrderDetailsScreen = () => {
  const [formValues, setFormValues] = useState({
    typeOfSpring: "",
    wireDiameter: "",
    outerDiameter: "",
    numberOfTurns: "",
    lengthOfSpring: "",
    quantity: "",
    dispatchDate: null,
    transportName: "",
    remark: "",
  });
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dispatchDate, setDispatchDate] = useState(null);
  const navigation = useNavigation();

  const route = useRoute();
  const { clientId, clientName, companyName} = route.params;
  const { addNewOrder } = useOrderContext();

  const handleChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onChangeDate = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setDispatchDate(formatDate(currentDate));
        handleChange("dispatchDate", currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}-${month}-${year}`;
  };

  const handleSaveOrder = async () => {
    try {
      const orderDetails = {
        orderDate: date,
        partyName: clientId,
        typesOfSpring: formValues.typeOfSpring,
        wireDia: formValues.wireDiameter,
        outerDia: formValues.outerDiameter,
        numberOfTurns: formValues.numberOfTurns,
        length: formValues.lengthOfSpring,
        quantity: formValues.quantity,
        dispatchDate: formValues.dispatchDate,
        transportName: formValues.transportName,
        remark: formValues.remark,
      };
      const response = await axios.post(
        "http://10.0.2.2:8000/order",
        orderDetails
      );

      addNewOrder(response.data.newOrder);
      console.log("Order saved successfully!");
      setFormValues({
        typeOfSpring: "",
        wireDiameter: "",
        outerDiameter: "",
        numberOfTurns: "",
        lengthOfSpring: "",
        quantity: "",
        dispatchDate: null,
        transportName: "",
        remark: "",
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#0F0F0F", flex: 1 }}>
      <Appbar.Header style={{ width: "100%", backgroundColor: "#0F0F0F" }}>
        <Appbar.BackAction
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content color="#2B9D64" title="Create Order" />
      </Appbar.Header>
      <View
        style={{
          backgroundColor: "#2B9D64",
          width: "100%",
          alignItems: "center",
          paddingVertical: 2,
        }}
      >
        <Text style={{ fontSize: 16, color: "white", textAlign: "center" }}>
          *Please fillout all order details given below*.
        </Text>
      </View>
      <ScrollView
        style={{}}
        contentContainerStyle={{
          alignItems: "center",
          gap: 35,
          paddingTop: 20,
          paddingBottom: 50,
        }}
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          style={{ backgroundColor: "#0F0F0F", width: "90%" }}
          mode="outlined"
          outlineColor="gray"
          textColor="white"
          activeOutlineColor="#2B9D64"
          placeholder="Type of Spring"
          label="Types of Springs"
          onChangeText={(value) => {
            handleChange("typeOfSpring", value);
          }}
        />
        <TextInput
          style={{ backgroundColor: "#0F0F0F", width: "90%" }}
          mode="outlined"
          outlineColor="gray"
          textColor="white"
          activeOutlineColor="#2B9D64"
          placeholder="Wire Diameter"
          label="Wire Diameter"
          onChangeText={(value) => {
            handleChange("wireDiameter", value);
          }}
        />
        <TextInput
          style={{ backgroundColor: "#0F0F0F", width: "90%" }}
          mode="outlined"
          outlineColor="gray"
          textColor="white"
          activeOutlineColor="#2B9D64"
          placeholder="Outer Diameter (OD)"
          label="Outer Diameter (OD)"
          onChangeText={(value) => {
            handleChange("outerDiameter", value);
          }}
        />
        <TextInput
          style={{ backgroundColor: "#0F0F0F", width: "90%" }}
          mode="outlined"
          outlineColor="gray"
          textColor="white"
          activeOutlineColor="#2B9D64"
          placeholder="Number of Turns"
          label="Number of Turns"
          onChangeText={(value) => {
            handleChange("numberOfTurns", value);
          }}
        />
        <TextInput
          style={{ backgroundColor: "#0F0F0F", width: "90%" }}
          mode="outlined"
          outlineColor="gray"
          textColor="white"
          activeOutlineColor="#2B9D64"
          placeholder="Length of Spring"
          label="Length of Spring"
          onChangeText={(value) => {
            handleChange("lengthOfSpring", value);
          }}
        />
        <TextInput
          style={{ backgroundColor: "#0F0F0F", width: "90%" }}
          mode="outlined"
          outlineColor="gray"
          textColor="white"
          activeOutlineColor="#2B9D64"
          placeholder="Quantity"
          label="Quantity"
          onChangeText={(value) => {
            handleChange("quantity", value);
          }}
        />
        <Pressable style={{ width: "90%" }} onPress={toggleDatePicker}>
          <TextInput
            style={{ backgroundColor: "#0F0F0F" }}
            mode="outlined"
            outlineColor="gray"
            textColor="white"
            activeOutlineColor="#2B9D64"
            placeholder="Date Picker"
            label="Pick Dispatch Date"
            editable={false}
            value={dispatchDate}
          />
        </Pressable>

        <TextInput
          style={{ backgroundColor: "#0F0F0F", width: "90%" }}
          mode="outlined"
          outlineColor="gray"
          textColor="white"
          activeOutlineColor="#2B9D64"
          placeholder="Transport Name"
          label="Transport Name"
          onChangeText={(value) => {
            handleChange("transportName", value);
          }}
        />
        <TextInput
          style={{ backgroundColor: "#0F0F0F", width: "90%" }}
          mode="outlined"
          outlineColor="gray"
          textColor="white"
          activeOutlineColor="#2B9D64"
          placeholder="Remark"
          label="Remark"
          multiline={true}
          onChangeText={(value) => {
            handleChange("remark", value);
          }}
        />

        {showDatePicker && (
          <RNDateTimePicker
            display="spinner"
            value={date}
            themeVariant="dark"
            onChange={onChangeDate}
            minimumDate={date}
          />
        )}
      </ScrollView>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 30, justifyContent:"center", paddingVertical:18, borderTopWidth:.5, borderTopColor:"#26282a" }}>
        <Pressable
          style={{
            backgroundColor: "#2B9D64",
            padding: 10,
            width: 120,
            borderRadius: 8,
          }}
          onPress={handleSaveOrder}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Save</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#2B9D64",
            padding: 10,
            width: 120,
            borderRadius: 8,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Cancel</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({});

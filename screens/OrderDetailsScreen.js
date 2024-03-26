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
import { useNavigation } from "@react-navigation/native";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

const OrderDetailsScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dispatchDate, setDispatchDate] = useState(null);
  const navigation = useNavigation();

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
          Please fill your order details.
        </Text>
      </View>
      <ScrollView
        style={{}}
        contentContainerStyle={{
          alignItems: "center",
          gap: 35,
          paddingTop: 20,
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
        />
        <TextInput
          style={{ backgroundColor: "#0F0F0F", width: "90%" }}
          mode="outlined"
          outlineColor="gray"
          textColor="white"
          activeOutlineColor="#2B9D64"
          placeholder="Wire Diameter"
          label="Wire Diameter"
        />
        <TextInput
          style={{ backgroundColor: "#0F0F0F", width: "90%" }}
          mode="outlined"
          outlineColor="gray"
          textColor="white"
          activeOutlineColor="#2B9D64"
          placeholder="Outer Diameter (OD)"
          label="Outer Diameter (OD)"
        />
        <TextInput
          style={{ backgroundColor: "#0F0F0F", width: "90%" }}
          mode="outlined"
          outlineColor="gray"
          textColor="white"
          activeOutlineColor="#2B9D64"
          placeholder="Number of Turns"
          label="Number of Turns"
        />
        <TextInput
          style={{ backgroundColor: "#0F0F0F", width: "90%" }}
          mode="outlined"
          outlineColor="gray"
          textColor="white"
          activeOutlineColor="#2B9D64"
          placeholder="Length of Spring"
          label="Length of Spring"
        />
        <TextInput
          style={{ backgroundColor: "#0F0F0F", width: "90%" }}
          mode="outlined"
          outlineColor="gray"
          textColor="white"
          activeOutlineColor="#2B9D64"
          placeholder="Quantity"
          label="Quantity"
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
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({});

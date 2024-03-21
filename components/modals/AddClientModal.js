import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import InputComponent from "../InputComponent";
import { useNavigation } from "@react-navigation/native";
import { clients } from "../../clients";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddClientModal = ({ openModal, setOpenModal, addClientHandler, userData }) => {
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [clientMobileNumber, setClientMobileNumber] = useState("");
  const navigation = useNavigation();
  const addNewClientHandler = async () => {

    const client = {
      clientName: clientName,
      companyName: companyName,
      clientMobileNumber: clientMobileNumber,
      createdByUser: userData._id
    };
    const response = await axios.post("http://10.0.2.2:8000/client", client);
    console.log(response.data);
    addClientHandler(response.data.newClient);
    setClientName("");
    setCompanyName("");
    setClientMobileNumber("");
    setOpenModal(false);
  };

  return (
    // <ScrollView  keyboardShouldPersistTaps={true} horizontal={true}>
    <Modal visible={openModal} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <Text
            style={{
              color: "#2B9D64",
              fontSize: 22,
              fontWeight: "700",
              marginVertical: 20,
            }}
          >
            Add a new client
          </Text>
          <InputComponent
            placeholder="Enter client's name"
            labelName="Client's Name"
            inputValue={clientName}
            setInputValue={setClientName}
          />
          <InputComponent
            placeholder="Enter client's name"
            labelName="Company's Name"
            inputValue={companyName}
            setInputValue={setCompanyName}
          />
          <InputComponent
            placeholder="Enter client's mobile number"
            labelName="Client's Mobile Number"
            inputValue={clientMobileNumber}
            setInputValue={setClientMobileNumber}
          />
          <View
            style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}
          >
            <Pressable style={styles.cancleBtn} onPress={addNewClientHandler}>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                Add
              </Text>
            </Pressable>
            <Pressable
              style={styles.cancleBtn}
              onPress={() => {
                setOpenModal(false);
                navigation.navigate("Home");
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                Cancle
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
    // </ScrollView>
  );
};

export default AddClientModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  container: {
    paddingHorizontal: 25,
    backgroundColor: "#0F0F0F",
    width: "100%",
    height: 450,
    // alignItems:"center",
    elevation: 50,
    shadowColor: "#2B9D64",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderWidth: 0.1,
    borderTopWidth: 0.5,
    borderTopColor: "#2B9D64",
    borderLeftColor: "#2B9D64",
    borderRightColor: "#2B9D64",
  },
  cancleBtn: {
    width: 100,
    padding: 5,
    backgroundColor: "#2B9D64",
    borderRadius: 4,
    margin: 5,
  },
});

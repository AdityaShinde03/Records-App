import {
  Animated,
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { clients } from "../clients";
import Client from "../components/Client";
import SearchBar from "../components/SearchBar";
import { FontAwesome6 } from "@expo/vector-icons";
import AddClientModal from "../components/modals/AddClientModal";
import { AnimatedFAB } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 100);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
  });

  const [openModal, setOpenModal] = useState(false);
  const [totalClients, setTotalClients] = useState([]);
  const [isExtended, setIsExtended] = useState(true);
  const [userData, setUserData] = useState("");

  const isIOS = Platform.OS === "ios";

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    if (currentScrollPosition <= 50) {
      setIsExtended(true);
    } else {
      setIsExtended(false);
    }
  };
  const fabStyle = { right: 16 };

  const getUserData = async () => {
    const token = await AsyncStorage.getItem("authToken");
    // console.log(token);
    axios
      .post("http://10.0.2.2:8000/userdata", { token: token })
      .then((res) => {
        setUserData(res.data.userData);
        getData(res.data.userData);
        // console.log(res.data.userData);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getData = async (user) => {
    try {
      const id = user._id;
      console.log(id);
      const response = await axios.get(`http://10.0.2.2:8000/client/${id}`);
      const allClients = response.data.allClients;
      setTotalClients(allClients);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  const handleAddClient = (newClient) => {
    setTotalClients((prevClients) => [...prevClients, newClient]);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#0F0F0F", position: "relative" }}
    >
      <View>
        <Animated.View
          style={{
            alignItems: "center",
            paddingTop: 8,
            transform: [
              {
                translateY: translateY,
              },
            ],
            zIndex: 100,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "#0F0F0F",
          }}
        >
          <SearchBar filterList={clients} />
        </Animated.View>

        {/* <View horizontal={true} style={{ marginLeft: 25 }}>
          <Text
            style={{ color: "#868686", textAlign: "left", letterSpacing: 0.5 }}
          >
            Clients
          </Text>
        </View> */}

        <FlatList
          style={{
            paddingTop: 80,
            // borderBottomWidth: 0.5,
            // borderBottomColor: "#26282a",
          }}
          onScroll={(e) => {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
            onScroll(e);
          }}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={totalClients}
          renderItem={({ item }) => <Client client={item} />}
        />
      </View>
      {/* <Pressable onPress={()=>{setOpenModal(true)}} style={styles.addClientBtn}>
          <Text style={{color:"white",fontSize:20,fontWeight:"600",textAlign:"center"}}>Add Client</Text>
          <FontAwesome6 name="add" size={24} color="white" />
      </Pressable> */}
      <AnimatedFAB
        style={[styles.fabStyle, fabStyle]}
        color="white"
        icon={"plus"}
        label={"Add new client"}
        extended={isExtended}
        onPress={() => {
          setOpenModal(true);
        }}
        visible={true}
        iconMode={"static"}
      />

      {
        <AddClientModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          addClientHandler={handleAddClient}
          userData={userData}
        />
      }

      {/* {totalClients.length <= 0 ? (
        <View
          style={{
            width: 300,
            height: 180,
            backgroundColor: "#171819",
            marginVertical: "55%",
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: "13.5%",
            borderRadius: 25,
            elevation: 10,
            shadowColor: "#2B9D64",
          }}
        >
          <Text
            style={{
              color: "#2B9D64",
              fontSize: 22,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            You don't have any clients, Please add a new client
          </Text>
        </View>
      ) : null} */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  addClientBtn: {
    position: "absolute",
    bottom: 5,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    width: 160,
    backgroundColor: "#2B9D64",
    padding: 10,
    marginVertical: 2,
    borderRadius: 8,
    zIndex: 100,
    elevation: 20,
    shadowColor: "#2B9D64",
  },
  fabStyle: {
    bottom: 12,
    right: 16,
    position: "absolute",
    backgroundColor: "#2B9D64",
    elevation: 40,
    shadowColor: "#2B9D64",
  },
});

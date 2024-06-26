import {
  ActivityIndicator,
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
import { AnimatedFAB, Searchbar } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 100);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
  });

  const [loading, setLoading] = useState(true); // Track whether data is being fetched
  const [openModal, setOpenModal] = useState(false);
  const [totalClients, setTotalClients] = useState(null);
  const [isExtended, setIsExtended] = useState(true);
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);

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
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.post("https://records-app-0vuo.onrender.com/userdata", {
        token,
      });
      const userData = response.data.userData;
      setUserData(userData);
      getData(userData);
      console.log(userData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getData = async (user) => {
    try {
      const id = user._id;
      console.log(id);
      const response = await axios.get(`https://records-app-0vuo.onrender.com/client/${id}`);
      const allClients = response.data.allClients;
      setTotalClients(allClients);
      AsyncStorage.setItem("totalClients",allClients.length.toString()) // May be i change this line of code later...

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    filterClients();
  }, [totalClients, searchQuery]);

  const filterClients = () => {
    if (searchQuery.trim() === "") {
      setFilteredClients(totalClients);
    } else {
      const filtered = totalClients.filter((client) => {
        return (
          client.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.companyName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredClients(filtered);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
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
      {totalClients === null ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#2B9D64" />
        </View>
      ) : (
        <>
          {totalClients.length ? (
            <>
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
                  {/* <SearchBar filterList={clients} /> */}
                  <Searchbar
                    style={{
                      width:"95%",
                      backgroundColor: "#0F0F0F",
                      borderWidth: 1,
                      borderColor: "#5D5D5D",
                      color:"white",
                    }}
                    placeholder="Search your client"
                    placeholderTextColor="#5D5D5D"
                    selectionColor="#5D5D5D"
                    cursorColor="#5D5D5D"
                    value={searchQuery}
                    onChangeText={handleSearch}
                    iconColor="#2B9D64"
                  />
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
                  data={filteredClients}
                  renderItem={({ item }) => <Client client={item} />}
                  keyboardShouldPersistTaps="always"
                />
              </View>
              {/* <Pressable onPress={()=>{setOpenModal(true)}} style={styles.addClientBtn}>
          <Text style={{color:"white",fontSize:20,fontWeight:"600",textAlign:"center"}}>Add Client</Text>
          <FontAwesome6 name="add" size={24} color="white" />
      </Pressable> */}
            </>
          ) : (
            <View
              style={{
                position: "absolute",
                width: 300,
                height: 180,
                backgroundColor: "#171819",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 25,
                elevation: 10,
                shadowColor: "#2B9D64",
                top: "40%",
                left: 48,
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
          )}
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
        </>
      )}
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

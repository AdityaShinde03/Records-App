import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

const SearchBar = () => {
  const [query,setQuery] = useState();

  const filteredList = ({client})=>{
    client.filter((item)=>{
      return item.name.includes(query);
    })
  }

  return (
      <View filteredList = {filteredList} style={styles.inputContainer}>
        <FontAwesome name="search" size={22} color="#5D5D5D" />
        <TextInput
        value={query}
          style={{
            color: "white",
            fontSize: 16,
            width: "88%",
            backgroundColor: "#1a1a1c",
          }}
          placeholder="Search your client"
          placeholderTextColor="#5D5D5D"
          selectionColor="#5D5D5D"
          cursorColor="#5D5D5D"
          onChangeText={(searchedQuery)=>setQuery(searchedQuery)}
        />
      </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  inputContainer: {
    width: "90%",
    height: 56,
    paddingLeft: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1c",
    gap: 10,
    marginVertical:5,
    borderRadius: 34,
    elevation:10,
    shadowColor:"gray"
  },
});

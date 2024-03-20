import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const InputComponent = ({
  placeholder,
  labelName,
  inputValue,
  setInputValue,
}) => {
  return (
    <>
      <Text style={{ color: "gray", textAlign: "left", fontWeight: "500" }}>
        {labelName}
      </Text>
      <View style={styles.container}>
        <TextInput
          value={inputValue}
          style={{
            color: "white",
            fontSize: 16,
            width: "95%",
            backgroundColor: "#1a1a1c",
          }}
          placeholder={placeholder}
          placeholderTextColor="#5D5D5D"
          selectionColor="#5D5D5D"
          cursorColor="#5D5D5D"
          onChangeText={(enteredText)=>setInputValue(enteredText)}
        />
      </View>
    </>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 50,
    paddingLeft: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1c",
    gap: 10,
    marginVertical: 15,
    borderRadius: 34,
  },
});

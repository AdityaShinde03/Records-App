import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, TextInput } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

const SingleOrderDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { order, formattedorderDate, formatteddispatchedDate } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F0F0F" }}>
      <Appbar.Header style={{ width: "100%", backgroundColor: "#0F0F0F" }}>
        <Appbar.BackAction
          color="gray"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content color="#2B9D64" title="Order Details" />
      </Appbar.Header>
      <ScrollView
        style={{ width: "100%", borderRadius: 8, paddingHorizontal: 8 }}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 30, gap: 12 }}
      >
        <View style={styles.container}>
          <View
            style={{
              flex: 0.35,
              backgroundColor: "#2B9D64",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "left",
                paddingLeft: 10,
                fontWeight: "700",
              }}
            >
              Order ID
            </Text>
          </View>
          <View
            style={{
              flex: 0.65,
              backgroundColor: "gray",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Text
              style={{ color: "black", textAlign: "left", paddingLeft: 10 }}
            >
              {order._id}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View
            style={{
              flex: 0.35,
              backgroundColor: "#2B9D64",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "left",
                paddingLeft: 10,
                fontWeight: "700",
              }}
            >
              Order Date
            </Text>
          </View>
          <View
            style={{
              flex: 0.65,
              backgroundColor: "gray",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Text
              style={{ color: "black", textAlign: "left", paddingLeft: 10 }}
            >
              {formattedorderDate}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View
            style={{
              flex: 0.35,
              backgroundColor: "#2B9D64",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "left",
                paddingLeft: 10,
                fontWeight: "700",
              }}
            >
              Type of spring
            </Text>
          </View>
          <View
            style={{
              flex: 0.65,
              backgroundColor: "gray",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Text
              style={{ color: "black", textAlign: "left", paddingLeft: 10 }}
            >
              {order.typesOfSpring}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View
            style={{
              flex: 0.35,
              backgroundColor: "#2B9D64",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "left",
                paddingLeft: 10,
                fontWeight: "700",
              }}
            >
              Wire Diameter
            </Text>
          </View>
          <View
            style={{
              flex: 0.65,
              backgroundColor: "gray",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Text
              style={{ color: "black", textAlign: "left", paddingLeft: 10 }}
            >
              {order.wireDia}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View
            style={{
              flex: 0.35,
              backgroundColor: "#2B9D64",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "left",
                paddingLeft: 10,
                fontWeight: "700",
              }}
            >
              Outer Diameter
            </Text>
          </View>
          <View
            style={{
              flex: 0.65,
              backgroundColor: "gray",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Text
              style={{ color: "black", textAlign: "left", paddingLeft: 10 }}
            >
              {order.outerDia}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View
            style={{
              flex: 0.35,
              backgroundColor: "#2B9D64",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "left",
                paddingLeft: 10,
                fontWeight: "700",
              }}
            >
              Number Of Turns
            </Text>
          </View>
          <View
            style={{
              flex: 0.65,
              backgroundColor: "gray",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Text
              style={{ color: "black", textAlign: "left", paddingLeft: 10 }}
            >
              {order.numberOfTurns}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View
            style={{
              flex: 0.35,
              backgroundColor: "#2B9D64",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "left",
                paddingLeft: 10,
                fontWeight: "700",
              }}
            >
              Length of spring
            </Text>
          </View>
          <View
            style={{
              flex: 0.65,
              backgroundColor: "gray",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Text
              style={{ color: "black", textAlign: "left", paddingLeft: 10 }}
            >
              {order.length}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View
            style={{
              flex: 0.35,
              backgroundColor: "#2B9D64",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "left",
                paddingLeft: 10,
                fontWeight: "700",
              }}
            >
              Quantity
            </Text>
          </View>
          <View
            style={{
              flex: 0.65,
              backgroundColor: "gray",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Text
              style={{ color: "black", textAlign: "left", paddingLeft: 10 }}
            >
              {order.quantity}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View
            style={{
              flex: 0.35,
              backgroundColor: "#2B9D64",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "left",
                paddingLeft: 10,
                fontWeight: "700",
              }}
            >
              Dispatch Date
            </Text>
          </View>
          <View
            style={{
              flex: 0.65,
              backgroundColor: "gray",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Text
              style={{ color: "black", textAlign: "left", paddingLeft: 10 }}
            >
              {formatteddispatchedDate}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View
            style={{
              flex: 0.35,
              backgroundColor: "#2B9D64",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "left",
                paddingLeft: 10,
                fontWeight: "700",
              }}
            >
              Transport Name
            </Text>
          </View>
          <View
            style={{
              flex: 0.65,
              backgroundColor: "gray",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Text
              style={{ color: "black", textAlign: "left", paddingLeft: 10 }}
              numberOfLines={null}
            >
              {order.transportName}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View
            style={{
              flex: 0.35,
              backgroundColor: "#2B9D64",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "left",
                paddingLeft: 10,
                fontWeight: "700",
              }}
            >
              Remarks
            </Text>
          </View>
          <View
            style={{
              flex: 0.65,
              backgroundColor: "gray",
              justifyContent: "center",
              alignItems: "flex-start",
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Text
              style={{ color: "black", textAlign: "left", paddingLeft: 10 }}
              numberOfLines={null}
            >
              {order.remark}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 18,
          borderTopWidth: 0.5,
          borderTopColor: "#26282a",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#2B9D64",
            padding: 10,
            width: 250,
            borderRadius: 8,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize:16 }}>Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SingleOrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    minHeight: 50,
  },
});

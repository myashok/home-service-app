import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Color from "../../Utils/Color";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BusinessItemByCategoryScreen({ business, booking}) {
  const nav = useNavigation()
  return (
    <TouchableOpacity onPress={() => nav.push('business-detail', {business: business})}>
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: business?.image[0]?.url }}
          style={styles.itemImage}
        />
        {!booking?
          (<View
            style={{ display: "flex", gap: 10, justifyContent: "flex-start" }}
          >
            <Text
              style={{ fontFamily: "outfit", color: Color.GRAY, fontSize: 14 }}
            >
              {business?.personContact}
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                color: Color.BLACK,
                fontSize: 20,
              }}
            >
              {business?.name}
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                color: Color.GRAY,
                fontSize: 12,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome
                name="map-marker"
                size={18}
                color={Color.PRIMARY}
              />
              {" " + business?.address}
            </Text>
          </View>):
          (<View
            style={{ display: "flex", gap: 10, justifyContent: "flex-start" }}
          >
            <Text
              style={{ fontFamily: "outfit", color: Color.GRAY, fontSize: 14 }}
            >
              {business?.personContact}
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                color: Color.BLACK,
                fontSize: 20,
              }}
            >
              {business?.name}
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                color: Color.PRIMARY,
                fontSize: 16,
              }}
            >
              {booking?.bookingStatus}
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                color: Color.GRAY,
                fontSize: 12,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome
                name="calendar"
                size={18}
                color={Color.PRIMARY}
              />
              {"   " + booking?.date} at {booking?.time}
            </Text>
          </View>)
        }
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    backgroundColor: Color.WHITE,
    borderRadius: 10,
    padding: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

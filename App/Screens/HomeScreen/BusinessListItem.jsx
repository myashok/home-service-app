import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Color from "../../Utils/Color";
import { useNavigation } from "@react-navigation/native";

export default function BusinessListItem({ business }) {
  const nav = useNavigation()
  return (
    <TouchableOpacity style={styles.container} onPress={() => nav.push('business-detail', {business: business})}>
      <Image
        source={{ uri: business?.image[0]?.url }}
        style={styles.businessImage}
      />
      <View style={styles.infoContainer}>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 17 }}>
          {business?.name}
        </Text>
        <Text style={{ fontFamily: "outfit", fontSize: 13, color: Color.GRAY}}>
          {business?.personContact}
        </Text>
        <Text
          style={styles.textBusinessInfo}
        >
          {business?.category?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  infoContainer: {
    padding: 7,
    display: 'flex',
    gap: 3
  },
  textBusinessInfo: {
    fontFamily: "outfit-medium",
    fontSize: 10,
    color: Color.PRIMARY,
    padding: 3,
    paddingHorizontal: 10,
    backgroundColor: Color.PRIMARY_LIGHT,
    borderRadius: 4,
    alignSelf: "flex-start"

  },
  container: {
    backgroundColor: Color.WHITE,
    padding: 8,
    borderRadius: 8,
  },
  businessImage: {
    width: 170,
    height: 110,
    objectFit: "fill",
    borderRadius: 8,
  },
});

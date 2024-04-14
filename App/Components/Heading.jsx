import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { React } from "react";
export default function Heading({heading, isViewAll=false, onViewAllPress, viewAllText='viewAll' }) {

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      {isViewAll && <TouchableOpacity onPress={onViewAllPress}><Text style={{fontFamily: 'outfit'}}>{viewAllText}</Text></TouchableOpacity>}
    </View>
  );
}
const styles = StyleSheet.create({
 container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
 },
  heading: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    marginBottom: 10,
  },
});

import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Color from "../../Utils/Color";
import { FontAwesome } from "@expo/vector-icons";

export default function Header() {
  const { user, isLoaded } = useUser();
  return (
    isLoaded && (
      <View style={styles.container}>
        <View style={styles.mainProfileContainer}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
            <View>
              <Text style={{ color: Color.WHITE, fontFamily: 'outfit' }}>Welcome,</Text>
              <Text style={{ color: Color.WHITE, fontSize: 17, fontFamily: 'outfit-medium' }}>
                {user?.fullName}{" "}
              </Text>
            </View>
            </View>
            <FontAwesome name="bookmark-o" size={24} color={Color.WHITE} style={{marginRight: 5}}/>
        </View>
        <View style={styles.searchContainer}>
          <TextInput placeholder="Search" style={styles.searchInput}></TextInput>
          <FontAwesome name="search" style={styles.searchButton} size={18}/>
        </View>
      </View>
    )
  );
}
const styles = StyleSheet.create({
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  container: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: Color.PRIMARY,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  mainProfileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: Color.WHITE,
    borderRadius: 10,
    padding: 8,
    flex:1,
    fontSize: 18,
    paddingHorizontal: 16,
    fontFamily: 'outfit'
  },
  searchContainer: {
    marginTop: 20,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 15
  },
  searchButton: {
    backgroundColor: Color.WHITE,
    borderRadius: 10,
    padding: 18,
    color: Color.PRIMARY
  }
});

import { View, Text, Image, FlatList, TouchableOpacity, Linking} from "react-native";
import React from "react";
import Color from "../../Utils/Color";
import { useUser } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { user } = useUser();
  const nav = useNavigation();
  const {signOut, isLoaded } = useAuth();
  const profileMenu = [
    {
      name: "Home Screen",
      icon: "home",
      onPressHandler: () =>  nav.navigate('home-nav', {screen: 'home-nav'})
    },
    {
      name: "My Bookings",
      icon: "bookmark",
      onPressHandler: () =>  nav.navigate('booking-nav', {screen: 'booking-nav'})
    },
    {
      name: "Contact Us",
      icon: "envelope",
      onPressHandler: () =>  Linking.openURL('mailto:developer.kanchi@gmail.com?subject=How can we help you&body=Hi,\nthere')
      
    },
    {
      name: "Sign Out",
      icon: "sign-out",
      onPressHandler: () => signOut()
    },
  ];
  return (
 
    <View>
      <View
        style={{ backgroundColor: Color.PRIMARY, height: 320, padding: 25, marginBottom: 40 }}
      >
        <Text
          style={{
            color: Color.WHITE,
            fontFamily: "outfit-bold",
            fontSize: 30,
          }}
        >
          Profile
        </Text>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            gap: 10,
          }}
        >
          <Image
            source={{ uri: user?.imageUrl }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
          <Text
            style={{
              color: Color.WHITE,
              fontFamily: "outfit-medium",
              fontSize: 25,
            }}
          >
            {user?.fullName}
          </Text>
          <Text
            style={{ color: Color.WHITE, fontFamily: "outfit", fontSize: 18 }}
          >
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>
      </View>
      <View>
        <FlatList
          data={profileMenu}
          renderItem={({ item, index}) => (
            <TouchableOpacity onPress={item?.onPressHandler} style={{display: 'flex', flexDirection: 'row', gap:10, alignItems: 'center', paddingLeft: 120, marginBottom: 50}}>
              <FontAwesome name={item?.icon} size={32} color={Color.PRIMARY} />
              <Text> {item?.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

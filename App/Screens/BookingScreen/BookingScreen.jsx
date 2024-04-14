import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { getBookingByUserEmail } from "../../Utils/GlobalApi";
import BusinessItemByCategoryScreen from "../BusinessByCategoryScreen/BusinessItemByCategoryScreen";

export default function BookingScreen() {
  const { user, isLoaded } = useUser();
  const [bookingByUser, setBookingByUser] = useState([]);
  const [isBookingByUserLoaded, setIsBookingByUserLoaded] = useState(true);
  const getBookingByUser = () => {
    setIsBookingByUserLoaded(false)
    getBookingByUserEmail(user?.primaryEmailAddress?.emailAddress).then(
      (resp) => {
        setBookingByUser(resp?.bookings);
        setIsBookingByUserLoaded(true)
      }
    );
  }
  useEffect(() => getBookingByUser(), []);
  return (
    <View>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 28, padding: 20 }}>
        My Bookings
      </Text>
      <View>
        <FlatList
          data={bookingByUser}
          onRefresh={getBookingByUser}
          refreshing={!isBookingByUserLoaded}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={{ marginRight: 10 }}>
              <BusinessItemByCategoryScreen business={item?.businessList} booking={item}/>
            </View>
          )}
        />
      </View>
    </View>
  );
}

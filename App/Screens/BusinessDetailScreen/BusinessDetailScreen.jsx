import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Linking
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Color from "../../Utils/Color";
import Heading from "../../Components/Heading";
import BookingModal from "./BookingModal";

export default function BusinessDetailScreen() {
  const nav = useNavigation();
  const business = useRoute().params?.business;
  const [isFullRead, setIsFullRead] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  return (
    <>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={() => nav.goBack()}
          style={styles.backButtonContainer}
        >
          <Ionicons name="arrow-back" size={24} color={Color.BLACK} />
        </TouchableOpacity>
        <Image source={{ uri: business?.image[0]?.url }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.businessName}>{business?.name}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.contactText}>{business?.personContact}</Text>
            <Text style={styles.categoryText}>{business?.category?.name}</Text>
          </View>
          <Text style={styles.addressText}>
            <FontAwesome name="map-marker" size={18} color={Color.PRIMARY} />{" "}
            {business?.address}
          </Text>
          <View style={styles.horizontalLine} />
          <Heading heading="About" />
          <Text style={styles.aboutText} numberOfLines={isFullRead ? 100 : 3}>
            {business?.about}
          </Text>
          <TouchableOpacity onPress={() => setIsFullRead(!isFullRead)}>
            <Text style={styles.readMoreText}>
              {isFullRead ? "Read Less" : "Read More"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{display: 'flex', flexDirection: 'row', gap: 10, marginTop: 8, marginBottom: -20, padding: 10, alignItems:'center'}}>
        <TouchableOpacity style={styles.messageBtnContainer} onPress={ () => Linking.openURL('mailto:'+ business?.email+'?subject=I am looking for your service&body=Hi,\nthere')
      }>
          <Text style={styles.messageBtn}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookingBtnContainer} onPress={() => setShowBookingModal(true)}>
          <Text style={styles.bookingBtn}>Book</Text>
        </TouchableOpacity>
        <Modal
         animationType='slide'
         visible={showBookingModal}
        >
          <BookingModal businessId={business.id} hideModal={() => setShowBookingModal(false)}/>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  messageBtn: {
    fontFamily: 'outfit-medium',
    fontSize: 24,
    color: Color.PRIMARY,
    alignSelf: 'center'
    
  },
  bookingBtn: {
    fontFamily: 'outfit-medium',
    fontSize: 24,
    color: Color.WHITE,
    alignSelf: 'center'
    
  },
  messageBtnContainer: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: Color.WHITE,
    borderRadius: 25,
    borderWidth: .4,
    borderColor: Color.PRIMARY,
    flex: 1
  },
  bookingBtnContainer: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: Color.PRIMARY,
    borderRadius: 25,
    borderWidth: .8,
    borderColor: Color.WHITE,
    flex: 1
  },
  container: {
    flex: 1,
    maxHeight: "90%",
  },
  backButtonContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 350,
  },
  contentContainer: {
    padding: 20,
  },
  businessName: {
    fontFamily: "outfit-bold",
    fontSize: 27,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  contactText: {
    fontFamily: "outfit",
    color: Color.PRIMARY,
    fontSize: 16,
  },
  categoryText: {
    backgroundColor: Color.PRIMARY_LIGHT,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 4,
    fontFamily: "outfit",
    color: Color.PRIMARY,
    fontSize: 14,
  },
  addressText: {
    fontFamily: "outfit",
    color: Color.GRAY,
    fontSize: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  horizontalLine: {
    borderWidth: 0.4,
    borderColor: Color.GRAY,
    marginVertical: 20,
  },
  aboutScrollView: {
    maxHeight: 300, // Set the maximum height of the ScrollView
  },
  aboutText: {
    textAlign: "justify",
    fontFamily: "outfit",
    fontSize: 20,
    lineHeight: 28,
  },
  readMoreText: {
    textAlign: "justify",
    fontFamily: "outfit",
    fontSize: 14,
    color: Color.PRIMARY,
    marginTop: 10,
  },
});

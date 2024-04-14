import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, ScrollView, KeyboardAvoidingView, ToastAndroid } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import CalendarPicker from "react-native-calendar-picker";
import Color from "../../Utils/Color";
import Heading from "../../Components/Heading";
import { createBooking } from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import { format } from "date-fns";

export default function BookingModal({ businessId, hideModal }) {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [timeList, setTimeList] = useState([]);
  const [note, setNote] = useState("");
  const {user} = useUser();

  useEffect(() => {
    getTimeList();
  }, []);

  const getTimeList = () => {
    const timeList = [];
    for (let i = 8; i < 12; ++i) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    timeList.push({
      time: "12:00 PM",
    });
    timeList.push({
      time: "12:30 PM",
    });
    for (let i = 1; i < 9; ++i) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeList(timeList);
  };

  const createBusinessBooking = () => {
    data = {
        id: businessId,
        date: format(selectedDate, "dd-MMM-yyyy"),
        time: selectedTime,
        note: note,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        
        userName: user?.fullName
    }
    console.log(selectedTime, selectedDate, selectedTime === null, selectedDate === null)
    if (selectedTime === null || selectedDate === null) {
        ToastAndroid.show("Please select date and time first", ToastAndroid.LONG)
        return
    } 
    createBooking(data).then((resp) => {
        ToastAndroid.show("Booking created successfully",ToastAndroid.LONG)
        hideModal()
    })
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView style={{ padding: 15 }}>
        <TouchableOpacity onPress={hideModal} style={styles.backButtonContainer}>
          <AntDesign name="close" size={24} color={Color.BLACK} />
          <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
            Booking
          </Text>
        </TouchableOpacity>
        <View style={{ display: "flex", marginBottom: 20, marginTop: 5 }}>
          <View>
            <Heading heading="Select Date" />
          </View>
          <View style={styles.calendarContainer}>
            <CalendarPicker
              width={380}
              onDateChange={setSelectedDate}
              minDate={Date.now()}
              todayBackgroundColor={Color.BLACK}
              todayTextStyle={{ color: Color.WHITE }}
              selectedDayColor={Color.PRIMARY}
              selectedDayTextColor={Color.WHITE}
            />
          </View>
        </View>
        {/* Time Slot */}
        <View>
          <Heading heading={"Select Time Slot"} />
          <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ marginRight: 8 }}
                onPress={() => setSelectedTime(item.time)}
              >
                <Text
                  style={
                    selectedTime === item.time
                      ? styles.selectedTimeText
                      : styles.unSelectedTimeText
                  }
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* Notes section */}
        <View style={{marginTop: 30}}>
          <Heading heading={'Any Suggestion notes'}/>
          <TextInput  numberOfLines={4} multiline={true} placeholder="Note" style={styles.suggestionTextInput} 
                 value={note} // Bind value to the state variable
                 onChangeText={setNote} // Update the state variable
          />
        </View>
        <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={createBusinessBooking}
              >
                <Text
                  style={
                    styles.confirmBtn
                  }
                >
                  Confirm & Book
                </Text>
              </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backButtonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  calendarContainer: {
    padding: 20,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: Color.PRIMARY_LIGHT,
  },
  selectedTimeText: {
    padding: 10,
    backgroundColor: Color.PRIMARY,
    color: Color.WHITE,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
  },
  unSelectedTimeText: {
    padding: 10,
    borderColor: Color.PRIMARY,
    backgroundColor: Color.WHITE,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
  },
  suggestionTextInput: {
    borderColor: Color.PRIMARY,
    borderWidth: 1,
    borderRadius: 8,
    textAlignVertical: 'top',
    padding: 10,
    fontFamily: 'outfit',
    fontSize: 16
  },
  confirmBtn: {
    padding: 15,
    paddingHorizontal: 25,
    fontFamily: 'outfit-medium',
    fontSize: 22,
    backgroundColor: Color.PRIMARY,
    color: Color.WHITE,
    textAlign: 'center',
    borderRadius: 20,
  }
});

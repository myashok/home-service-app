import { View, StyleSheet, FlatList, Text, Image } from "react-native";
import { React, useEffect, useState } from "react";
import { getBuisness } from "../../Utils/GlobalApi";
import Heading from "../../Components/Heading";
import Color from "../../Utils/Color";
import BusinessListItem from "./BusinessListItem";

export default function BusinessList() {
  const [business, setbusiness] = useState([]);
  const [businessSliceLen, setbusinessSliceLen] = useState(3);
  const [viewAllText, setViewAllText] = useState("View All");
  useEffect(() => {
    getBuisness().then((resp) => {
      setbusiness(resp?.businessLists);
    });
  }, []);

  const handleViewAllPress = () => {
    if (viewAllText == "View All") {
        setbusinessSliceLen(business.length);
        setViewAllText('Collapse');
    } else {
        setbusinessSliceLen(3);
        setViewAllText("View All");
    }
  };

  return (
    <View style={{marginTop: 30}}>
      <Heading heading="Latest Business" isViewAll={true} onViewAllPress={handleViewAllPress} viewAllText={viewAllText}/>
      <FlatList
        data={business}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{marginRight: 10}}>
            <BusinessListItem  business={item}/>
          </View>
        )}
      />
    </View>
  );
}
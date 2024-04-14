import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getBuisnessByCategory } from "../../Utils/GlobalApi";
import BusinessItemByCategoryScreen from "./BusinessItemByCategoryScreen";
import Color from "../../Utils/Color";
export default function BusinessByCategoryScreen() {
  const param = useRoute().params;
  const nav = useNavigation();
  const [businessList, setBusinessList ] = useState([]);
  useEffect(() => {
    param &&
    getBuisnessByCategory(param?.category).then((resp) => {
        setBusinessList(resp?.businessLists);
      });
    
  }, [param?.category]);
  return (
    <View>
      <TouchableOpacity
        style={{
          padding: 20,
          paddingTop: 30,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
        onPress={() => nav.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
          {param?.category}
        </Text>
      </TouchableOpacity>
      {businessList.length > 0 ?
      <FlatList
        data={businessList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{marginRight: 10}}>
            <BusinessItemByCategoryScreen  business={item}/>
          </View>
        )}
      />:
      <View style={{display:'flex', alignItems: 'center', marginTop: 80}}>
        <Text style={{fontSize: 22, fontFamily: 'outfit-medium', color: Color.GRAY}}>No Business Found</Text>
      </View>
      }
    </View>
  );
}

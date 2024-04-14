import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { React, useEffect, useState } from "react";
import { getCategory } from "../../Utils/GlobalApi";
import Heading from "../../Components/Heading";
import Color from "../../Utils/Color";
import { useNavigation } from "@react-navigation/native";
export default function Category() {
  const [category, setCategory] = useState([]);
  const [categorySliceLen, setCategorySliceLen] = useState(3);
  const [viewAllText, setViewAllText] = useState("View All");
  useEffect(() => {
    getCategory().then((resp) => {
      setCategory(resp?.categories);
    });
  }, []);

  const handleViewAllPress = () => {
    if (viewAllText == "View All") {
      setCategorySliceLen(category.length);
      setViewAllText("Collapse");
    } else {
      setCategorySliceLen(3);
      setViewAllText("View All");
    }
  };
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 30 }}>
      <Heading
        heading="Categories"
        isViewAll={true}
        onViewAllPress={handleViewAllPress}
        viewAllText={viewAllText}
      />
      <FlatList
        data={category.slice(0, categorySliceLen)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              navigation.push("business-by-category", {
                category: item?.name,
              });
            }}
          >
            <Image
              source={{ uri: item?.icon?.url }}
              style={styles.iconImage}
            ></Image>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 16,
                marginTop: 10,
              }}
            >
              {" "}
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  flatListContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    backgroundColor: Color.LIGHT_GRAY,
    padding: 17,
    borderRadius: 99,
    alignItems: "center",
  },
  iconImage: {
    width: 30,
    height: 30,
  },
});

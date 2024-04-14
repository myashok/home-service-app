import { View, StyleSheet, FlatList, Image } from "react-native";
import { React, useEffect, useState } from "react";
import { getSlider } from "../../Utils/GlobalApi";
import Heading from "../../Components/Heading";
export default function Slider() {
  const [slider, setSlider] = useState([]);
  useEffect(() => {
    getSlider().then((resp) => {
      setSlider(resp?.sliders);
    });
  }, []);
  return (
    <View>
      <Heading heading='Offers for you'/>
      <FlatList
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: 20 }}>
            <Image
              source={{ uri: item?.image?.url }}
              style={styles.sliderImage}
            ></Image>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  heading: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    marginBottom: 10,
  },
  sliderImage: {
    width: 270,
    height: 130,
    borderRadius: 30,
    objectFit: "fill",
  },
});

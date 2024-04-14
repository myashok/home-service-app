import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../Hooks/useWarmUpBrowser";
import Color from "../../Utils/Color";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("../../../assets/login.png")}
        style={styles.loginImage}
      ></Image>
      <View style={styles.subContainer}>
        <Text style={{ color: Color.WHITE, fontSize: 27, textAlign: "center" }}>
          {" "}
          Let's Find
          <Text style={{ fontWeight: "bold" }}>
            {" "}
            Professional Cleaning and Repair{" "}
          </Text>
          Service
        </Text>
        <Text
          style={{
            color: Color.WHITE,
            fontSize: 17,
            textAlign: "center",
            marginTop: 25,
          }}
        >
          Best app to find near you which deliver you a professional service
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text
            style={{ textAlign: "center", fontSize: 17, color: Color.PRIMARY }}
          >
            Let's get started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 470,
    borderRadius: 15,
    borderWidth: 4,
    marginTop: 50,
    borderColor: Color.BLACK,
  },
  subContainer: {
    backgroundColor: Color.PRIMARY,
    width: "100%",
    height: "70%",
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  button: {
    backgroundColor: Color.WHITE,
    borderRadius: 99,
    padding: 15,
    marginTop: 50,
  },
});

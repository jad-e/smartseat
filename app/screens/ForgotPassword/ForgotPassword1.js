import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import React from "react";

import { CustomButton1, CustomInput, Header } from "../../components";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { forgotpass1 } = images;

import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useForm } from "react-hook-form";

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const ForgotPassword1 = () => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();

  const onSendPressed = (data) => {
    console.log(data);

    //send OTP???

    navigation.navigate("ForgotPassword2");
  };

  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />

      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={forgotpass1}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={[styles.title, { ...FONTS.h1 }]}>Forgot Password</Text>

          <Text style={[styles.text, { ...FONTS.body3a }]}>
            Enter your account's username for which you want to reset your
            password.
          </Text>

          <CustomInput
            name="username"
            control={control}
            placeholder="Username"
            secureTextEntry={false}
            rules={{ required: "Username is required." }}
            marginTop={0}
            marginBottom={0}
          />

          <CustomButton1
            text="Send"
            onPress={handleSubmit(onSendPressed)}
            marginTop={35}
            marginBottom={0}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    padding: 35,
    width: SIZES.width,
    height: SIZES.height,
  },
  image: {
    width: 250,
    height: 250,
    marginTop: -40,
    marginBottom: -5,
  },
  title: {
    textAlign: "center",
    color: "#051C60",
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    color: "gray",
    marginBottom: 50,
  },
});

export default ForgotPassword1;

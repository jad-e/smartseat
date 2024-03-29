import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Linking,
} from "react-native";
import React from "react";

import DropShadow from "react-native-drop-shadow";

import {
  CustomInput,
  CustomButton1,
  CustomButton2,
  CustomButton3,
} from "../../components";

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { useStudentLogout } from "../../hooks/useStudentLogout";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { profilepic, profilepictest } = images;

//context
import { useStudentDataContext } from "../../hooks/useStudentDataContext";
import { useStudentAuthContext } from "../../hooks/useStudentAuthContext";

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const Profile = () => {
  //states
  const [profileImgPath, setProfileImgPath] = React.useState(null);

  const navigation = useNavigation();

  const { logout } = useStudentLogout();

  const { studentData, dispatch } = useStudentDataContext();
  const { studentUser } = useStudentAuthContext();

  React.useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.151:4000/api/studentData/1",
          {
            headers: {
              Authorization: `Bearer ${studentUser.token}`,
            },
          }
        ); //4000 is the port that server is listening to

        const json = await response.json(); //parsed into an array of objects

        //check if response if ok (data get back successfully)
        if (response.ok) {
          dispatch({ type: "SET_STUDENT", payload: json });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentData();
  }, [dispatch]); //only fires once when the Student page first renders

  const onSignOutPressed = (data) => {
    logout();
    navigation.navigate("SignIn");
  };

  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header Section */}
          <DropShadow style={styles.shadowProp}>
            <View
              style={{
                backgroundColor: COLORS.white,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                marginTop: 10,
                marginBottom: 20,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 15,
                paddingRight: 15,
              }}
            >
              {/* top section */}

              <TouchableOpacity
                onPress={() => navigation.navigate("ProfileDetail")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 15,
                    justifyContent: "space-between",
                  }}
                >
                  {/* name, email addr, and profile pic section */}
                  {studentData && (
                    <View
                      style={{
                        width: "70%",
                        flexDirection: "column",
                      }}
                    >
                      <Text style={{ ...FONTS.h2, color: COLORS.black }}>
                        {studentData.username}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{ ...FONTS.body5, color: COLORS.gray }}
                      >
                        {studentData.email}
                      </Text>
                    </View>
                  )}

                  {/* image section */}
                  <View
                    style={{
                      width: "24%",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={
                        profileImgPath ? { uri: profileImgPath } : profilepic
                      }
                      style={{
                        height: 55,
                        width: 55,
                        borderRadius: 1000,
                        marginRight: 5,
                      }}
                    />
                    <Image
                      source={icons.right_arrow}
                      style={{ width: 10, height: 10, tintColor: COLORS.gray }}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {/* bottom section (violation records & blacklist count) */}
              {studentData && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      width: 90,
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: COLORS.black,
                        fontWeight: 600,
                      }}
                    >
                      {studentData.reserveNum}
                    </Text>
                    <Text style={{ ...FONTS.body4a, color: COLORS.darkgray }}>
                      Reservations
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      width: 90,
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: COLORS.black,
                        fontWeight: 600,
                      }}
                    >
                      {studentData.violateNum}
                    </Text>
                    <Text style={{ ...FONTS.body4a, color: COLORS.darkgray }}>
                      Violations
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                      width: 90,
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.body3,
                        color: COLORS.black,
                        fontWeight: 600,
                      }}
                    >
                      {studentData.blacklistNum}
                    </Text>
                    <Text style={{ ...FONTS.body4a, color: COLORS.darkgray }}>
                      Blacklists
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </DropShadow>

          {/* Content Section 

        1. Change Language
        2. Theme
        3. FAQs and Support
        4. Submit a Suggestion
        5. Rate Us 5 Stars
        6. Privacy Policy

        */}

          <DropShadow style={styles.shadowProp}>
            <View
              style={{
                backgroundColor: COLORS.white,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
              }}
            >
              {/* language */}
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  paddingRight: 15,
                  paddingLeft: 20,
                  justifyContent: "space-between",
                }}
                onPress={() => console.log("Change language")}
              >
                <Text style={{ ...FONTS.body4 }}>Change Language</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* coming soon tag */}
                  <View
                    style={{
                      backgroundColor: COLORS.Gnewtagred,
                      borderRadius: 20,
                      paddingHorizontal: 10,
                      marginRight: 10,
                    }}
                  >
                    <Text
                      style={{ ...FONTS.h4, fontSize: 10, color: COLORS.white }}
                    >
                      Coming Soon
                    </Text>
                  </View>
                  <Image
                    source={icons.right_arrow}
                    style={{ width: 10, height: 10, tintColor: COLORS.gray }}
                  />
                </View>
              </TouchableOpacity>

              {/* break line */}
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.lightgray2,
                  marginHorizontal: 15,
                }}
              ></View>

              {/* theme */}
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  paddingRight: 15,
                  paddingLeft: 20,
                  justifyContent: "space-between",
                }}
                onPress={() => console.log("Theme")}
              >
                <Text style={{ ...FONTS.body4 }}>Theme</Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* coming soon tag */}
                  <View
                    style={{
                      backgroundColor: COLORS.Gnewtagred,
                      borderRadius: 20,
                      paddingHorizontal: 10,
                      marginRight: 10,
                    }}
                  >
                    <Text
                      style={{ ...FONTS.h4, fontSize: 10, color: COLORS.white }}
                    >
                      Coming Soon
                    </Text>
                  </View>
                  <Image
                    source={icons.right_arrow}
                    style={{ width: 10, height: 10, tintColor: COLORS.gray }}
                  />
                </View>
              </TouchableOpacity>

              {/* break line*/}
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.lightgray2,
                  marginHorizontal: 15,
                }}
              ></View>

              {/* faq */}
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  paddingRight: 15,
                  paddingLeft: 20,
                  justifyContent: "space-between",
                }}
                onPress={() => navigation.navigate("FAQ")}
              >
                <Text style={{ ...FONTS.body4 }}>FAQs and Support</Text>
                <Image
                  source={icons.right_arrow}
                  style={{ width: 10, height: 10, tintColor: COLORS.gray }}
                />
              </TouchableOpacity>

              {/* break line */}
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.lightgray2,
                  marginHorizontal: 15,
                }}
              ></View>

              {/* submit suggestion */}
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  paddingRight: 15,
                  paddingLeft: 20,
                  justifyContent: "space-between",
                }}
                onPress={() => navigation.navigate("FeedbackSubmission")}
              >
                <Text style={{ ...FONTS.body4 }}>Submit a Suggestion</Text>
                <Image
                  source={icons.right_arrow}
                  style={{ width: 10, height: 10, tintColor: COLORS.gray }}
                />
              </TouchableOpacity>

              {/* break line */}
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.lightgray2,
                  marginHorizontal: 15,
                }}
              ></View>

              {/* rate 5 stars */}
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  paddingRight: 15,
                  paddingLeft: 20,
                  justifyContent: "space-between",
                }}
                onPress={() => {
                  Linking.openURL("market://details?id=com.whatsapp");
                }}
              >
                <Text style={{ ...FONTS.body4 }}>Rate Us 5 Stars</Text>
                <Image
                  source={icons.right_arrow}
                  style={{ width: 10, height: 10, tintColor: COLORS.gray }}
                />
              </TouchableOpacity>
            </View>
          </DropShadow>

          {/* Log Out button */}
          <DropShadow style={styles.shadowProp}>
            <CustomButton1
              text="Sign Out"
              onPress={onSignOutPressed}
              marginTop={20}
              marginBottom={0}
              borderRadius={5}
              backgroundColor={COLORS.white}
              fontSize={14}
              fontFamily="Roboto-Regular"
              lineHeight={22}
              color={COLORS.black}
            />
          </DropShadow>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: 15,
    width: SIZES.width,
    height: SIZES.height,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
});

export default Profile;

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  rgba,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";

import { useForm } from "react-hook-form";

import {
  CustomInput,
  CustomButton1,
  CustomButton2,
  CustomButton3,
} from "../../components";

import {
  Modal,
  BottomModal,
  ModalContent,
  ModalFooter,
  ModalButton,
  ModalTitle,
  Animation,
  FadeAnimation,
  ScaleAnimation,
  SlideAnimation,
} from "react-native-modals";

import DropShadow from "react-native-drop-shadow";

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { images, icons, theme, COLORS, SIZES, FONTS } from "../../constants";
const { appname } = images;

//context
import { useStudentDataContext } from "../../hooks/useStudentDataContext";
import { useStudentAuthContext } from "../../hooks/useStudentAuthContext";
import { useStudySpaceContext } from "../../hooks/useStudySpaceContext";
import { useCustomizationContext } from "../../hooks/useCustomizationContext";

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const Home = () => {
  // Acceptable Behaviours
  // 1: Can talk, 10: cannot talk
  // 2: food allowed, 20: food not allowed
  // 3: drinks allowed, 30: drinks not allowed

  const { studentData, dispatch } = useStudentDataContext();
  const { studentUser } = useStudentAuthContext();
  const { studySpace, dispatch: dispatchSpaces } = useStudySpaceContext();
  const { customization, dispatch: dispatchCust } = useCustomizationContext();

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
        );

        const json = await response.json(); //parsed into an array of objects

        //check if response if ok (data get back successfully)
        if (response.ok) {
          dispatch({ type: "SET_STUDENT", payload: json });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchStudySpaces = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.151:4000/api/studySpace/"
        ); //4000 is the port that server is listening to

        const json = await response.json(); //parsed into an array of objects

        //check if response if ok (data get back successfully)
        if (response.ok) {
          dispatchSpaces({ type: "SET_STUDYSPACES", payload: json });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCustomization = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.151:4000/api/customization/648d897e2c51433d55f5e747"
        ); //4000 is the port that server is listening to

        const json = await response.json(); //parsed into an array of objects

        //check if response if ok (data get back successfully)
        if (response.ok) {
          dispatchCust({ type: "SET_CUSTOMIZATION", payload: json });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentData();
    fetchStudySpaces();
    fetchCustomization();
  }, [dispatch, dispatchSpaces, dispatchCust]); //only fires once when the Home page first renders

  // const studySpacesData = [
  //   {
  //     id: 1,
  //     title: "Peking Library",
  //     address: "5 Yiheyuan Rd, Haidian District",
  //     freeSeats: 718,
  //     totalSeats: 918,
  //     floorsData: [{ 0: 195 }, { 1: 169 }, { 2: 167 }, { 3: 178 }, { 4: 82 }],
  //     status1: "Open",
  //     operatingHours: "24 hours",
  //     acceptableBehaviours: [1, 2, 30],
  //   },
  //   {
  //     id: 2,
  //     title: "Tsinghua Library",
  //     address: "30 Shuangqing Rd, Haidian District",
  //     freeSeats: 0,
  //     totalSeats: 918,
  //     floorsData: [{ 0: 0 }, { 1: 0 }, { 2: 0 }, { 3: 0 }],
  //     status1: "Closed",
  //     operatingHours: "24 hours",
  //     acceptableBehaviours: [10, 20, 30],
  //   },
  //   {
  //     id: 3,
  //     title: "Fudan Study Space",
  //     address: "220 Handan Rd, Yangpu District",
  //     freeSeats: 29,
  //     totalSeats: 100,
  //     floorsData: [
  //       { 0: 195 },
  //       { 1: 169 },
  //       { 2: 167 },
  //       { 3: 178 },
  //       { 4: 72 },
  //       { 5: 10 },
  //     ],
  //     status1: "Open",
  //     operatingHours: "08:30 - 22:30",
  //     acceptableBehaviours: [10, 2, 30],
  //   },
  //   {
  //     id: 4,
  //     title: "UCL Science Library",
  //     address: "Malet Place, Gower Street, WC1E 6BT",
  //     freeSeats: 30,
  //     totalSeats: 100,
  //     floorsData: [{ 0: 195 }, { 1: 169 }, { 2: 167 }, { 3: 178 }, { 4: 82 }],
  //     status1: "Open",
  //     operatingHours: "10:30 - 18:00",
  //     acceptableBehaviours: [1, 2, 3],
  //   },
  //   {
  //     id: 5,
  //     title: "Student Centre 1",
  //     address: "27-28 Gordon Square, WC1H 0PP",
  //     freeSeats: 59,
  //     totalSeats: 100,
  //     floorsData: [{ 0: 195 }, { 1: 169 }, { 2: 167 }, { 3: 178 }, { 4: 82 }],
  //     status1: "Open",
  //     operatingHours: "24 hours",
  //     acceptableBehaviours: [10, 2, 3],
  //   },
  //   {
  //     id: 6,
  //     title: "Student Centre 2",
  //     address: "29-30 Gordon Square, WC1H 0PP",
  //     freeSeats: 60,
  //     totalSeats: 100,
  //     floorsData: [{ 0: 195 }, { 1: 169 }, { 2: 167 }, { 3: 178 }, { 4: 82 }],
  //     status1: "Open",
  //     operatingHours: "24 hours",
  //     acceptableBehaviours: [1, 20, 3],
  //   },
  // ];

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { seatNumber: "" } });

  // on press functions
  const onMoreFeaturePressed = () => {
    console.log("more feature pressed");

    setBottomSheetState(true);
  };

  const onAssistMeFeaturePressed = () => {
    console.log("assist me feature pressed");

    setPopUpDialogState(true);
  };

  const onTimelineFeaturePressed = () => {
    console.log("timeline feature pressed");

    navigation.navigate("Timeline");
  };

  const onFAQFeaturePressed = () => {
    navigation.navigate("FAQ");
  };

  const AssistMeBTSPressed = () => {
    console.log("Assist Me BTS pressed");

    setBottomSheetState(false);

    setPopUpDialogState(true);
  };

  const TimelineBTSPressed = () => {
    console.log("Timeline BTS pressed");

    setBottomSheetState(false);

    navigation.navigate("Timeline");
  };

  const FAQBTSPressed = () => {
    console.log("FAQ BTS pressed");

    setBottomSheetState(false);

    navigation.navigate("FAQ");
  };

  const onDialogOKPressed = async (data) => {
    setPopUpDialogState(false);

    //current data and time
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
    });

    //make an assistance request object
    const assistanceRequest = {
      username: studentData.username,
      name: studentData.name,
      seatNumber: data.seatNumber,
      dateTime: date + " " + time,
      status: "Not Done",
    };

    const response = await fetch(
      "http://192.168.0.151:4000/api/assistanceRequest",
      {
        method: "POST",
        body: JSON.stringify(assistanceRequest), //changes the object into a json string
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      reset(); //clear form
      ToastAndroid.showWithGravityAndOffset(
        json.error,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        250
      );
    }

    if (response.ok) {
      reset(); //clear form
      ToastAndroid.showWithGravityAndOffset(
        "Assistance request sent.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        250
      );
    }
  };

  //states
  const [bottomSheetState, setBottomSheetState] = React.useState(false); //track the state of the bottomsheet
  const [popUpDialogState, setPopUpDialogState] = React.useState(false); //track the state of the pop up dialog
  //const [studySpaces, setStudySpaces] = React.useState(studySpacesData);

  function renderHeader() {
    return (
      <>
        <FocusAwareStatusBar
          barStyle="light-content"
          backgroundColor={COLORS.Gheader}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
            backgroundColor: COLORS.Gheader,
            height: 100,
            width: "100%",
          }}
        >
          <Image
            source={appname}
            style={{ height: 30, resizeMode: "contain", marginTop: 12 }}
          />
        </View>

        {/* Features section */}

        <DropShadow style={styles.shadowProp}>
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: COLORS.white,
                height: 75,
                borderRadius: 5,
                marginLeft: 20,
                marginRight: 20,
                marginTop: -60,
                marginBottom: 20,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
                paddingBottom: 10,
              },
            ]}
          >
            {/* Assist Me */}
            <TouchableOpacity
              style={{
                width: 60,
                alignItems: "center",
                flexDirection: "column",
              }}
              onPress={onAssistMeFeaturePressed}
            >
              <Image
                source={icons.hand}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  tintColor: COLORS.appmain,
                }}
              />

              <Text
                style={{
                  marginTop: 4,
                  textAlign: "center",
                  flexWrap: "wrap",
                  ...FONTS.body4a,
                }}
              >
                Assist Me
              </Text>
            </TouchableOpacity>

            {/* Timeline */}
            <TouchableOpacity
              style={{
                width: 60,
                alignItems: "center",
                flexDirection: "column",
              }}
              onPress={onTimelineFeaturePressed}
            >
              <Image
                source={icons.history}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  tintColor: COLORS.appmain,
                }}
              />

              <Text
                style={{
                  marginTop: 4,
                  textAlign: "center",
                  flexWrap: "wrap",
                  ...FONTS.body4a,
                }}
              >
                Timeline
              </Text>
            </TouchableOpacity>

            {/* FAQs */}
            <TouchableOpacity
              style={{
                width: 60,
                alignItems: "center",
                flexDirection: "column",
              }}
              onPress={onFAQFeaturePressed}
            >
              <Image
                source={icons.question_sign}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  tintColor: COLORS.appmain,
                }}
              />

              <Text
                style={{
                  marginTop: 4,
                  textAlign: "center",
                  flexWrap: "wrap",
                  ...FONTS.body4a,
                }}
              >
                FAQs
              </Text>
            </TouchableOpacity>

            {/* More */}
            <TouchableOpacity
              style={{
                width: 60,
                alignItems: "center",
                flexDirection: "column",
              }}
              onPress={onMoreFeaturePressed}
            >
              <Image
                source={icons.application}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  tintColor: COLORS.appmain,
                }}
              />

              <Text
                style={{
                  marginTop: 4,
                  textAlign: "center",
                  flexWrap: "wrap",
                  ...FONTS.body4a,
                }}
              >
                More
              </Text>
            </TouchableOpacity>
          </View>
        </DropShadow>
      </>
    );
  }

  function renderHome() {
    const HeaderComponent = () => (
      <View>
        {renderHeader()}
        {renderStudySpaceHeader()}
      </View>
    );

    const renderStudySpaceHeader = () => (
      <View style={{ marginLeft: 20, marginBottom: 10 }}>
        <Text style={{ ...FONTS.h2c }}>Library Space Availability</Text>
      </View>
    );

    //render the study space information's views
    const renderItem = ({ item }) => (
      <View
        style={[
          styles.shadow,
          {
            marginLeft: 20,
            marginBottom: 10,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            width: SIZES.width / 1.125,
            borderWidth: 1,
            borderColor: COLORS.lightgray3,
          },
        ]}
      >
        {/* study space title */}
        <Text
          style={{
            marginTop: 10,
            marginLeft: 15,
            ...FONTS.h3,
            marginRight: 15,
          }}
        >
          {item.name}
        </Text>

        {/* address */}
        <Text
          style={{
            marginLeft: 15,
            ...FONTS.body4,
            marginRight: 15,
          }}
        >
          {item.address}
        </Text>

        {/* study space behaviours */}

        <View
          style={{
            flexDirection: "row",
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <Image
            source={item.isTalk ? icons.chat : icons.no_chat}
            style={{
              tintColor: item.isTalk ? COLORS.green : COLORS.red,
              width: 18,
              height: 18,
              marginRight: 10,
            }}
          />
          <Image
            source={item.isEat ? icons.food : icons.no_food}
            style={{
              tintColor: item.isEat ? COLORS.green : COLORS.red,
              width: 18,
              height: 18,
              marginRight: 10,
            }}
          />
          <Image
            source={item.isDrink ? icons.drink : icons.no_drink}
            style={{
              tintColor: item.isDrink ? COLORS.green : COLORS.red,
              width: 18,
              height: 18,
              marginRight: 10,
            }}
          />
        </View>

        {/* break line */}
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: COLORS.lightgray3,
          }}
        ></View>

        {/* seats information */}
        {/* 
        
        [Notes]

        1. seats status (based on percentage)

        if the number of seats left is 
        // 60% - 100% = green (not busy)
        // 30% - 59% = yellowish orange (moderate)
        // 0% - 29% = red (busy)

         */}

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginLeft: 15,
            paddingRight: 120,
            marginRight: 15,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              backgroundColor:
                (item.availableSeats / item.totalSeats) * 100 >= 60
                  ? COLORS.green
                  : (item.availableSeats / item.totalSeats) * 100 >= 30 &&
                    (item.availableSeats / item.totalSeats) * 100 <= 59
                  ? COLORS.orange
                  : COLORS.red,
              borderRadius: 5,
              width: 100,
              height: 24,
              justifyContent: "center",
              marginRight: 10,
            }}
          >
            <Text
              style={{ color: COLORS.white, marginLeft: 10, ...FONTS.body4a }}
            >
              Seats
            </Text>
          </View>

          <Text style={{ ...FONTS.body4 }}>
            {item.availableSeats} free out of {item.totalSeats}
          </Text>
        </View>

        {/* break line */}
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: COLORS.lightgray3,
          }}
        ></View>

        {/* study space status information */}

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.gray,
              borderRadius: 5,
              width: 100,
              height: 24,
              justifyContent: "center",
              marginRight: 10,
            }}
          >
            <Text
              style={{ color: COLORS.white, marginLeft: 10, ...FONTS.body4a }}
            >
              Status
            </Text>
          </View>

          <Text style={{ ...FONTS.body4 }}>
            <Text
              style={{
                color: item.isOpen ? COLORS.green : COLORS.red,
                ...FONTS.body4,
              }}
            >
              {item.isOpen ? "Open" : "Closed"}
            </Text>{" "}
            now
          </Text>
          <Text style={{ marginLeft: 10, color: COLORS.gray, ...FONTS.body4 }}>
            {item.operatingHours}
          </Text>
        </View>

        {/* break line */}
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: COLORS.lightgray3,
          }}
        ></View>

        {/* seat map clickable section */}

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            marginTop: 10,
            marginLeft: 15,
            marginRight: 15,
            justifyContent: "space-between",
          }}
          onPress={() => {
            //check

            //before nav into seat map, check if:
            //-> reservation == falsed (customization context)
            //-> blacklisted ==  falsed (student data context)

            if (customization.reservationDisabled) {
              //toast
              ToastAndroid.showWithGravityAndOffset(
                "Seat reservation service is unavailable now.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0,
                250
              );
            } else if (studentData.authStat === "Blacklisted") {
              //toast
              ToastAndroid.showWithGravityAndOffset(
                "You are currently blacklisted.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0,
                250
              );
            } else {
              navigation.navigate("SeatMap");
            }
          }} //seat map page
        >
          <Text style={{ ...FONTS.body4 }}>Click here for seat map</Text>
          <Image
            source={icons.right_arrow}
            style={{ width: 10, height: 10, tintColor: COLORS.gray }}
          />
        </TouchableOpacity>
      </View>
    );

    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        data={studySpace}
        keyExtractor={(item) => `${item._id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ marginBottom: 65 }}></View>}
      />
    );
  }

  return (
    <View style={[styles.container]}>
      {studySpace && customization && renderHome()}

      {/* more bottom sheet */}
      <BottomModal
        visible={bottomSheetState}
        onTouchOutside={() => {
          setBottomSheetState(false);
        }}
        onSwipeOut={() => {
          setBottomSheetState(false);
        }}
      >
        <ModalContent>
          <View
            style={{
              height: 30,
              marginHorizontal: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ ...FONTS.h2a }}>Features</Text>
          </View>

          {/* assist me bottom sheet option */}
          <TouchableOpacity onPress={AssistMeBTSPressed}>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
                height: 60,
                alignItems: "center",
              }}
            >
              <Image
                source={icons.hand}
                style={{ tintColor: COLORS.appmain, height: 35, width: 35 }}
              />
              <View style={{ marginLeft: 20 }}>
                <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                  Assist Me
                </Text>
                <Text style={{ ...FONTS.body4a, color: COLORS.gray }}>
                  Request assistance from the librarian
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* timeline bottom sheet option */}
          <TouchableOpacity onPress={TimelineBTSPressed}>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
                height: 60,
                alignItems: "center",
              }}
            >
              <Image
                source={icons.history}
                style={{ tintColor: COLORS.appmain, height: 35, width: 35 }}
              />
              <View style={{ marginLeft: 20 }}>
                <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                  Timeline
                </Text>
                <Text style={{ ...FONTS.body4a, color: COLORS.gray }}>
                  View your seat reservation history in detail
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* FAQs bottom sheet option */}
          <TouchableOpacity onPress={FAQBTSPressed}>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
                height: 60,
                alignItems: "center",
              }}
            >
              <Image
                source={icons.question_sign}
                style={{ tintColor: COLORS.appmain, height: 35, width: 35 }}
              />
              <View style={{ marginLeft: 20 }}>
                <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                  FAQs
                </Text>
                <Text style={{ ...FONTS.body4a, color: COLORS.gray }}>
                  Find answers to all your questions
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </ModalContent>
      </BottomModal>

      {/* assist me pop up dialog */}
      <Modal
        visible={popUpDialogState}
        modalAnimation={
          new ScaleAnimation({
            initialValue: 0, // optional
            useNativeDriver: true, // optional
          })
        }
        width={0.85}
        height={0.38}
      >
        <ModalContent>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Text style={{ ...FONTS.h2b }}>Enter your seat number</Text>
            <Text
              style={{
                textAlign: "center",
                ...FONTS.body4,
                color: COLORS.gray,
                marginBottom: 20,
              }}
            >
              The librarian will arrive shortly to assist you.
            </Text>
            <CustomInput
              name="seatNumber"
              placeholder="Seat Number"
              secureTextEntry={false}
              control={control}
              rules={{ required: "Seat number is required." }}
              marginTop={0}
              marginBottom={0}
            />
            <View style={{ marginTop: "auto" }}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <CustomButton1
                  text="Cancel"
                  onPress={() => setPopUpDialogState(false)}
                  marginTop={20}
                  marginBottom={0}
                  borderRadius={5}
                  width="40%"
                />
                <CustomButton1
                  text="OK"
                  onPress={handleSubmit(onDialogOKPressed)}
                  marginTop={20}
                  marginBottom={0}
                  borderRadius={5}
                  width="40%"
                />
              </View>
            </View>
          </View>
        </ModalContent>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 1,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
});

export default Home;

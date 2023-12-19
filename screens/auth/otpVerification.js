import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useContext, createRef, useState } from "react";
import { Colors, Fonts, Sizes, images } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";

const OtpVerificationScreen = ({ navigation, route }) => {
  const from = route.params.from;
  const [state, setState] = useState({
    firstDigit: "",
    secondDigit: "",
    thirdDigit: "",
    forthDigit: "",
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { firstDigit, secondDigit, thirdDigit, forthDigit } = state;

  /* useEffect(() =>{

        fetch(`http://${localhost}:8082/signup/otp/player`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bodystring: email
                })
          })
          .then(res => {

            return res.json();}
          )
          .then(
            (result) => {
                
                updateState({ firstDigit:  String(result)[0] })
                updateState({ secondDigit:  String(result)[1] })
                updateState({ thirdDigit:  String(result)[2] })
                updateState({ forthDigit:  String(result)[3] })


              console.log(result);
            },
            (error) => {
              console.log(error);

            }
          )
        },[]);

*/

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {backArrow()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {header()}
          {description()}
          {codeInfo()}
          {verifyButton()}
          {resendText()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function resendText() {
    return (
      <Text
        style={{
          textAlign: "center",
          ...Fonts.POPPINS_BOLD,
          color: Colors.redColor,
        }}
      >
       إعادة إرسال
      </Text>
    );
  }

  function codeInfo() {
    const secondTextInput = createRef();
    const thirdTextInput = createRef();
    const forthTextInput = createRef();
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding,
        }}
      >
        <View style={styles.codeInfoWrapStyle}>
          <View style={styles.textFieldWrapStyle}>
            <TextInput
              selectionColor={Colors.primaryColor}
              value={firstDigit}
              style={{
                paddingLeft: Sizes.fixPadding,
                ...Fonts.blackColor14Medium,
              }}
              onChangeText={(text) => {
                updateState({ firstDigit: text });
                secondTextInput.current.focus();
              }}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.textFieldWrapStyle}>
            <TextInput
              selectionColor={Colors.primaryColor}
              value={secondDigit}
              style={{
                paddingLeft: Sizes.fixPadding,
                ...Fonts.blackColor14Medium,
              }}
              ref={secondTextInput}
              keyboardType="numeric"
              onChangeText={(text) => {
                updateState({ secondDigit: text });
                thirdTextInput.current.focus();
              }}
            />
          </View>

          <View style={styles.textFieldWrapStyle}>
            <TextInput
              selectionColor={Colors.primaryColor}
              style={{
                paddingLeft: Sizes.fixPadding,
                ...Fonts.blackColor12Regular,
              }}
              keyboardType="numeric"
              value={thirdDigit}
              ref={thirdTextInput}
              onChangeText={(text) => {
                updateState({ thirdDigit: text });
                forthTextInput.current.focus();
              }}
            />
          </View>

          <View style={styles.textFieldWrapStyle}>
            <TextInput
              selectionColor={Colors.primaryColor}
              style={{
                paddingLeft: Sizes.fixPadding,
                ...Fonts.blackColor12Regular,
              }}
              keyboardType="numeric"
              value={forthDigit}
              ref={forthTextInput}
              onChangeText={(text) => {
                updateState({ forthDigit: text });
                if (from == "forgotPassword") {
                  navigation.push("NewPassword");
                } else {
                  navigation.push("GenderSelection");
                }
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  function verifyButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        onPress={() => {
          from == "forgotPassword"
            ? navigation.push("NewPassword")
            : navigation.push("GenderSelection");
        }}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.blackColor16Bold }}>تأكيد</Text>
      </TouchableOpacity>
    );
  }

  function description() {
    return (
      <Text style={styles.descriptionTextStyle}>
        الرجاء إدخال رمز التحقق هنا الذي أرسلناه لك للتو على معرف البريد
        الإلكتروني الخاص بك.
      </Text>
    );
  }

  function header() {
    return (
      <View style={{ alignSelf: "center" }}>
        <Image
          source={require("../../assets/images/victore/otp.png")}
          style={{ width: 300.0, height: 300.0 }}
        />
        <Text style={{ textAlign: "center", ...Fonts.primaryColor24SemiBold }}>
          {"التحقق من OTP"}
        </Text>
      </View>
    );
  }

  function backArrow() {
    return (
      <MaterialIcons
        name={"arrow-forward"}
        size={24}
        color={Colors.primary4}
        onPress={() => navigation.pop()}
        style={{ margin: Sizes.fixPadding * 2.0, alignSelf: "flex-start" }}
      />
    );
  }
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  loginIcon: {
    alignSelf: "center",
  },
  textFieldWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: Sizes.fixPadding - 2.0,
    elevation: 2.0,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.primary4,
    borderWidth: 1.0,
    borderBottomWidth: 0.5,
    marginHorizontal: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  descriptionTextStyle: {
    marginTop: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 4.0,
    textAlign: "center",
    ...Fonts.blackColor14SemiBold,
  },
  codeInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding * 3.0,
  },
});

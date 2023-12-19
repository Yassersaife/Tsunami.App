import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useCallback, useState, useEffect, useContext } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";
import { db } from "../../firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../constants/AuthContext";

const { width } = Dimensions.get("window");

const SuccessPaymentScreen = ({ navigation, route }) => {
  const { Address } = route.params;
  const { totalValue } = route.params;
  const [User, setUser] = useState([]);

  const [UserID, Users] = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(false);

  const backAction = () => {
    navigation.push("BottomTabs");
    return true;
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    try {
      setisLoading(true);
      console.log("homeee");
      const dataCollection = doc(db, "Users", UserID);

      const querySnapshot = await getDoc(dataCollection);

      setUser(querySnapshot.data());
      console.log(querySnapshot.data());
      setisLoading(false);
    } catch (error) {
      console.error("Error fetching data:");
      setisLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        {welcomeText()}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Sizes.fixPadding,
            justifyContent: "center",
          }}
        >
          {paymentInfo()}
        </ScrollView>
        {backToHameButton()}
      </View>
    </SafeAreaView>
  );

  function backToHameButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        onPress={() => navigation.push("BottomTabs")}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.blackColor16SemiBold }}>
          العودة إلى الصفحة الرئيسية{" "}
        </Text>
      </TouchableOpacity>
    );
  }

  function paymentInfo() {
    return (
      <View
        style={{
          alignItems: "center",
          top: 10,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Image
          source={require("../../assets/images/icons/success.png")}
          style={{
            width: width / 1.2,
            height: width / 1.2,
            resizeMode: "contain",
          }}
        />
        <Text
          style={{
            marginVertical: Sizes.fixPadding / 5,
            ...Fonts.blackColor20SemiBold,
          }}
        >
          تم تأكيد الشراء{" "}
        </Text>
        <Text
          style={{
            textAlign: "center",
            ...Fonts.primaryColor14SemiBold,
            color: Colors.primary4,
          }}
        >
          يسرنا أن نعلمك أن طلبك قيد التجهيز حاليًا وسيتم شحنه قريبًا. يمكنك
          متابعة حالة طلبك عبر الرقم التتبع الخاص به. إذا كانت لديك أي استفسارات
          أو تحتاج إلى مساعدة إضافية، فلا تتردد في التواصل معنا. شكرًا لاختياركم
          خدماتنا!{" "}
        </Text>
        {scheduleAndSubscriptionInfo()}
      </View>
    );
  }

  function scheduleAndSubscriptionInfo() {
    return (
      <View
        style={{
          ...styles.scheduleAndSubscriptionInfoWrapStyle,
          borderLeftWidth: 0.0,
          flexDirection: "row",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.scheduleAndSubscriptionDividerStyle} />
        <View
          style={{
            flex: 1,
            margin: Sizes.fixPadding,
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              ...Fonts.blackColor18SemiBold,
              borderBottomWidth: 1,
              borderColor: Colors.primary4,
              textAlign: "left",
            }}
          >
            {User.Name}{" "}
          </Text>
          {dateAndTimeInfo()}
          {subscriptionInfo()}
        </View>
      </View>
    );
  }

  function subscriptionInfo() {
    return (
      <View>
        <Text style={{ ...Fonts.blackColor16SemiBold, textAlign: "left" }}>
          السعر الاجمالي
        </Text>
        <Text style={{ ...Fonts.primaryColor14SemiBold, textAlign: "left" }}>
          {totalValue} $
        </Text>
      </View>
    );
  }

  function dateAndTimeInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding + 5.0,
        }}
      >
        <Text style={{ ...Fonts.blackColor16SemiBold, textAlign: "left" }}>
          العنوان
        </Text>
        <Text style={{ ...Fonts.primaryColor14SemiBold, textAlign: "left" }}>
          {Address}
        </Text>
      </View>
    );
  }

  function welcomeText() {
    return (
      <Text
        style={{
          textAlign: "center",
          padding: Sizes.fixPadding * 2,
          ...Fonts.blackColor18Bold,
        }}
      >
        مرحبا بك في متجر{" "}
        <Text
          style={{
            textAlign: "center",
            padding: Sizes.fixPadding * 2,
            ...Fonts.primaryColor24SemiBold,
          }}
        >
          تسونامي
        </Text>
      </Text>
    );
  }
};

export default SuccessPaymentScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    margin: Sizes.fixPadding * 2.0,
  },
  scheduleAndSubscriptionInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 0.5,
    borderColor: Colors.primary4,
    borderWidth: 1.0,
    marginTop: Sizes.fixPadding * 2.0,
  },
  scheduleAndSubscriptionDividerStyle: {
    top: -1.0,
    backgroundColor: Colors.primaryColor,
    width: 10.0,
    height: "103%",
    borderRadius: 5,
  },
});

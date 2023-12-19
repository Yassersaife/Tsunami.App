import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { Stack, ActivityIndicator } from "@react-native-material/core";

import CreditCard from "react-native-credit-card";
import { AuthContext } from "../../constants/AuthContext";
import { db } from "../../firebase/Firebase";
import {
  getDocs,
  doc,
  addDoc,
  collection,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
const SelectPaymentMethodScreen = ({ navigation, route }) => {
  const { whatsapp } = route.params;
  const { Address } = route.params;
  const { totalValue } = route.params;
  const [UserID, setuserID] = useContext(AuthContext);
  console.log(whatsapp);
  console.log(Address);
  console.log(totalValue);
  const [isLoading, setisLoading] = useState(false);

  const [state, setState] = useState({
    selectedPaymentIndex: "mastercard",
    cardHolderName: "hisham aboshi",
    cardNumber: "1234 5678 9810 1123",
    expireDate: "08/28",
    cvv: "344",
  });

  const { selectedPaymentIndex, cardHolderName, cardNumber, expireDate, cvv } =
    state;

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const handleCashOnDelivery = async (e) => {
    if (
      cardHolderName == "" ||
      cardNumber == "" ||
      expireDate == "" ||
      cvv == ""
    )
      setisLoading(false);
    else {
      try {
        //console.log(totalValue);
        setisLoading(true);

        const dataCollection = collection(db, "Cart " + UserID);

        const querySnapshot = await getDocs(dataCollection);

        const Products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(Products);

        const userDocRef = collection(db, "Buyer-Cart " + UserID);
        const newDocRef = await addDoc(userDocRef, {
          Products,
          TotlaPrice: totalValue,
          tel: whatsapp,
          Address: Address,
          Paymentstatus: "مدفوع نقداً",
        });
        console.log(newDocRef.id);

        const OrderDocRef = collection(db, "Orders");
        const OtderDucment = doc(OrderDocRef, newDocRef.id);
        await setDoc(OtderDucment, {
          id: newDocRef.id,
          userid: UserID,
          TotlaPrice: totalValue,
          tel: whatsapp,
          Address: Address,
          Paymentstatus: "مدفوع نقداً",
        });

        querySnapshot.docs.forEach((documentId) => {
          const itemRef = doc(db, "Cart " + UserID, documentId.id);
          deleteDoc(itemRef);
        });
        console.log("doneeeee");
        navigation.navigate("SuccessPayment", {
          Address: Address,
          totalValue: totalValue,
        });

        setisLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setisLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1, paddingBottom: 60 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: Sizes.fixPadding - 8.0 }}
        >
          {card()}
          {methods()}
          {cardHolderNameInfo()}
          {cardNumberInfo()}
          {dateAndCvvInfo()}
        </ScrollView>
        {payNowButton()}
      </View>
    </SafeAreaView>
  );

  function payNowButton() {
    return (
      <View style={{ backgroundColor: Colors.whiteColor }}>
        <TouchableOpacity
          activeOpacity={0.99}
          onPress={handleCashOnDelivery}
          style={styles.buttonStyle}
        >
          {isLoading ? (
            <ActivityIndicator
              size={30}
              color={Colors.blackColor}
              style={{ alignSelf: "center" }}
            />
          ) : (
            <Text style={{ ...Fonts.blackColor18Bold }}>
              ادفع الأن ₪{totalValue}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  function dateAndCvvInfo() {
    return (
      <View
        style={{
          flexDirection: "row-reverse",
          alignItems: "center",
          margin: Sizes.fixPadding * 2.0,
        }}
      >
        {expireDateInfo()}
        {cvvInfo()}
      </View>
    );
  }

  function cvvInfo() {
    return (
      <View style={{ flex: 1, marginRight: Sizes.fixPadding * 3.0 }}>
        <Text numberOfLines={1} style={{ ...Fonts.primaryColor18SemiBold }}>
          cvv
        </Text>
        <TextInput
          value={cvv}
          onChangeText={(text) => updateState({ cvv: text })}
          style={styles.textFieldStyle}
          activeUnderlineColor={Colors.primaryColor}
          underlineColor={Colors.blackColor}
          keyboardType="numeric"
        />
      </View>
    );
  }

  function expireDateInfo() {
    return (
      <View
        style={{
          flex: 1,
          marginLeft: Sizes.fixPadding - 3.0,
        }}
      >
        <Text style={{ ...Fonts.primaryColor18SemiBold }}>التاريخ </Text>
        <TextInput
          value={expireDate}
          onChangeText={(text) => updateState({ expireDate: text })}
          style={styles.textFieldStyle}
          activeUnderlineColor={Colors.primaryColor}
          underlineColor={Colors.blackColor}
          keyboardType="numeric"
        />
      </View>
    );
  }

  function cardNumberInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.primaryColor18SemiBold }}>رقم البطاقة </Text>
        <TextInput
          value={cardNumber}
          onChangeText={(text) => updateState({ cardNumber: text })}
          style={styles.textFieldStyle}
          activeUnderlineColor={Colors.primaryColor}
          underlineColor={Colors.blackColor}
          keyboardType="numeric"
        />
      </View>
    );
  }

  function cardHolderNameInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.primaryColor18SemiBold }}>
          إسم صاحب البطاقة{" "}
        </Text>
        <TextInput
          value={cardHolderName}
          onChangeText={(text) => updateState({ cardHolderName: text })}
          style={styles.textFieldStyle}
          activeUnderlineColor={Colors.primaryColor}
          underlineColor={Colors.blackColor}
        />
      </View>
    );
  }

  function methods() {
    return (
      <View style={styles.paymentMethodsWrapStyle}>
        <View style={{ flexDirection: "row" }}>
          {paymentMethodShort({
            icon: require("../../assets/images/icons/card.png"),
            index: "mastercard",
          })}
          {paymentMethodShort({
            icon: require("../../assets/images/icons/visa.png"),
            index: "visa",
          })}
        </View>
      </View>
    );
  }

  function paymentMethodShort({ icon, index }) {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        onPress={() => {
          updateState({ selectedPaymentIndex: index });
        }}
        style={{ flex: 1, alignItems: "center" }}
      >
        <Image source={icon} style={{ height: 40.0, resizeMode: "contain" }} />
        <View style={styles.paymentMethodDividerStyle} />
        <View
          style={{
            ...styles.checkBoxStyle,
            borderColor:
              index == selectedPaymentIndex
                ? Colors.primaryColor
                : Colors.blackColor,
          }}
        >
          {index == selectedPaymentIndex ? (
            <View style={styles.selectedCheckBoxStyle} />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }
  function card() {
    return (
      <View
        style={{
          borderRadius: Sizes.fixPadding + 2.0,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: Sizes.fixPadding * 4.0,
          paddingVertical: Sizes.fixPadding * 3,
          marginBottom: Sizes.fixPadding + 5.0,
        }}
      >
        <CreditCard
          type={selectedPaymentIndex}
          imageFront={require("../../assets/images/icons/card-front.png")}
          imageBack={require("../../assets/images/icons/card-back.png")}
          shiny={false}
          bar={true}
          number={cardNumber}
          name={cardHolderName}
          expiry={expireDate}
          cvc={cvv}
        />
      </View>
    );
  }
  function header() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MaterialIcons
          name={"arrow-forward"}
          size={24}
          color={Colors.blackColor}
          onPress={() => navigation.pop()}
        />
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding,
            ...Fonts.blackColor18SemiBold,
          }}
        >
          طريقة الدفع او السداد
        </Text>
      </View>
    );
  }
};

export default SelectPaymentMethodScreen;

const styles = StyleSheet.create({
  checkBoxStyle: {
    width: 18.0,
    height: 18.0,
    borderRadius: 9.0,
    borderWidth: 1.0,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentMethodDividerStyle: {
    backgroundColor: Colors.primary4,
    height: 1.0,
    width: "100%",
    marginVertical: Sizes.fixPadding,
  },
  selectedCheckBoxStyle: {
    width: 10.0,
    height: 10.0,
    borderRadius: 5.0,
    backgroundColor: Colors.primaryColor,
  },
  paymentMethodsWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding - 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding - 5.0,
  },
  textFieldStyle: {
    paddingHorizontal: 0,
    paddingBottom: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.whiteColor,
    ...Fonts.blackColor16Regular,
    height: 30.0,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    margin: Sizes.fixPadding * 2.0,
  },
});

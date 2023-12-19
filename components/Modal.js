import React, { useRef } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { TextInput } from "react-native-paper";

import { AuthContext } from "../constants/AuthContext";
import { db } from "../firebase/Firebase";
import {
  getDocs,
  doc,
  addDoc,
  collection,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { Colors, Fonts, Sizes, Size } from "../constants/styles";
import { Stack, ActivityIndicator } from "@react-native-material/core";

import Modal from "react-native-modal";

const { width, height } = Dimensions.get("window");

const ModalScreen = ({ navigation, TotalValue, hideModal }) => {
  const [UserID, setuserID] = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(false);

  const [Address, setAddress] = useState("");
  const [whatsapp, setwhatsapp] = useState("");
  const [message, setMessage] = useState("");
  const [totalValue, settotalValue] = useState(TotalValue);
  console.log(totalValue);

  const handleCloseModal = () => {
    hideModal();
  };
  const handleCashOnDelivery = async (e) => {
    setMessage("");

    if (Address == "" || whatsapp == "") setMessage("أملأ الحقول الفارغة");
    else {
      try {
        setisLoading(true);
        console.log(totalValue);
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
          Paymentstatus: "عند الستلام",
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
          Paymentstatus: "عند الستلام",
        });
        console.log("doneeeee orders");

        querySnapshot.docs.forEach((documentId) => {
          const itemRef = doc(db, "Cart " + UserID, documentId.id);
          deleteDoc(itemRef);
        });
        console.log("doneeeee");
        handleCloseModal();
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
    <Modal
      isVisible={true}
      onBackdropPress={handleCloseModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropColor="#707070"
      backdropOpacity={1}
      deviceWidth={width}
      deviceHeight={height}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: 73,
        flex: 1,
      }}
    >
      <View
        style={{
          width: width,
          height: height / 1.3,
          paddingBottom: 20,
          paddingTop: 40,

          marginHorizontal: 10,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "white",
          borderRadius: 35,
          gap: 20,
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            flexDirection: "row",
            gap: 20,
            marginVertical: 10,
          }}
        >
          <Image
            style={{ height: 50, width: 50 }}
            source={require("../assets/images/icon.png")}
          />

          <Text style={{ ...Fonts.primaryColor24SemiBold, top: 7 }}>
            خدمة التوصيل{" "}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            gap: 25,
            justifyContent: "center",
            alignItems: "flex-start",
            marginVertical: Sizes.fixPadding,
          }}
        >
          <View style={style.textFieldWrapStyle}>
            <TextInput
              value={Address}
              onChangeText={(e) => setAddress(e)}
              label=" العنوان"
              mode="outlined"
              placeholder=" العنوان"
              outlineColor="#A0ABC4"
              activeOutlineColor={Colors.primaryColor}
              selectionColor={Colors.primaryColor}
              placeholderTextColor={"#8D8D8D"}
              style={{
                ...Fonts.blackColor16Regular,
                justifyContent: "center",
                height: 50,
                backgroundColor: "#F8F8F8",
                width: 340,
                borderRadius: 40,
              }}
            />
          </View>
          <View style={style.textFieldWrapStyle}>
            <TextInput
              value={whatsapp}
              onChangeText={(e) => setwhatsapp(e)}
              label="رقم الواتس اب"
              mode="outlined"
              placeholder="رقم الواتس اب"
              outlineColor="#A0ABC4"
              activeOutlineColor={Colors.primaryColor}
              OutlineColor="#A0ABC4"
              selectionColor={Colors.primaryColor}
              placeholderTextColor={"#8D8D8D"}
              style={{
                ...Fonts.blackColor16Regular,
                justifyContent: "center",
                height: 50,
                width: 340,

                backgroundColor: "#F8F8F8",
                borderRadius: 40,
              }}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 40,
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              width: 340,
              height: 60,
              paddingVertical: 15,
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              borderRadius: 16,
              backgroundColor: Colors.primaryColor,
              shadowColor: Colors.primaryColor,
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.4,
              shadowRadius: 30,
            }}
            onPress={() => {
              setMessage("");

              if (Address == "" || whatsapp == "")
                setMessage("أملأ الحقول الفارغة");
              else {
                handleCloseModal();
                navigation.navigate("SelectPayment", {
                  whatsapp: whatsapp,
                  Address: Address,
                  totalValue: totalValue,
                });
              }
            }}
          >
            <Text
              style={{ ...Fonts.blackColor18SemiBold, textAlign: "center" }}
            >
              الدفع نقداً
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              ...Fonts.primaryColor18SemiBold,
              color: Colors.primary4,
              textAlign: "center",
              justifyContent: "flex-start",
            }}
          >
            {"أو"}
          </Text>

          <TouchableOpacity
            style={{
              display: "flex",
              width: 340,
              height: 60,
              paddingVertical: 15,
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              borderRadius: 16,
              backgroundColor: Colors.primary4,
              shadowColor: Colors.primary4,
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 30,
            }}
            onPress={handleCashOnDelivery}
          >
            {isLoading ? (
              <ActivityIndicator
                size={40}
                color={Colors.blackColor}
                style={{ alignSelf: "center" }}
              />
            ) : (
              <Text
                style={{ ...Fonts.whiteColor18SemiBold, textAlign: "center" }}
              >
                الدفع عند التسليم{" "}
              </Text>
            )}
          </TouchableOpacity>

          <Text
            style={{
              ...Fonts.grayColor18SemiBold,
              color: Colors.redColor,
              paddingTop: 20,
              textAlign: "center",
              justifyContent: "flex-start",
              borderColor: Colors.redColor,
            }}
          >
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
};
export default ModalScreen;

const style = StyleSheet.create({
  actionBtn: {
    width: 100,
    height: 20,
    backgroundColor: Colors.primary2,
    borderRadius: 20,
    paddingHorizontal: 2,
    marginHorizontal: 2,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textFieldWrapStyle: {
    borderColor: Colors.DARK_FIVE,
    borderRadius: Sizes.fixPadding - 2.0,
    padding: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
});

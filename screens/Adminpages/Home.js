import {
  SafeAreaView,
  ScrollView,
  TouchableOpaascity,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ImageBackground,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Colors, Fonts, Sizes, Size } from "../../constants/styles";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import svgicon from "../../assets/images/icon.jpg";

const { width, height } = Dimensions.get("window");
const WorkCategories = [
  {
    id: "1",
    Image: require("../../assets/images/victore/pro.png"),
    Name: "اضافة منتوجات",
    ONPress: "Addproduct",
  },
  {
    id: "2",
    Image: require("../../assets/images/victore/people.png"),
    Name: "الزبائن",
    ONPress: "Clients",
  },
  {
    id: "3",
    Image: require("../../assets/images/victore/de.png"),
    Name: "الطلبيات",
    ONPress: "OrdersAdmin",
  },
  {
    id: "4",
    Image: require("../../assets/images/victore/logout.png"),
    Name: "تسجيل خروج",
    ONPress: "Signin",
  },
];

const HomeTraninerScreen = ({ navigation, route, screenProps }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
        >
          {banner()}
          {workCategoriesData()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function workCategoriesData() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(`${item.ONPress}`);
        }}
        style={{
          flex: 1,
          elevation: 2.0,
          marginHorizontal: Sizes.fixPadding,
          marginBottom: Sizes.fixPadding * 4.0,
          height: 209,
          width: 231,
          backgroundColor: Colors.DEFAULT_WHITE,
          borderRadius: 20,
          marginRight: 20,
          shadowColor: Colors.DARK_ONE,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}
      >
        <ImageBackground
          source={item.Image}
          style={{ height: height / 6.0 }}
          borderTopLeftRadius={Sizes.fixPadding - 2.0}
          borderTopRightRadius={Sizes.fixPadding - 2.0}
        >
          <MaterialIcons
            size={23}
            name="phone-iphone"
            color={Colors.primaryColor}
            style={{ alignSelf: "flex-end", margin: Sizes.fixPadding - 5.0 }}
          />
        </ImageBackground>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 15,
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <View>
            <Text
              numberOfLines={1}
              style={{ fontSize: 14, ...Fonts.blackColor18Bold, top: 10 }}
            >
              {item.Name}
            </Text>
          </View>
          <View
            style={{
              marginVertical: Size / 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primary4,
                padding: 5,
                borderRadius: Size,
                left: 10,
                top: 7,
              }}
              onPress={() => navigation.push(`${item.ONPress}`)}
            >
              <AntDesignIcons
                name="left"
                style={{ fontSize: 15, color: Colors.whiteColor }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={WorkCategories}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: Sizes.fixPadding,
          paddingVertical: Sizes.fixPadding * 6,
        }}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  function banner() {
    return (
      <View
        style={{
          ...styles.bannerWrapStyle,
          alignItems: "flex-start",
          flexDirection: "row-reverse",
          justifyContent: "flex-start",
          height: 110,
        }}
      >
        <View
          style={{
            position: "absolute",
            bottom: -10.5,
            borderRadius: 30,
            padding: 15,
          }}
        >
          <Image
            source={require("../../assets/images/victore/admin.png")}
            style={{
              height: width / 2.7,
              width: width / 2,
            }}
          />
        </View>
        <View
          style={{
            zIndex: 1.0,
            flex: 1,
            paddingHorizontal: 5,
            alignItems: "flex-start",
          }}
        >
          <Text style={{ ...Fonts.blackColor24SemiBold, textAlign: "left" }}>
            {"تسونامي فون \n افضل محل لبيع هواتف"}
          </Text>
        </View>
      </View>
    );
  }

  function header() {
    return (
      <View style={{ ...styles.headerWrapStyle, flexDirection: "row" }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Image
            source={svgicon}
            style={{ width: 45.0, height: 45.0, borderRadius: 22.5 }}
          />
          <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding + 5.0 }}>
            <Text style={{ ...Fonts.blackColor16SemiBold, textAlign: "left" }}>
              {"مرحبا هشام الصيفي"}{" "}
            </Text>
            <Text style={{ ...Fonts.blackColor14Regular, textAlign: "left" }}>
              {"مدير تطبيق تسونامي"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.99}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View style={{ marginLeft: Sizes.fixPadding, marginRight: 0.0 }}>
            <MaterialCommunityIcons
              name="chat"
              size={24}
              color={Colors.primary4}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

export default HomeTraninerScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    marginVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "space-between",
  },
  newNotificationBellStyle: {
    position: "absolute",
    width: 8.0,
    height: 8.0,
    borderRadius: 4.0,
    backgroundColor: Colors.redColor,
    right: 2.5,
    top: 5.0,
    borderColor: Colors.whiteColor,
    borderWidth: 1.0,
  },
  joinNowButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    marginTop: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding - 5.0,
  },
  bannerWrapStyle: {
    marginHorizontal: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    paddingVertical: Sizes.fixPadding + 6.0,
    marginTop: Sizes.fixPadding + 50.0,
    borderColor: Colors.primary4,
    borderRadius: 30,
    borderWidth: 1.5,
  },
});

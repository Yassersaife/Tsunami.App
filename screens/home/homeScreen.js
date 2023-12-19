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
  Linking,
} from "react-native";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { Colors, Fonts, Sizes, Size } from "../../constants/styles";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Foundation,
} from "@expo/vector-icons";
import { ActivityIndicator } from "@react-native-material/core";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import brandsdata from "../../data/brands.js";
import { Overlay } from "react-native-elements";
import { AuthContext } from "../../constants/AuthContext";
import imageProfile from "../../assets/images/victore/img.png";
import { BlurView } from "expo-blur";
import { useFocusEffect } from "@react-navigation/native";

import { auth, db, storages } from "../../firebase/Firebase";
import {
  setDoc,
  doc,
  collection,
  addDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation, route, screenProps }) => {
  const [UserID, Users] = useContext(AuthContext);

  const [isLoading, setisLoading] = useState(false);
  const [User, setUser] = useState([]);
  const [products, setProducts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setisLoading(true);
      const dataCollection = collection(db, "Products");

      const querySnapshot = await getDocs(dataCollection);

      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(dataArray);
      console.log(dataArray);
      setisLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setisLoading(false);
    }
  };

  const openWhatsApp = () => {
    const whatsappLink = `whatsapp://send?phone=0568972337`;

    // Check if the WhatsApp app is installed
    Linking.canOpenURL(whatsappLink).then((supported) => {
      if (supported) {
        // Open the WhatsApp link
        return Linking.openURL(whatsappLink);
      } else {
        console.error("WhatsApp is not installed on the device");
      }
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.DEFAULT_WHITE }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 4.0 }}
        >
          {banner()}
          {brands()}
          {Shop()}
        </ScrollView>
        {loadingDialog()}
      </View>
    </SafeAreaView>
  );
  function loadingDialog() {
    return (
      <Overlay
        isVisible={isLoading}
        overlayStyle={{
          width: "80%",
          backgroundColor: Colors.whiteColor,
          borderRadius: Sizes.fixPadding,
          paddingHorizontal: Sizes.fixPadding * 2.0,
          paddingBottom: Sizes.fixPadding * 3.5,
          paddingTop: Sizes.fixPadding * 3.0,
          elevation: 3.0,
        }}
      >
        <ActivityIndicator
          size={40}
          color={Colors.primaryColor}
          style={{ alignSelf: "center" }}
        />
        <Text
          style={{
            marginTop: Sizes.fixPadding,
            textAlign: "center",
            ...Fonts.blackColor16Bold,
          }}
        >
          Please wait...
        </Text>
      </Overlay>
    );
  }

  function header() {
    return (
      <View style={{ ...styles.headerWrapStyle, flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.99}
            onPress={openWhatsApp}
            style={{ marginLeft: Sizes.fixPadding, marginRight: 0 }}
          >
            <Icon name="whatsapp" size={40} color={Colors.SECONDARY_GREEN} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              marginHorizontal: Sizes.fixPadding + 5,
              textAlign: "center",
            }}
          >
            <Text style={{ ...Fonts.blackColor16Regular, textAlign: "left" }}>
              {`مرحبا, ${User.Name}`}
            </Text>

            <Text
              style={{ ...Fonts.primaryColor16SemiBold, textAlign: "left" }}
            >
              Tsunami Phone
            </Text>
          </View>
          <Image
            source={User.image ? { uri: User.image } : imageProfile}
            style={{
              width: 60,
              height: 60,
              borderRadius: 100.5,
              borderWidth: 0.1,
              borderColor: Colors.primaryColor,
            }}
          />
        </View>
      </View>
    );
  }

  function banner() {
    return (
      <View
        style={{
          ...styles.bannerWrapStyle,
          flexDirection: "row-reverse",
          borderWidth: 1,
          borderColor: Colors.primaryColor,
          borderRadius: 30.5,
        }}
      >
        <View style={{ zIndex: 1.0, flex: 0.8 }}>
          <Text style={{ ...Fonts.blackColor18SemiBold }}>
            {"استكشف عالم الهواتف الذكية \n بكل راحة وسهولة عبر تطبيقنا"}
          </Text>
          <Text
            style={{
              ...Fonts.blackColor14Regular,
              paddingTop: Sizes.fixPadding,
            }}
          >
            تسوق الآن واستفد من الخصومات الحصرية{" "}
          </Text>
          <TouchableOpacity
            activeOpacity={0.99}
            onPress={() => navigation.push("shop")}
            style={{ ...styles.joinNowButtonStyle, alignSelf: "flex-end" }}
          >
            <Text style={{ ...Fonts.primaryColor18SemiBold }}>
              {"تسوق الان"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ position: "absolute", right: -40.0, bottom: -2 }}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={{
              height: height / 5.3,
              resizeMode: "stretch",
              width: width / 1.5,
            }}
          />
        </View>
      </View>
    );
  }
  function brands() {
    const renderItem = ({ item }) => {
      if (item.id != 0) {
        return (
          <TouchableOpacity
            activeOpacity={0.99}
            onPress={() => navigation.push("Shop")}
            style={{
              alignItems: "center",
              marginRight: Sizes.fixPadding * 2.0,
            }}
          >
            <Image source={item.brandImage} style={styles.foodImageStyle} />
            <View style={styles.mealsCategoryWrapStyle}>
              <Text style={{ ...Fonts.blackColor16SemiBold }}>
                {item.brandCategory}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }
    };
    return (
      <View style={{ marginTop: Sizes.fixPadding + 15.0 }}>
        <View
          style={{
            ...styles.dietCategoriesHeaderWrapStyle,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              marginHorizontal: Sizes.fixPadding * 2.0,
              ...Fonts.blackColor18SemiBold,
            }}
          >
            {"الماركات المشهورة"}
          </Text>
          <Text
            onPress={() => navigation.push("shop")}
            style={{ ...Fonts.primaryColor14SemiBold }}
          >
            {"اظهار الكل"}
          </Text>
        </View>
        <View style={{ marginTop: Sizes.fixPadding }}>
          <FlatList
            data={brandsdata}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{
              paddingBottom: Sizes.fixPadding * 3.0,
              paddingLeft: Sizes.fixPadding * 2.0,
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  function Shop() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.99}
          onPress={() => {
            navigation.navigate("ProductInfo", {
              product: item,
            });
          }}
          style={{ alignItems: "center", marginRight: Sizes.fixPadding * 2.0 }}
        >
          <View
            key={item.id}
            style={{
              width: width / 2 - Size * 2,
              marginBottom: Size,
              borderRadius: Size * 3,
              overflow: "hidden",
              height: 300,
            }}
          >
            <BlurView
              intensity={95}
              style={{
                backgroundColor: Colors.DARK_FIVE,
                padding: Size,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 190,
                  width: "100%",
                }}
              >
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: Size * 2,
                    }}
                  />
                )}
                <View
                  style={{
                    position: "absolute",
                    right: -9,
                    borderBottomStartRadius: Size * 3,
                    borderTopEndRadius: Size * 2,
                    overflow: "hidden",
                    top: -10,
                  }}
                >
                  <BlurView
                    tint="dark"
                    intensity={70}
                    style={{
                      flexDirection: "row",
                      padding: Size - 2,
                    }}
                  >
                    <Foundation
                      style={{
                        marginLeft: Size / 2,
                      }}
                      name="burst-new"
                      color={Colors.primaryColor}
                      size={Size * 2}
                    />
                    <Text
                      style={{
                        ...Fonts.whiteColor14SemiBold,
                        marginLeft: Size / 2,
                      }}
                    >
                      {item.date}
                    </Text>
                  </BlurView>
                </View>
              </TouchableOpacity>
              <Text
                numberOfLines={1}
                style={{
                  color: Colors.blackColor,
                  ...Fonts.blackColor16Bold,
                  marginTop: Size,
                  marginBottom: Size / 2,
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {item.name}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.blackColor12Regular,
                  alignItems: "center",
                  color: Colors.DEFAULT_RED,
                  textAlign: "center",
                }}
              >
                {item.includes}
              </Text>
              <View
                style={{
                  marginVertical: Size / 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 5,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.lightPrimaryColor,
                      marginRight: Size / 2,
                      fontSize: Size * 2,
                    }}
                  >
                    ₪
                  </Text>
                  <Text
                    style={{ color: Colors.DARK_ONE, fontSize: Size * 1.6 }}
                  >
                    {item.price}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ProductInfo", {
                      product: item,
                    });
                  }}
                  style={{
                    backgroundColor: Colors.DEFAULT_WHITE,
                    padding: Size,
                    borderRadius: Size,
                    borderBottomRightRadius: 30,
                    left: 10,
                  }}
                >
                  <MaterialIcons
                    name="add-shopping-cart"
                    size={Size * 3}
                    color={Colors.primaryColor}
                  />
                </TouchableOpacity>
              </View>
            </BlurView>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{ marginTop: Sizes.fixPadding + 15.0 }}>
        <View
          style={{
            ...styles.dietCategoriesHeaderWrapStyle,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              marginHorizontal: Sizes.fixPadding * 2.0,
              ...Fonts.blackColor16SemiBold,
            }}
          >
            شائع
          </Text>
          <Text
            onPress={() => navigation.push("Shop")}
            style={{ ...Fonts.primaryColor14SemiBold }}
          >
            أظهار الكل
          </Text>
        </View>
        <View style={{ marginTop: Sizes.fixPadding }}>
          <FlatList
            data={products.slice(0, 5)}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{
              paddingBottom: Sizes.fixPadding * 2,
              paddingLeft: Sizes.fixPadding * 2.0,
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    marginVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightPrimaryColor,
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
    backgroundColor: Colors.DARK_THREE,
    borderRadius: Sizes.fixPadding * 2,
    paddingVertical: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    marginTop: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding - 5.0,
    right: 70,
  },
  bannerWrapStyle: {
    paddingLeft: Sizes.fixPadding * 2,
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding + 5.0,
    marginTop: Sizes.fixPadding + 10.0,
  },
  todayInfoWrapStyle: {
    marginTop: Sizes.fixPadding,
    padding: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 7.0,
  },
  sessionStartTimeWrapStyle: {
    marginTop: Sizes.fixPadding - 7.0,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding - 8.0,
  },
  mealsCategoryWrapStyle: {
    alignItems: "center",
    backgroundColor: Colors.SECONDARY_WHITE,
    elevation: 2.0,
    position: "absolute",
    bottom: -30.0,
    paddingHorizontal: Sizes.fixPadding * 3.0,
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding + 15.0,
  },
  foodImageStyle: {
    width: width / 3,
    height: width / 3.3,
    resizeMode: "stretch",
    borderRadius: Sizes.fixPadding - 2.0,
  },
  trainerInfoWrapStyle: {
    marginRight: Sizes.fixPadding * 2.0,
    width: width / 2.5,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding - 2.0,
    backgroundColor: Colors.whiteColor,
  },
  currencyWrapStyle: {
    margin: Sizes.fixPadding - 3.0,
    alignSelf: "flex-end",
    backgroundColor: Colors.primaryColor,
    width: 18.0,
    height: 18.0,
    borderRadius: 9.0,
    alignItems: "center",
    justifyContent: "center",
  },
  trainerDetailWrapStyle: {
    paddingVertical: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    justifyContent: "space-between",
  },
  workoutThumbImageStyle: {
    width: width / 1.7,
    height: width / 2.8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    marginTop: Sizes.fixPadding * 3.0,
    marginBottom: Sizes.fixPadding,
  },
  card: {
    width: width / 1.5,
    height: width / 2.7,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderRadius: 8,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: null,
    height: 158,
    borderRadius: 8,
  },
  imageStyle: {
    borderRadius: 8,
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    ...Fonts.blackColor16Medium,
  },
  subtitle: {
    color: "#FFF",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
  dietCategoriesHeaderWrapStyle: {
    marginBottom: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryColor,
  },
});

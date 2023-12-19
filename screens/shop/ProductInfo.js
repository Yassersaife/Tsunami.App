import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useContext } from "react";
import { Stack, ActivityIndicator } from "@react-native-material/core";
import { Overlay } from "react-native-elements";

import {
  Ionicons,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors, Fonts, Sizes, Size } from "../../constants/styles";
import { BlurView } from "expo-blur";
import { AuthContext } from "../../constants/AuthContext";
import { auth, db } from "../../firebase/Firebase";
import { setDoc, doc, collection, addDoc } from "firebase/firestore";

const { height, width } = Dimensions.get("window");
const colors = [
  {
    id: 1,
    code: Colors.redColor,
  },
  {
    id: 2,
    code: Colors.DEFAULT_YELLOW,
  },
  {
    id: 3,
    code: Colors.DEFAULT_WHITE,
  },
  {
    id: 4,
    code: Colors.DEFAULT_BLACK,
  },
  {
    id: 5,
    code: Colors.DEFAULT_GREEN,
  },
];
const ProductInfo = ({ navigation, route }) => {
  const { product } = route.params;

  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [UserID, setuserID] = useContext(AuthContext);

  const [message, setMessage] = useState("");
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleAddCart = async (e) => {
    setMessage("");
    console.log(product);
    setisLoading(true);
    try {
      const userDocRef = doc(db, "Cart " + UserID, product.id);
      await setDoc(userDocRef, {
        ...product,
        qty: 1,
        TotlaPrice: product.price,
        Color: activeColorIndex,
      });
      // Log a success message

      setMessage("تم أضافتها للمحفظة");
      setisLoading(false);
      setShowAppointmentDialog(true);
    } catch (error) {
      setMessage("لم يتم أضافتها للمحفظة");
      setisLoading(false);
      setShowAppointmentDialog(true);
    }
  };

  return (
    <>
      <ScrollView>
        <SafeAreaView>
          <ImageBackground
            source={{ uri: product.image }}
            style={{
              height: height / 2 + Size * 6,

              justifyContent: "space-between",
            }}
            imageStyle={{
              borderRadius: Size * 4,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: Size * 1,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.pop()}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 40,
                  width: 40,
                  backgroundColor: Colors.DARK_THREE,
                  borderRadius: Size * 1.5,
                }}
              >
                <Ionicons
                  name="arrow-forward"
                  color={Colors.primaryColor}
                  size={Size * 2.5}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 40,
                  width: 40,
                  backgroundColor: Colors.DARK_THREE,
                  borderRadius: Size * 1.5,
                }}
              >
                <Foundation
                  name="heart"
                  color={Colors.DEFAULT_RED}
                  size={Size * 2.5}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderRadius: Size * 3,
                overflow: "hidden",
              }}
            >
              <BlurView
                intensity={70}
                tint="dark"
                style={{
                  padding: Size * 2,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      ...Fonts.whiteColor18SemiBold,
                      marginBottom: Size,
                    }}
                  >
                    {product.name}
                  </Text>
                  <Text
                    style={{
                      ...Fonts.whiteColor14SemiBold,
                      paddingVertical: Size,
                      textAlign: "left",
                    }}
                  >
                    {product.includes}
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: Size / 2 }}>
                    <Foundation
                      name="burst-new"
                      size={Size * 3}
                      color={Colors.DEFAULT_YELLOW}
                    />
                    <Text
                      style={{
                        ...Fonts.whiteColor22Bold,
                        marginLeft: Size,
                      }}
                    >
                      {product.date}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "40%",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  ></View>
                  <View
                    style={{
                      borderRadius: Size / 2,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        padding: Size / 4,
                        width: Size * 5,
                        height: Size * 5,
                        backgroundColor: Colors.DARK_FOUR,
                        borderRadius: Size,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MaterialIcons
                        name="sd-storage"
                        size={20}
                        color={Colors.primaryColor}
                      />
                      <Text
                        style={{
                          ...Fonts.primaryColor14SemiBold,
                        }}
                      >
                        {product.storage}G
                      </Text>
                    </View>
                    <View
                      style={{
                        padding: Size / 4,
                        width: Size * 5,
                        height: Size * 5,
                        backgroundColor: Colors.DARK_FOUR,
                        borderRadius: Size,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MaterialIcons
                        name="battery-charging-full"
                        size={Size * 2}
                        color={Colors.primaryColor}
                      />
                      <Text
                        style={{
                          ...Fonts.primaryColor14SemiBold,
                        }}
                      >
                        %{product.battery}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      borderRadius: Size / 2,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        ...Fonts.primaryColor16SemiBold,
                      }}
                    >
                      Tsunami Phone
                    </Text>
                  </View>
                </View>
              </BlurView>
            </View>
          </ImageBackground>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: Size,
              left: 10,
            }}
          >
            <Text
              style={{
                ...Fonts.blackColor18Bold,
                marginBottom: Size,
                padding: Size,
              }}
            >
              اللون
            </Text>
            {colors.map((color, index) => (
              <View
                key={color.id}
                style={[
                  {
                    marginHorizontal: Size,
                    borderRadius: Size * 2,
                    borderWidth: 1,
                    borderColor: Colors.blackColor,
                  },
                  activeColorIndex === index && {
                    borderWidth: Size / 2,
                    borderColor: Colors.DARK_FIVE,
                    blurRadius: 50,
                    borderStyle: "dashed",
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => setActiveColorIndex(index)}
                  style={{
                    backgroundColor: color.code,
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                  }}
                />
              </View>
            ))}
          </View>
          <View
            style={{
              padding: Size,
              flexDirection: "column",
              paddingVertical: Size * 2,
              alignItems: "flex-start",
              left: 10,
            }}
          >
            <Text
              style={{
                ...Fonts.blackColor20SemiBold,
                textAlign: "right",
              }}
            >
              المواصفات
            </Text>

            <Text
              numberOfLines={3}
              style={{ color: Colors.DEFAULT_BLACK, textAlign: "right" }}
            >
              {product.description}
            </Text>
          </View>
        </SafeAreaView>
      </ScrollView>
      <SafeAreaView
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <View
          style={{
            padding: Size,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: Size * 3,
            gap: 5,
          }}
        >
          <Text style={{ ...Fonts.primaryColor18SemiBold }}>السعر</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: Colors.primaryColor, fontSize: Size * 2.5 }}>
              ₪
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontSize: Size * 2.5,
                marginLeft: Size / 2,
              }}
            >
              {product.price}
            </Text>
          </View>
        </View>
        {showAppointmentDialog ? (
          <TouchableOpacity
            onPress={() => navigation.push("Cart")}
            style={{
              marginRight: Size,
              backgroundColor: Colors.SECONDARY_GREEN,
              width: width / 2 + Size * 3,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: Size * 2,
            }}
          >
            <Text
              style={{
                ...Fonts.blackColor16SemiBold,
              }}
            >
              {message}
            </Text>
            <MaterialCommunityIcons
              name="cart-check"
              size={30}
              color={Colors.DARK_THREE}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleAddCart}
            style={{
              marginRight: Size,
              backgroundColor: Colors.primaryColor,
              width: width / 2 + Size * 3,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: Size * 2,
            }}
          >
            {isLoading ? (
              <ActivityIndicator
                size={40}
                color={Colors.blackColor}
                style={{ alignSelf: "center" }}
              />
            ) : (
              <Text
                style={{
                  ...Fonts.blackColor22SemiBold,
                }}
              >
                أشتري الان
              </Text>
            )}
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({});

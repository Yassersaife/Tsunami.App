import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import SearchField from "../../components/SearchField";
import Categories from "../../components/Categories";
import { Colors, Fonts, Sizes, Size } from "../../constants/styles";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Foundation,
} from "@expo/vector-icons";
import { collection, doc, deleteDoc, getDocs } from "@firebase/firestore";
import { auth, db, storages } from "../../firebase/Firebase";
import { TextInput, Searchbar } from "react-native-paper";

const avatar = require("../../assets/images/icon.jpg");

const { width, height } = Dimensions.get("window");

const ShopScreen = ({ navigation }) => {
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const dataCollection = collection(db, "Products");

      const querySnapshot = await getDocs(dataCollection);

      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(dataArray);
      setSearchResults(dataArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={{
          padding: Size / 2,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: Size * 2,
              overflow: "hidden",
              width: Size * 5,
              height: Size * 5,
            }}
          >
            <BlurView
              style={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.DARK_THREE,
                  padding: Size,
                  borderRadius: Size * 1.5,
                }}
              >
                <Image
                  source={require("../../assets/images/icon.jpg")}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100.5,
                    borderWidth: 0.1,
                    borderColor: Colors.primaryColor,
                  }}
                />
              </TouchableOpacity>
            </BlurView>
          </TouchableOpacity>
          <View
            style={{
              width: Size * 5,
              height: Size * 5,
              overflow: "hidden",
              borderRadius: Size,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.99}
              onPress={() => navigation.push("Cart")}
              style={{
                borderRadius: Size * 2,
                overflow: "hidden",
                width: Size * 5,
                height: Size * 5,
              }}
            >
              <BlurView
                style={{
                  height: "100%",
                  padding: Size / 2,
                }}
              >
                <Foundation
                  name="shopping-cart"
                  size={Size * 4}
                  color={Colors.primary4}
                />
              </BlurView>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "80%",
            marginVertical: Size * 3,
            color: Colors.primary2,
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Text
            style={{
              ...Fonts.blackColor24SemiBold,
              textAlign: "center",
              alignItems: "center",
              left: Size * 4,
            }}
          >
            استعرض تشكيلتنا المتنوعة واختر الهاتف الأمثل عبر تطبيق
            <Text
              style={{
                ...Fonts.primaryColor24SemiBold,
                paddingHorizontal: 10,
              }}
            >
              {" "}
              تسونامي فون{" "}
            </Text>
          </Text>
        </View>
        <View style={{ padding: 20 }}>
          <Searchbar
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              const filteredData = products.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
              );
              setSearchResults(filteredData);
            }}
            placeholder={"ابحث عن منتج"}
            style={{
              ...Fonts.primaryColor24SemiBold,
              justifyContent: "center",
              height: 50,
              backgroundColor: Colors.whiteColor,
              borderRadius: 40,
              borderWidth: 1,
              borderColor: Colors.primary4,
            }}
          />
        </View>
        <Categories onChange={(id) => setActiveCategoryId(id)} />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginVertical: Size * 2,
            paddingLeft: 5,
          }}
        >
          {searchQuery
            ? searchResults
                .filter((item) => {
                  if (activeCategoryId == 0) {
                    return item;
                  } else {
                    return item.brandId == activeCategoryId;
                  }
                })
                .map((item) => (
                  <View
                    key={item.id}
                    style={{
                      width: width / 2 - Size * 2,
                      marginBottom: Size * 2,
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
                        onPress={() => {
                          navigation.navigate("ProductInfo", {
                            product: item,
                          });
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
                            style={{
                              color: Colors.DARK_ONE,
                              fontSize: Size * 1.6,
                            }}
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
                ))
            : products
                .filter((item) => {
                  if (activeCategoryId == 0) {
                    return item;
                  }
                  return item.brandId === activeCategoryId;
                })
                .map((item) => (
                  <View
                    key={item.id}
                    style={{
                      width: width / 2 - Size * 2,
                      marginBottom: Size * 2,
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
                        onPress={() => {
                          navigation.navigate("ProductInfo", {
                            product: item,
                          });
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
                            style={{
                              color: Colors.DARK_ONE,
                              fontSize: Size * 1.6,
                            }}
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
                ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({});

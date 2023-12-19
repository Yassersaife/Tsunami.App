import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { Colors, Fonts, Size } from "../../constants/styles";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import data from "../../data/onboarding";
const { width, height } = Dimensions.get("window");

const OnboardingScreen = ({ navigation }) => {
  const flatlistRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [viewableItems, setViewableItems] = useState([]);

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    setViewableItems(viewableItems);
  });
  useEffect(() => {
    if (!viewableItems[0] || currentPage === viewableItems[0].index) return;
    setCurrentPage(viewableItems[0].index);
  }, [viewableItems]);

  const handleNext = () => {
    if (currentPage == 0) return;

    flatlistRef.current.scrollToIndex({
      animated: true,
      index: currentPage - 1,
    });
  };

  const handleBack = () => {
    if (currentPage == data.length - 1) return;
    flatlistRef.current.scrollToIndex({
      animated: true,
      index: currentPage + 1,
    });
  };

  const handleSkipToEnd = () => {
    flatlistRef.current.scrollToIndex({
      animate: true,
      index: data.length - 1,
    });
  };

  const renderTopSection = () => {
    return (
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: Size * 2,

            paddingTop: Size ,
            borderBottomWidth:0.2,
            borderColor:Colors.primaryColor
          }}
        >
          {/* Back button */}
          <TouchableOpacity
            onPress={handleBack}
            style={{
              padding: Size,
            }}
          >
            {/* Back icon */}
            {/* Hide back button on 1st screen */}
            <AntDesignIcons
              name="right"
              style={{
                fontSize: 25,
                color: Colors.primaryColor,
                opacity: currentPage == data.length - 1 ? 0 : 1,
              }}
            />
          </TouchableOpacity>

          {/* Skip button */}
          {/* Hide Skip button on last screen */}
          <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
            {currentPage == 0 ? (
              <Text
                style={{
                  ...Fonts.primaryColor18SemiBold,
                }}
              ></Text>
            ) : (
              <Text
                style={{
                  ...Fonts.primaryColor18SemiBold,
                }}
              >
                تخطى
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const renderBottomSection = () => {
    return (
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: Size * 2,
            paddingVertical: Size * 2,
          }}
        >
          {/* Pagination */}
          <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
            {
              // No. of dots
              [...Array(data.length)].map((_id, index) => (
                <View
                  key={index}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor:
                      index == currentPage
                        ? Colors.primaryColor
                        : Colors.primary4 ,
                    marginRight: 8,
                  }}
                />
              ))
            }
          </View>

          {/* Next or GetStarted button */}
          {/* Show or Hide Next button & GetStarted button by screen */}
          {currentPage != 0 ? (
            <TouchableOpacity
              onPress={handleNext}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: Colors.primaryColor,
              }}
              activeOpacity={0.8}
            >
              <AntDesignIcons
                name="left"
                style={{
                  fontSize: 18,
                  color: Colors.DEFAULT_WHITE,
                  opacity: 0.3,
                }}
              />
              <AntDesignIcons
                name="left"
                style={{
                  fontSize: 25,
                  color: Colors.DEFAULT_WHITE,
                  marginLeft: -15,
                }}
              />
            </TouchableOpacity>
          ) : (
            // Get Started Button
            <TouchableOpacity
              onPress={() => navigation.navigate("Signin")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: 150,
                height: 50,
                borderRadius: 30,
                backgroundColor: Colors.primaryColor,
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  ...Fonts.blackColor24SemiBold,
                }}
              >
                أبدأ
                
                
              </Text>
              <AntDesignIcons
                  name="doubleleft"
                  style={{
                    fontSize: 20,
                    color: Colors.DARK_THREE,
left:20                  }}
                />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  };

  const renderFlatlistItem = ({ item }) => {
    return (
      <View
        style={{
          width: width,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginVertical: Size,
          }}
        >
          <ImageBackground
            source={item.img}
            style={{ width: width, height: 500, resizeMode: "center" }}
          />
        </View>
        <View style={{ paddingHorizontal: Size * 2, marginVertical: Size * 2 }}>
          <Text
            style={{ ...Fonts.primaryColor24SemiBold,textAlign:'center' }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 18,
              opacity: 0.4,
              textAlign: "center",
              marginTop: 15,
              lineHeight: 28,
            }}
          >
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
        justifyContent: "center",
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
      />

      {/* TOP SECTION - Back & Skip button */}
      {renderTopSection()}

      {/* FLATLIST with pages */}
      <FlatList
        data={data}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={true}
        keyExtractor={(item) => item._id}
        renderItem={renderFlatlistItem}
        ref={flatlistRef}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
        initialNumToRender={1}
        extraData={width}
      />

      {/* BOTTOM SECTION - pagination & next or GetStarted button */}
      {renderBottomSection()}
    </View>
  );
};

export default OnboardingScreen;
const styles = StyleSheet.create({});

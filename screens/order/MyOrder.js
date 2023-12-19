import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    FlatList,
    Image,
  } from "react-native";
  import React, { useState, useContext, useEffect } from "react";
  import { Colors, Fonts, Sizes,Size } from "../../constants/styles";
  import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

  import { TextInput, Searchbar } from "react-native-paper";
  
  
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
  ]

  const MYOrderScreen = ({ navigation ,route}) => {
    const {Orderlist} = route.params;
    const [search, setSearch] = useState("");

  console.log(Orderlist)
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
        <View style={{ flex: 1 }}>
          {header()}
          {searchField()}
          {trainersData()}
        </View>
      </SafeAreaView>
    );
  
    function trainersData() {
      const renderItem = ({ item }) => (
        <View style={styles.cartCard}>
        <Image source={{uri:item.image}} style={{ height: 100, width: 90 }} />
        <View
          style={{
            marginLeft: 0,
            padding: 10,
            flex: 1,
            alignItems: "flex-start",
            justifycontent: 'space-between',gap:20,
          }}
        >
          <Text style={{ ...Fonts.blackColor16SemiBold, }}>
            {item.name}
          </Text>
  
          <Text
            style={{ ...Fonts.primaryColor18SemiBold,color:Colors.primaryColor, }}
          >
            ₪{item.TotlaPrice}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <View style={{flex:1,flexDirection:'column', alignItems: "center",gap: 20, justifycontent: 'space-between'
                     , paddingHorizontal: 5,paddingVertical:15, }}>
            
            <View style={styles.actionBtn}>
              
              <Text style={{ ...Fonts.blackColor20SemiBold,  }}>
              {item.qty}
            </Text>
             
            </View>
            <View
                style={[
                  {
                    marginHorizontal: Size ,
                    borderRadius: Size * 2,
               
                    borderWidth: Size / 5,
                    borderColor: Colors.blackColor,
                    blurRadius:50,borderStyle: 'dashed',
                  },
                ]}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: colors[item.Color].code,
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                  }}
                />
              </View>
          </View>
        </View>
      </View>
      );
      return (
        <FlatList
        data={Orderlist.Products.filter((item) => {
            return search.toLowerCase() == ""
              ? item
              : item.name.toLowerCase().includes(search);
          })}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0 }}
        />
      );
    }
  
    function searchField() {
        return (
          <View style={{ padding: 20 }}>
            <Searchbar
              value={search}
              onChangeText={(text) => setSearch(text)}
              placeholder={"البحث"}
              style={{
                ...Fonts.blackColor16Regular,
                justifyContent: "center",
                height: 50,
                backgroundColor: "#F8F8F8",
                borderRadius: 40,
                borderWidth: 1,
                borderColor: Colors.primary4,
              }}
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
            size={25}
            color={Colors.primary4}
            onPress={() => navigation.pop()}
          />
          <Text
            style={{
              marginHorizontal: Sizes.fixPadding,
              ...Fonts.blackColor18SemiBold,
            }}
          > 
          </Text>
        </View>
      );
    }
  };
  
  export default MYOrderScreen;
  
  const styles = StyleSheet.create({
    trainerInfoWrapStyle: {
      marginHorizontal: Sizes.fixPadding * 2.0,
      marginBottom: Sizes.fixPadding * 3.0,
      paddingVertical: Sizes.fixPadding + 7.0,
      paddingHorizontal: Sizes.fixPadding,
      alignItems: "center",
      justifyContent: "space-between",
      elevation: 1.5,
      borderRadius: Sizes.fixPadding + 2.0,
      backgroundColor: Colors.whiteColor,
      borderColor: Colors.primary4,
      borderWidth: 1.0,
      borderBottomWidth: 0.5,
    }, cartCard: {
        height: 130,
        elevation: 1,
        borderRadius: 20,
        borderWidth: 0.3,
        backgroundColor: Colors.SECONDARY_WHITE,
        marginVertical: 8,
        marginHorizontal: 20,
        borderColor: Colors.primaryColor,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
      },
      actionBtn: {
        width: 40,
        height:30,
        backgroundColor: Colors.primary4,
        borderRadius: 15,
        paddingHorizontal: 2,
        marginHorizontal:2,
        borderWidth:4,
        borderColor:Colors.primaryColor,
        flex:1,
        flexDirection: "row",
        alignItems:'center',
        justifyContent: "center",
      },
      textFieldWrapStyle: {
        borderColor: Colors.DARK_FIVE,
        borderRadius: Sizes.fixPadding - 2.0,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
    }
  });
  
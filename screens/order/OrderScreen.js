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
  import { Colors, Fonts, Sizes } from "../../constants/styles";
  import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
  import { AuthContext } from "../../constants/AuthContext";

  import { TextInput, Searchbar } from "react-native-paper";
  import { collection, doc, deleteDoc, getDocs } from "@firebase/firestore";
  import { auth, db, storages } from "../../firebase/Firebase";
  
  
  const OrderScreen = ({ navigation }) => {
    const [Orders, setOrders] = useState([]);
    const [UserID,setuserID]  = useContext(AuthContext);

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        console.log(UserID);
        const dataCollection = collection(db, "Buyer-Cart " + UserID);
  
        const querySnapshot = await getDocs(dataCollection);
  
        const dataArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
       // console.log(dataArray)

        setOrders(dataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
        <View style={{ flex: 1 }}>
          {header()}
          {trainersData()}
        </View>
      </SafeAreaView>
    );
  
    function trainersData() {
      const renderItem = ({ item }) => (
        <TouchableOpacity
          activeOpacity={0.99}
          style={{ ...styles.trainerInfoWrapStyle, flexDirection: "row" }}
          onPress={() => {
            
            navigation.navigate("MyOrder", {
              Orderlist: item
            });
            console.log(item)

          }}
          

        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Image
              source={ { uri: item.Products[0].image } }
              style={{ width: 70.0, height: 70.0, borderRadius: 35.0 }}
            />
            <View
              style={{ flex: 1, marginLeft: Sizes.fixPadding, marginRight: 0.0 }}
            >
              <View style={{ marginBottom: Sizes.fixPadding - 6.0 ,flexDirection: "column", alignItems: "flex-start",gap:15 }}>
                <Text
                  style={{ ...Fonts.blackColor16SemiBold, textAlign: "left" }}
                >
                  {item.Address}
                </Text>
               
                <Text style={{ ...Fonts.blackColor16Regular, textAlign: "left" }}>
                  {item.tel}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "column", alignItems: "center",gap:5 }}>
          <MaterialCommunityIcons name="cart-check" size={25}  color={Colors.primaryColor} />
            <Text style={{ ...Fonts.blackColor16Medium, textAlign: "left" }}>
              {item.Paymentstatus}
            </Text>
            <Text style={{ ...Fonts.primaryColor18SemiBold, textAlign: "left" }}>
                  {item.TotlaPrice}₪
                </Text>
          </View>
        </TouchableOpacity>
      );
      return (
        <FlatList
          data={Orders}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0 }}
        />
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
          >طلبات
          </Text>
        </View>
      );
    }
  };
  
  export default OrderScreen;
  
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
    },
  });
  
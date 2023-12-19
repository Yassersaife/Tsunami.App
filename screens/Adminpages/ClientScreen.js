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
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import imageProfile from "../../assets/images/victore/img.png";

import { TextInput, Searchbar } from "react-native-paper";
import { collection, doc, deleteDoc, getDocs } from "@firebase/firestore";
import { auth, db, storages } from "../../firebase/Firebase";


const ClientScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [clients, setclients] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const dataCollection = collection(db, "Users");

      const querySnapshot = await getDocs(dataCollection);

      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setclients(dataArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


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
      <TouchableOpacity
        activeOpacity={0.99}
        style={{ ...styles.trainerInfoWrapStyle, flexDirection: "row" }}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Image
            source={item.image ? { uri: item.image } : imageProfile}
            style={{ width: 70.0, height: 70.0, borderRadius: 35.0 }}
          />
          <View
            style={{ flex: 1, marginLeft: Sizes.fixPadding, marginRight: 0.0 }}
          >
            <View style={{ marginBottom: Sizes.fixPadding - 6.0 }}>
              <Text
                style={{ ...Fonts.blackColor14SemiBold, textAlign: "left" }}
              >
                {item.Name}
              </Text>
              <Text style={{ ...Fonts.blackColor14Regular, textAlign: "left" }}>
                {item.email}
              </Text>
              <Text style={{ ...Fonts.blackColor14Regular, textAlign: "left" }}>
                {item.city}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <MaterialIcons name="chat" size={20} color={Colors.primaryColor} />
          <Text style={{ ...Fonts.blackColor14Regular, textAlign: "left" }}>
            {item.phoneNumber}
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={clients.filter((item) => {
          return search.toLowerCase() == ""
            ? item
            : item.fullname.toLowerCase().includes(search);
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
          زبائن تسونامي
        </Text>
      </View>
    );
  }
};

export default ClientScreen;

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

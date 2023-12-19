import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useContext, useEffect,useCallback } from "react";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { ActivityIndicator } from "@react-native-material/core";

import { Overlay } from "react-native-elements";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../../constants/AuthContext";
import imageProfile from '../../assets/images/victore/img.png'
import { useFocusEffect } from '@react-navigation/native';
import { auth, db, storages } from "../../firebase/Firebase";
import { setDoc, doc, collection, addDoc,getDocs, getDoc } from "firebase/firestore";
import {  signOut } from "firebase/auth";


const { width } = Dimensions.get("window");

const ProfileScreen = ({ navigation }) => {
  const [UserID,setuserID]  = useContext(AuthContext);
  const [User, setUser] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      setShowLogoutDialog(false);
      navigation.push("Signin");
      setuserID('');
        } catch (error) {
      console.error('Error signing out:', error.message);
    }}
  useFocusEffect(
    useCallback(() => {
    fetchUser();
},[]));

const fetchUser = async () => {
  try {
    setisLoading(true);

    console.log('profile');
    const dataCollection = doc(db,'Users',UserID);

    const querySnapshot = await getDoc(dataCollection);

    
    setUser(querySnapshot.data());
 console.log(querySnapshot.data());
 setisLoading(false);

  } catch (error) {
    console.error('Error fetching data:');
    setisLoading(false);

  }
};
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
        {header()}
        <View style={styles.sheetStyle}>
          {profilePic()}
          {editProfileButton()}
          {profileOptions()}
        </View>
      </View>
      {logoutDialog()}
      {loadingDialog()}
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
          size={60}
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
  function logoutDialog() {
    return (
      <Overlay
        isVisible={showLogoutDialog}
        onBackdropPress={() => setShowLogoutDialog(false)}
        overlayStyle={{
          width: width - 40.0,
          borderRadius: Sizes.fixPadding - 2.0,
          padding: 0.0,
        }}
      >
        <View style={{ margin: Sizes.fixPadding * 2.0 }}>
          <Text style={{ textAlign: "center", ...Fonts.blackColor20SemiBold }}>
            {"هل أنت متأكد أنك تريد تسجيل الخروج؟"}
          </Text>
          <View style={styles.cancelAndLogoutButtonWrapStyle}>
            <TouchableOpacity
              activeOpacity={0.99}
              onPress={() => setShowLogoutDialog(false)}
              style={{
                ...styles.cancelButtonStyle,
                ...styles.cancelAndLogoutButtonStyle,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  marginHorizontal: Sizes.fixPadding - 5.0,
                  ...Fonts.whiteColor18SemiBold,
                }}
              >
                {"الغاء"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.99}
              onPress={handleSignOut}
                
            
              style={{
                ...styles.logoutButtonStyle,
                ...styles.cancelAndLogoutButtonStyle,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  marginHorizontal: Sizes.fixPadding - 5.0,
                  ...Fonts.whiteColor18SemiBold,
                }}
              >
                {"تسجيل خروج"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
    );
  }

  function profileOptions() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
        {profileOptionShort({
            icon: require("../../assets/images/settingIcons/user-avatar.png"),
            option:"تعديل المعلومات الشخصية",
            onPress:() => {navigation.push("EditProfile",{userinfo:User})},

          })}
          {profileOptionShort({
            icon: require("../../assets/images/settingIcons/shopping-bag.png"),
            option:" الطلبات",
            onPress: () => {
              navigation.push("Orders");
            },
          })}

          
          {profileOptionShort({
            icon: require("../../assets/images/settingIcons/cart.png"),
            option:" محفظتي",
            onPress: () => {
              navigation.push("Cart");
            },
          })}
          {profileOptionShort({
            icon: require("../../assets/images/settingIcons/help.png"),
            option:" المساعدة",
            onPress: () => {
              navigation.push("Help");
            },
          })}
          {profileOptionShort({
            icon: require("../../assets/images/settingIcons/logout.png"),
            option:" تسجيل خروج",
            onPress: () => {
              setShowLogoutDialog(true);
            },
          })}
          

        </View>
      </ScrollView>
    );
  }

  function profileOptionShort({ option, onPress, icon }) {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.5 }}>
        <TouchableOpacity
          activeOpacity={0.99}
          onPress={onPress}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={icon}
              style={{ width: 25.0, height: 25.0, resizeMode: "contain" }}
            />
            <Text
              numberOfLines={1}
              style={{
                marginLeft: Sizes.fixPadding,
                marginRight: 0.0,
                flex: 1,
                ...Fonts.blackColor16SemiBold,
              }}
            >
              {option}
            </Text>
          </View>
        </TouchableOpacity>
        {icon == require("../../assets/images/settingIcons/logout.png") ? (
          <View style={{ marginVertical: Sizes.fixPadding * 2.5 }} />
        ) : (
          <View
            style={{
              marginVertical: Sizes.fixPadding * 2.5,
              backgroundColor: Colors.primaryColor,
              height: 1.0,
            }}
          />
        )}
      </View>
    );
  }

  function editProfileButton() {
    return (
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color={Colors.primary4} size={20} />
          <Text style={{ color: Colors.DEFAULT_BLACK, marginLeft: 20 }}>
            {User.city}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color={Colors.primary4} size={20} />
          <Text style={{ color: Colors.DEFAULT_BLACK, marginLeft: 20 }}>
            {User.phoneNumber}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color={Colors.primary4} size={20} />
          <Text style={{ color: Colors.DEFAULT_BLACK, marginLeft: 20 }}>
            {User.email}
          </Text>
        </View>
      </View>
    );
  }

  function profilePic() {
    return (
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          
          
        
         <Avatar.Image  source={User.image?{uri:User.image}:imageProfile}
 size={100} />
        

          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {User.Name}
            </Title>
            <Caption style={styles.caption}>تسونامي فون</Caption>
          </View>
        </View>
      </View>
    );
  }

  function header() {
    return (
      <View style={{ padding: Sizes.fixPadding * 2.5}}>
        <Text style={{ textAlign: "center", ...Fonts.blackColor22SemiBold }}>
          {"الملف الشخصي"}
        </Text>
        
      </View>
    );
  }
};

export default ProfileScreen;

const styles = StyleSheet.create({
  editIconWrapStyle: {
    width: 32.0,
    height: 32.0,
    borderRadius: 17.0,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 22.0,
    top: 20.0,
  },
  logoutIconWrapStyle: {
    width: 35.0,
    height: 35.0,
    borderRadius: 20.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary2,
    position: "absolute",
    right: 20.0,
    top: 20.0,
  },
  profilePicStyle: {
    width: width / 4.0,
    height: width / 4.0,
    borderRadius: width / 4.0 / 2.0,
    marginTop: -40.0,
    borderColor: Colors.whiteColor,
    borderWidth: 1.0,
    alignSelf: "center",
  },
  editProfileButtonStyle: {
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 2.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding - 3.0,
    paddingHorizontal: Sizes.fixPadding * 4.0,
    marginVertical: Sizes.fixPadding,
    alignSelf: "center",
  },
  sheetStyle: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding * 3.0,
    borderTopRightRadius: Sizes.fixPadding * 3.0,
    marginTop: Sizes.fixPadding * 4.0,
  },
  cancelAndLogoutButtonStyle: {
    elevation: 2.0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 2.0,
    paddingVertical: Sizes.fixPadding + 2.0,
    flex: 1,
    borderWidth: 1.0,
  },
  cancelButtonStyle: {
    backgroundColor: Colors.blackColor,
    marginRight: Sizes.fixPadding,
    borderColor: Colors.primary4,
  },
  logoutButtonStyle: {
    backgroundColor: Colors.redColor,
    marginLeft: Sizes.fixPadding,
    borderColor: Colors.primaryColor,
  },
  cancelAndLogoutButtonWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
  },

  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
    borderTopColor: Colors.primaryColor,
    borderTopLeftRadius: 2,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});

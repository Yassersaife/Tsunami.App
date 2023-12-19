import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState,useContext,useEffect } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import { AuthContext } from '../../constants/AuthContext';
import RNPickerSelect from "react-native-picker-select";
import svgicon from '../../assets/images/victore/img.png'
import { TextInput } from 'react-native-paper';
import { auth, db, storages } from "../../firebase/Firebase";
import {collection,updateDoc,doc}from '@firebase/firestore';
import { Stack, ActivityIndicator } from "@react-native-material/core";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";

import * as ImagePicker from "expo-image-picker";

const { width } = Dimensions.get('window');

const EditProfileScreen = ({ navigation,route}) => {
    const { userinfo } = route.params;

    const [message, setMessage] = useState("");

    const [UserID,setuserID]  = useContext(AuthContext);
    const [isLoading, setisLoading] = useState(false);
    const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);


   
  

    const [state, setState] = useState({
        image:userinfo.image,
        Name: userinfo.Name,
        phoneNumber: userinfo.phoneNumber,
        city:userinfo.city,
        showBottomSheet: false,
    })

    const {image, Name, phoneNumber,city, showBottomSheet } = state;
   

    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [16, 9],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          updateState({ image: result.assets[0].uri });
          console.log(result.assets[0].uri );

        } else {
          updateState({ image: null });
          console.log(image);

        }
      };
    
      const uploudImage = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
    
        try {
          const storageRef = ref(storages, `Users/image-${UserID}`);
          const result = await uploadBytes(storageRef, blob);
          blob.close();
          return await getDownloadURL(storageRef);
        } catch (error) {}
      };
    
      const handleupdate = async (e) => {
        setMessage("");
    
        if (
          Name == "" ||
          city == "" ||
          phoneNumber == ""
        ) {
          setMessage("املأ جميع الحقول");
          setShowAppointmentDialog(true);
        } else {
          try {
            setisLoading(true);
            console.log(image);

            const uploudURL = await uploudImage(image);
             updateState({ image: uploudURL });
            const dataCollection = collection(db, 'Users');

            const documentRef = doc(dataCollection,UserID);
    
            const newItemData = {
              Name: Name,
              image: uploudURL,
              city: city,
              phoneNumber: phoneNumber,
                      };
    console.log(uploudURL);
            await updateDoc(documentRef, newItemData);
            // Log a success message
            setMessage("تم تحديث بيانتك الشخصية بنجاح");
            setisLoading(false);
            setShowAppointmentDialog(true);
          } catch (error) {
            setMessage("حدث خطأ بالتحديث");
            setisLoading(false);
            setShowAppointmentDialog(true);
          }
    
          //navigation.push('Home')
        }
      };
    


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {profilePicWithChangeOption()}
                    {nameInfo()}
                    {phoneNumberTextField()}
                    {addressinfo()}
                    {updateButton()}
                </ScrollView>
            </View>
            {appointmentDialog()}
            {loadingDialog()}
            {changeProfilePicOptionsSheet()}
        </SafeAreaView>
    )
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
              انتظر قليلأ
            </Text>
          </Overlay>
        );
      }
      function appointmentDialog() {
        return (
          <Overlay
            isVisible={showAppointmentDialog}
            onBackdropPress={() => {navigation.pop();
                setShowAppointmentDialog(false)}}
            overlayStyle={{
              zIndex: 1,
              width: width - 40.0,
              backgroundColor: Colors.whiteColor,
              borderRadius: Sizes.fixPadding - 2.0,
              padding: 0.0,
              borderWidth: 3,
              borderColor: Colors.primary4,
              height: 120,
              Top:-20,
            }}
          >
            <View
              style={{
                marginVertical: Sizes.fixPadding * 2.5,
                marginHorizontal: Sizes.fixPadding * 2.0,
              }}
            >
              <Text
                style={{ textAlign: "center", ...Fonts.blackColor24SemiBold }}
              >
                {message}
              </Text>
              <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => {
                  setShowAppointmentDialog(false);
                  navigation.pop();
                }}
                style={{ ...styles.buttonStyle, backgroundColor: Colors.primaryColor }}
              >
                <Text style={{ ...Fonts.whiteColor18SemiBold }}> العودة الى صفحة الشخصية</Text>
              </TouchableOpacity>
            </View>
          </Overlay>
        );
      }

    function changeProfilePicOptionsSheet() {
        return (
            <Overlay
                isVisible={showBottomSheet}
                overlayStyle={styles.bottomSheetStyle}
                onBackdropPress={() => updateState({ showBottomSheet: false })}
            >
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={pickImage}
                >
                    <Text style={{ textAlign: 'center', ...Fonts.primaryColor24SemiBold }}>
                        {"تغيير صورة الملف الشخصي"}
                    </Text>
                    <View style={{ marginVertical: Sizes.fixPadding * 4.0, }}>
                        {profilePicOptionShort({ title:"كاميرا", onPress: () => {pickImage} })}
                        {profilePicOptionShort({ title: "المعرض", onPress: () => {pickImage } })}
                    </View>
                </TouchableOpacity>
            </Overlay>
        )
    }

    function profilePicOptionShort({ title, onPress }) {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={pickImage}
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Sizes.fixPadding + 5.0,borderWidth:1,borderColor:Colors.primary4,borderRadius:20 }}
            >
<MaterialIcons name="image-search" size={24} color={Colors.primary4} />
                <Text style={{ marginLeft: Sizes.fixPadding, marginRight:  0.0, ...Fonts.blackColor18Bold }}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }

    function updateButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => handleupdate()}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {"تحديث"}
                </Text>
            </TouchableOpacity>
        )
    }

    function addressinfo() {
        return (
            <View style={{...styles.textFieldWrapStyle,marginVertical:10,borderWidth:1,height:50,
            backgroundColor: '#F8F8F8',justifyContent:'flex-start',marginHorizontal:30,width:'85%',
            flexDirection:'row',flex:1,
        }}>
                 <RNPickerSelect
                       placeholder={{ label: "المدينة", city: null }}
value={city}
textInputProps={Fonts.blackColor16Medium}

                 onValueChange={(value) =>  updateState({ city: value })}
                 items={[
                    { label: "القدس", value: "القدس" },
                    { label: "غزة", value: "غزة" },
                    { label: "الخليل", value: "الخليل" },
                    { label: "طولكرم", value: "طولكرم" },
                    { label: "نابلس", value: "نابلس" },
                    { label: "جنين", value: "جنين" },
                    { label: "طوباس	", value: "طوباس" },
                    { label: "بيت لحم", value: "بيت لحم" },
                    { label: "سلفيت", value: "سلفيت" },
                    { label: "أريحا",value: "أريحا" },
                    { label: "قلقيلية",value: "قلقيلية" },
                    { label: "مناطق 48",value: "مناطق 48" },

                 ]}
             />
            </View>
        )
    }

    function nameInfo() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={Name}

                    onChangeText={(text) => updateState({ Name: text })}
                    label={"اسم المستخدم"}
                    mode="outlined"

                    placeholder={"اسم المستخدم"}
                    style={{ ...Fonts.blackColor16Regular ,
                         justifyContent:'center',
                    height: 50,
                    backgroundColor: '#F8F8F8',
                    borderRadius:40,}}
                    selectionColor={Colors.primaryColor}
                    placeholderTextColor={'#8D8D8D'}
                    outlineColor={Colors.DARK_FIVE}
                    activeOutlineColor={Colors.primary4}
                />
            </View>
        )
    }
    function phoneNumberTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={phoneNumber}
                    onChangeText={(text) => updateState({ phoneNumber: text })}
                    placeholder={"رقم الهاتف"}
                    keyboardType="phone-pad"
                    placeholderTextColor={'#8D8D8D'}
                    label={"رقم الهاتف"}
                    mode="outlined"
                    style={{ ...Fonts.blackColor16Regular ,
                        justifyContent:'center',
                   height: 50,
                   backgroundColor: '#F8F8F8',
                   borderRadius:40,}}
                   selectionColor={Colors.primaryColor}
                   outlineColor={Colors.DARK_FIVE}
                   activeOutlineColor={Colors.primary4}
                />
            </View>
        )
    }

    function profilePicWithChangeOption() {
        return (
            <ImageBackground
               // source={{uri:`http://${localhost}:8082/downloadFile/${userinfo.path}`}}
               
               source={image?{uri:image}:svgicon}
               

                style={styles.profilePicStyle}
                borderRadius={(width / 3.3) / 2.0}
            >
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => updateState({ showBottomSheet: true })}
                    style={styles.addIconWrapStyle}
                >
                    <MaterialIcons name="add" size={15} color={Colors.whiteColor} />
                </TouchableOpacity>
            </ImageBackground>
        )
    }

    function header() {
        return (
            <MaterialIcons
            name={"arrow-forward"}
            size={30}
            color={Colors.primary4}
            style={{ margin: Sizes.fixPadding * 2.0, alignSelf: 'flex-start' }}
            onPress={() => navigation.pop()}
        />
        )
    }
}

export default EditProfileScreen;

const styles = StyleSheet.create({
    addIconWrapStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: 22.0,
        height: 22.0,
        borderRadius: 11.0,
        borderColor: Colors.whiteColor,
        borderWidth: 1.5,
        position: 'absolute',
        right: 10.0,
        bottom: 0.0,
    },
    textFieldWrapStyle: {
        borderColor: Colors.DARK_FIVE,
        borderRadius: Sizes.fixPadding - 2.0,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    profilePicStyle: {
        width: width / 3.3,
        height: width / 3.3,
        alignSelf: 'center',
        marginBottom: Sizes.fixPadding * 2.5,
    },
    textFieldStyle: {
        borderColor: Colors.grayColor,
        borderBottomWidth:1.0,
        ...Fonts.blackColor14Medium,
        elevation: 1.3,
        borderRadius: Sizes.fixPadding - 2.0,
        borderColor:Colors.primaryColor,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        margin: Sizes.fixPadding * 2.0
    },
    bottomSheetStyle: {
        width: '100%',
        position: 'absolute',
        bottom: 0.0,
        borderTopLeftRadius: Sizes.fixPadding - 2.0,
        borderTopRightRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
})
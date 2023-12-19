import { StyleSheet, Text, View,Dimensions, SafeAreaView, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useContext,useState } from 'react'
import { Colors, Fonts, Sizes,images } from '../../constants/styles';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import SvgIcon from '../../assets/images/icon2.png';
import RNPickerSelect from "react-native-picker-select";
import { auth, db } from '../../firebase/Firebase';
import { setDoc, doc, collection, addDoc  } from "firebase/firestore";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from '../../constants/AuthContext';
import { Stack, ActivityIndicator } from "@react-native-material/core";
import { Overlay } from 'react-native-elements';

import { TextInput } from 'react-native-paper';
const { width, height } = Dimensions.get("window");

const SignupScreen = ({ navigation }) => {
    const [UserID,setuserID]  = useContext(AuthContext);

    const [state, setState] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        city:'',
        showPassword: false,
    })

    const { fullName, email, phoneNumber,city, password, showPassword } = state;
    const [message,setMessage] =useState('');
    const [isLoading, setisLoading] = useState(false);
    const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const handleSigup = async (e)=>{
        handleMessage('');

        if(fullName==''||email==''||phoneNumber==''||city==''||password==''){
        handleMessage('املأ الحقول');
        setShowAppointmentDialog(true);}
        else{
            try {''
            setisLoading(true);
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
          
                // Log the user UID for debugging purposes
                console.log('User UID:', user.uid);
          
                // Set user data in Firestore
                const userDocRef = doc(db, "Users", user.uid);
                await setDoc(userDocRef, {
                 email:email,
                  Name: fullName,
                  phoneNumber: phoneNumber,
                  city: city,
                  image:null
                });
                 setuserID(user.uid);
                // Log a success message
                setMessage("تم انشاء الحساب بنجاح");
                setTimeout(() => {

                    navigation.push('BottomTabs')
                    setisLoading(false)
    
                }, 800);

               } catch (error) {
             setMessage("حدث خطأ بالتسجيل");
                setisLoading(false);
                setShowAppointmentDialog(true);
            };

        
    }}

    const handleMessage =(message)=>{
        setMessage(message);
    }

   
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {backArrow()}
                <ScrollView    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 20.0  }}
showsVerticalScrollIndicator={false}>
                    {header()}
                    {fullNameTextField()}
                    {emailIdTextField()}
                    {phoneNumberTextField()}
                    {addressinfo()}
                    {passwordTextField()}
                    {Messageinfo()}
                    {signupButton()}
                    {connectWithInfo()}
                </ScrollView>
            </View>
            {alreadyAccountInfo()}
            {loadingDialog()}
            {appointmentDialog()}
        </SafeAreaView>
    )
    function loadingDialog() {
        return (
            <Overlay
                isVisible={isLoading}
                overlayStyle={{ width: '80%',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 3.5,
        paddingTop: Sizes.fixPadding * 3.0,
        elevation: 3.0,}}
            >
                <ActivityIndicator size={40} color={Colors.primaryColor} style={{ alignSelf: 'center' }} />
                <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.blackColor16Bold }}>
                    انتظر قليلأ
                </Text>
            </Overlay>
        )
    }
    function appointmentDialog() {
        return (
            <Overlay
                isVisible={showAppointmentDialog}
                onBackdropPress={() =>setShowAppointmentDialog(false)}
                overlayStyle={{zIndex:1, width: width - 40.0,backgroundColor:Colors.LIGHT_GREY2, borderRadius: Sizes.fixPadding - 2.0, padding: 0.0 ,borderWidth:3,borderColor:Colors.primary4,height:100}}
            >
                <View style={{ marginVertical: Sizes.fixPadding * 2.5, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <Text style={{ textAlign: 'center', ...Fonts.primaryColor24SemiBold }}>
                        {message}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.99}
                        onPress={() => {
                            setShowAppointmentDialog(false)
                        }}
                        style={{...styles.buttonStyle,backgroundColor:Colors.redColor}}
                    >
                        <Text style={{ ...Fonts.whiteColor18SemiBold }}>
الغاء                        </Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
        )
    }
    function alreadyAccountInfo() {
        return (
            <Text style={styles.alreadyAccountTextStyle}>
                {'هل لديك حساب سابق؟'} { }
                <Text onPress={() => navigation.push('Signin')} style={{ ...Fonts.primaryColor16SemiBold }}>
                    {"تسجيل دخول"}
                </Text>
            </Text>
        )
    }
    function Messageinfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                style={{
                margin:Sizes.fixPadding}}
            >
                <Text style={{ ...Fonts.grayColor14SemiBold,alignItems:'center',justifyContent:'center' }}>
                    {message}
                </Text>
            </TouchableOpacity>
        )
    }

    function socialMediaOptionShort({ bgColor, icon }) {
        return (
            <View style={{
                ...styles.socialMediaIconWrapStyle,
                backgroundColor: bgColor,
            }}>
                <Image
                    source={icon}
                    style={{ width: 80, height: 40, resizeMode: 'contain' }}
                />
            </View>
        )
    }

    function connectWithInfo() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ ...Fonts.blackColor16Bold }}>
                    {"أو تواصل مع "}
                </Text>
                <View style={{ margin: Sizes.fixPadding * 1.0, flexDirection: 'row', alignItems: 'center' }}>
                    {socialMediaOptionShort({ bgColor: Colors.DARK_sex, icon: images.FACEBOOK })}
                    {socialMediaOptionShort({ bgColor: Colors.DARK_sex, icon: images.GOOGLE })}

                </View>
            </View>
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
    

    function signupButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() =>{handleSigup()}}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.blackColor16Bold }}>
                    {"انشاء حساب"}
                </Text>
            </TouchableOpacity>
        )
    }

    function passwordTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>

                <TextInput
                    value={password}
                    onChangeText={(text) => updateState({ password: text })}
                    placeholder={"كلمة السر"}
                    label={"كلمة السر"}
                    mode="outlined"

                    style={{ ...Fonts.blackColor16Regular ,
                        justifyContent:'center',
                   height: 50,
                   backgroundColor: '#F8F8F8',
                   borderRadius:40,}}
                   selectionColor={Colors.primaryColor}
                   outlineColor={Colors.DARK_FIVE}
                   activeOutlineColor={Colors.primary4}
                    secureTextEntry={!showPassword}
                    right={<TextInput.Icon icon={showPassword ? "eye" : "eye-off"}
                    onPress={() => updateState({ showPassword: !showPassword })}
                    color={Colors.primary4}
                    size={25}
                    style={{padding:5,alignItems:'center',justifyContent:'center',top:5}}

                    />}

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

    function emailIdTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={email}
                    onChangeText={(text) => updateState({ email: text })}
                    placeholder={"الايميل"}
                    selectionColor={Colors.primaryColor}
                    keyboardType="email-address"
                    placeholderTextColor={'#8D8D8D'}
                    label={"الايميل"}
                    mode="outlined"
                    style={{ ...Fonts.blackColor16Regular ,
                        justifyContent:'center',
                   height: 50,
                   backgroundColor: '#F8F8F8',
                   borderRadius:40,}}
                   outlineColor={Colors.DARK_FIVE}
                   activeOutlineColor={Colors.primary4}
                />
            </View>
        )
    }

    function fullNameTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={fullName}

                    onChangeText={(text) => updateState({ fullName: text })}
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

    function header() {
        return (
            <View style={styles.loginIcon}>
                <Image
                    source={SvgIcon}
                    style={{ width: 300.0, height: 200.0 }}
                />            
                <Text style={styles.headerWrapStyle}>
انشاء حساب في متجر تسونامي                </Text>
                </View>
              
        )
    }

    function backArrow() {
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

export default SignupScreen;

const styles = StyleSheet.create({
    loginIcon: {
        alignSelf: 'center',
        marginTop:-40,
      },
    headerWrapStyle: {
        marginBottom: Sizes.fixPadding * 2.0,
        textAlign: 'center',
        ...Fonts.primaryColor18SemiBold
    },
    textFieldWrapStyle: {
        borderColor: Colors.DARK_FIVE,
        borderRadius: Sizes.fixPadding - 2.0,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 0.5,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    passwordFieldStyle: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 0.0,
    },
    socialMediaIconWrapStyle: {
        width: 70.0,
        height: 50.0,
        borderRadius: 15.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding - 5.0,
        elevation: 10.0,
    },
    
    alreadyAccountTextStyle: {
        textAlign: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        ...Fonts.blackColor14SemiBold
    },
    orText: {
        fontSize: 15,
        lineHeight: 15 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_BOLD,
        marginLeft: 5,
        alignSelf: 'center',
      },
      facebookButton: {
        backgroundColor: Colors.FABEBOOK_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      googleButton: {
        backgroundColor: Colors.GOOGLE_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
      },
      signinButtonLogo: {
        height: 40,
        width: 40,
      },
      signinButtonLogoContainer: {
        width: 20.0,
        height: 10.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding - 5.0,
        elevation: 3.0,
      },
      socialButtonsContainer: {
        width: 40.0,
        height: 20.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:Colors.DEFAULT_WHITE
      },
      socialSigninButtonText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 16,
        lineHeight: 13 * 1.4,
        fontFamily:Fonts.POPPINS_MEDIUM,
        padding: 2,
        right: 15,

      },
})
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, BackHandler, Image, TouchableOpacity } from 'react-native'
import React, { useContext,useState, useCallback } from 'react'
import { Colors, Fonts, Sizes,images,size } from '../../constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import { Stack, ActivityIndicator } from "@react-native-material/core";
import { Overlay } from 'react-native-elements';
import { auth, db } from '../../firebase/Firebase';
import { AuthContext } from '../../constants/AuthContext';

import {  signInWithEmailAndPassword } from "firebase/auth";

import { TextInput } from 'react-native-paper';


import SvgIcon from '../../assets/images/icon2.png';

const SigninScreen = ({ navigation }) => {

    const [UserID,setuserID]  = useContext(AuthContext);

   
    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
              
              
             
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0)
        }, 2000)
    }

    const [backClickCount, setBackClickCount] = useState(0);
const [message,setMessage] =useState('');
const [messageType,setMessageType] =useState('');

   const [state, setState] = useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const { email, password, showPassword } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const [isLoading, setIsLoading] = useState(false);


    const handleLogin = async() =>{
      //  handleMessage(null);
        setIsLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            const user = userCredential.user;
            setuserID(user.uid);

           if(user.uid ==='pq0uUgaOFSXs30iIfUEuLtPgGjx2'){ 
            setTimeout(() => {

                navigation.push('HomeAdmin')
                setIsLoading(false)
                updateState({ email: '' })
                updateState({ password: '' })
                handleMessage('');
            }, 800);
        }
            else{
            setTimeout(() => {

                navigation.push('BottomTabs')
                setIsLoading(false)
                updateState({ email: '' })
                updateState({ password: '' })
            }, 800);}

            handleMessage("تم تسجيل الدخول بنجاح");
          } catch (error) {
            setIsLoading(false);
            handleMessage('خطأ بكلمة السر او البريد الاكتروني, حاول مرة اخرى');
          }

          
        };



    const handleMessage =(message,type='FAILED')=>{
        setMessage(message);
        setMessageType(type);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {emailIdTextField()}
                    {passwordTextField()}
                    {forgotPasswordText()}
                    {Messageinfo()}
                    {signinButton()}
                    {connectWithInfo()}
                </ScrollView>
            </View>
            {dontAccountInfo()}
            {exitInfo()}
            {loadingDialog()}
        </SafeAreaView>
    )

    function exitInfo() {
        return (
            backClickCount == 1
                ?
                <View style={[styles.animatedView]}>
                    <Text style={{ ...Fonts.whiteColor14Medium }}>
                    "اضغط على رجوع مرة أخرى للخروج"
                       </Text>
                </View>
                :
                null
        )
    }
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
                         أنتظر قليلاً ....                                    </Text>
            </Overlay>
        )
    }

    function dontAccountInfo() {
        return (
            <Text style={styles.alreadyAccountTextStyle}>
                {"ليس لديك حساب؟"} { }
                <Text onPress={() => navigation.push('Signup')} style={{ ...Fonts.primaryColor18SemiBold}}>
                    {"اشترك"}
                </Text>
            </Text>
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
    function Messageinfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                style={{flex:1,
                margin:Sizes.fixPadding}}
            >
                <Text style={{ ...Fonts.grayColor14SemiBold,textAlign:'left' }}>
                    {message}
                </Text>
            </TouchableOpacity>
        )
    }

    function signinButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() =>{handleLogin()}}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.blackColor16Bold }}>
                    {"تسجيل دخول"}
                </Text>
            </TouchableOpacity>
        )
    }

    function forgotPasswordText() {
        return (
            <Text
                onPress={() => navigation.push('ForgotPassword')}
                style={{
                    textAlign: 'right',
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    ...Fonts.blackColor16Bold
                }}
            >
                {"هل نسيت كلمة السر؟"}
            </Text>
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

    function header() {
        return (
            <View style={styles.loginIcon}>
                <Image
                    source={SvgIcon}
                    style={{ width: 300.0, height: 200.0 }}
                />            
                <Text style={styles.headerWrapStyle}>
تسجيل دخول في متجر تسونامي                </Text>
                </View>
              
        )
    }
}

export default SigninScreen;

const styles = StyleSheet.create({
    loginIcon: {
        alignSelf: 'center',
        marginTop:10,
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
        ...Fonts.blackColor18Medium
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
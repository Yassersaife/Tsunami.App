import { StyleSheet, Text,Image, View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState ,useContext} from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
//import { AuthContext } from '../../constants/AuthContext';
import { TextInput } from 'react-native-paper';

const ForgotPasswordScreen = ({ navigation }) => {

  
   const [email, setEmail] = useState('');
    //const {setemail} = useContext(AuthContext);
const handleFor=()=>{
   // setemail(email);
    navigation.push('OtpVerification', { from: 'forgotPassword' })
}
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 20.0  }}
>
                    {header()}
                    {description()}
                    {emailTextField()}
                    {continueButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => handleFor()}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.blackColor16Bold }}>
                    التالي
                </Text>
            </TouchableOpacity>
        )
    }

    function emailTextField() {
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


    function description() {
        return (
            <Text style={styles.descriptionTextStyle}>
                {"الرجاء إدخال معرف البريد الإلكتروني المرتبط بحسابك."}
            </Text>
        )
    }

    function header() {
        return (
           <View style={{alignSelf: 'center'}}>
                <Image
                    source={require('../../assets/images/victore/forgot.png')}
                    style={{ width: 300.0, height: 300.0 }}
                /> 
            <Text style={{ textAlign: 'center', ...Fonts.primaryColor24SemiBold }}>
                {"هل نسيت كلمة السر"}
            </Text>
            </View>
        )
    }

    function backArrow() {
        return (
            <MaterialIcons
                name={ "arrow-forward" }
                size={24}
                color={Colors.primary4}
                onPress={() => navigation.pop()}
                style={{ margin: Sizes.fixPadding * 2.0, alignSelf: 'flex-start' }}
            />
        )
    }
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    textFieldWrapStyle: {
        borderColor: Colors.grayColor,
        borderRadius: Sizes.fixPadding - 2.0,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 4.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 4.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    descriptionTextStyle: {
        marginTop: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 4.0,
        textAlign: 'center',
        ...Fonts.blackColor14SemiBold
    }
})
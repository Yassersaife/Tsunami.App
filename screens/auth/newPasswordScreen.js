import { StyleSheet, Text,ActivityIndicator,Alert,Image ,View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState,useContext } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
//import { AuthContext } from '../../constants/AuthContext';
import { Overlay } from 'react-native-elements';
import { TextInput } from 'react-native-paper';

const NewPasswordScreen = ({ navigation }) => {

    
        const [isLoading, setIsLoading] = useState(false);

    const [state, setState] = useState({
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false,
    })

    const { password, showPassword, confirmPassword, showConfirmPassword } = state;
    //const {email,localhost} = useContext(AuthContext);
    const [msg, setmsg] = useState('');

    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    /*const handlepass=()=>{
        if(password==confirmPassword){
        console.log(email);
        console.log(password);

        fetch(`http://${localhost}:8082/reset-password/player`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email,password:password})
          })
          .then(res => {
            console.log(res.status);
            console.log(res.headers);
            return res.text();
          })
          .then(
            (result) => {
                console.log(result);

                if(result=='Success'){
                    Alert.alert(result)
                    setIsLoading(true)
                    setTimeout(() => {
                        navigation.push('Signin');
                        setIsLoading(false)
                    }, 2000);
    
              }
              else{
                  Alert.alert(result)
                  }
                
              setIsLoading(false);
            },
            (error) => {
              console.log(error);
              setIsLoading(false);
            }
          )}
          else{
            Alert.alert("conform your password")

          }
    }*/

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, marginBottom:80}}>
                {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 20.0  }}
>
                    {header()}
                    {passwordTextField()}
                    {confirmPasswordTextField()}
                    {submitButton()}
                </ScrollView>
                {loadingDialog()}

            </View>
        </SafeAreaView>
    )
    function loadingDialog() {
        return (
            <Overlay
                isVisible={isLoading}
                overlayStyle={styles.dialogStyle}
            >
                <ActivityIndicator size={35} color={Colors.primaryColor} style={{ alignSelf: 'center' }} />
                <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.blackColor16Bold }}>
                    تم تغير كلمة السر بنجاح
                </Text>
            </Overlay>
        )
    }

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => handlepass()}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.blackColor16Bold }}>
                    تحديث

                </Text>
            </TouchableOpacity>
        )
    }

    function confirmPasswordTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>

                <TextInput
                    value={confirmPassword}
                    onChangeText={(text) => updateState({ confirmPassword: text })}
                    placeholder={"تأكيد كلمة السر "}
                    label={' تأكيد كلمة السر '}
                    mode="outlined"

                    style={{ ...Fonts.blackColor16Regular ,
                        justifyContent:'center',
                   height: 50,
                   backgroundColor: '#F8F8F8',
                   borderRadius:40,}}
                   selectionColor={Colors.primaryColor}
                   outlineColor={Colors.DARK_FIVE}
                   activeOutlineColor={Colors.primary4}
                    secureTextEntry={!showConfirmPassword}
                    right={<TextInput.Icon icon={showConfirmPassword ? "eye" : "eye-off"}
                    onPress={() => updateState({ showPassword: !showConfirmPassword })}
                    color={Colors.primary4}
                    size={25}
                    style={{padding:5,alignItems:'center',justifyContent:'center',top:5}}

                    />}

                />
               
            </View>
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

    function header() {
        return (
            <View style={{alignSelf: 'center'}}>
                <Image
                    source={require('../../assets/images/victore/reset.png')}
                    style={{ width: 300.0, height: 300.0 }}
                />    
            <Text style={{ textAlign: 'center', ...Fonts.blackColor24SemiBold, marginBottom: Sizes.fixPadding * 5.0 }}>
           { "كلمة السر الجديدة"  }          </Text>
            </View>
        )
    }

    function backArrow() {
        return (
            <MaterialIcons
                name={"arrow-forward" }
                size={24}
                color={Colors.primary4}
                onPress={() => navigation.pop()}
                style={{ margin: Sizes.fixPadding * 2.0, alignSelf: 'flex-start' }}
            />
        )
    }
}

export default NewPasswordScreen;

const styles = StyleSheet.create({
    textFieldWrapStyle: {
        borderColor: Colors.grayColor,
        borderRadius: Sizes.fixPadding - 2.0,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
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
})
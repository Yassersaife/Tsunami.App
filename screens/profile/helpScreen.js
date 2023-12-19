import { StyleSheet, Text, View,Image, SafeAreaView, StatusBar, TouchableOpacity, Dimensions, ScrollView, } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import { TextInput } from 'react-native-paper';

const { width } = Dimensions.get('window');

const HelpScreen = ({ navigation }) => {

   

    

    const [state, setState] = useState({
        name: '',
        email: '',
        message: '',
        showSubmitDialog: false,
    })

    const { name, email, message, showSubmitDialog } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}          
                 contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 20.0  }}
>
                    {helpDescription()}
                    {userInfo()}
                </ScrollView>
            </View>
            {sendButton()}
            {submitDialog()}
        </SafeAreaView>
    )

    function submitDialog() {
        return (
            <Overlay
                isVisible={showSubmitDialog}
                overlayStyle={{ width: width - 40.0, borderRadius: Sizes.fixPadding - 2.0, padding: 0.0 }}
            >
                <View style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <View style={styles.doneIconWrapStyle}>
                        <MaterialIcons name="done" size={width / 5.5} color={Colors.whiteColor} />
                    </View>
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor22SemiBold }}>
                        {'مقدم'}
                    </Text>
                    <Text style={styles.requestSubmittedTextStyle}>
                        {"تم إرسال طلبك بنجاح ، وسنعاود الاتصال بك."}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.99}
                        onPress={() => {
                            updateState({ showSubmitDialog: false })
                            navigation.pop()
                        }}
                        style={{ ...styles.buttonStyle, marginHorizontal: Sizes.fixPadding }}
                    >
                        <Text style={{ ...Fonts.whiteColor16Bold }}>
                            {"موافق"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
        )
    }

    function sendButton() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor }}>
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => updateState({ showSubmitDialog: true })}
                    style={styles.buttonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor16Bold }}>
                        {"إرسال"}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function userInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 5.0 }}>
                {nameInfo()}
                {emailInfo()}
                {messageInfo()}
            </View>
        )
    }

    function messageInfo() {
        return (
            <View style={styles.textFieldWrapStyle}>

            <TextInput
                placeholder={'اكتب رسالتك هنا'}
                value={message}
                onChangeText={(text) => updateState({ message: text })}
                style={styles.textFieldStyle}
                multiline
                numberOfLines={8}
                label={'اكتب رسالتك هنا'}
                mode="outlined"
                   selectionColor={Colors.primaryColor}
                    placeholderTextColor={'#8D8D8D'}
                    outlineColor={Colors.DARK_FIVE}
                    activeOutlineColor={Colors.primary4}
            
            />
            </View>
        )
    }

    function emailInfo() {
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

    function nameInfo() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={name}

                    onChangeText={(text) => updateState({ name: text })}
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

    function helpDescription() {
        return (
            <View style={{ marginTop:5, alignItems: 'center' }}>
            <Image
                    source={require('../../assets/images/settingIcons/chat.png')}
                    style={{ width: 420.0, height: 280.0 ,right:0}}
                />  
                <Text style={{ ...Fonts.primaryColor24SemiBold }}>
                    {"ابقى على تواصل"}
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 7.0, textAlign: 'center', ...Fonts.blackColor16Medium }}>
                    {"لا تتردد في مراسلتنا"}
                </Text>
            </View>
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

export default HelpScreen;

const styles = StyleSheet.create({
    textFieldStyle1: {
        ...Fonts.blackColor14Medium,
        elevation: 1.3,
        borderRadius: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
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
        margin: Sizes.fixPadding * 2.0
    },
    textFieldStyle: {
        borderColor: Colors.grayColor,
        borderBottomWidth:1,
        ...Fonts.blackColor14Medium,
        elevation: 1.3,
        borderRadius: Sizes.fixPadding + 2.0,
        borderColor:Colors.primaryColor,
        paddingHorizontal: Sizes.fixPadding*2,
        marginVertical:Sizes.fixPadding*2,
        paddingVertical:Sizes.fixPadding,
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
    doneIconWrapStyle: {
        width: width / 3.5, height: width / 3.5,
        borderRadius: (width / 3.5) / 2.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -Sizes.fixPadding * 5.0,
        alignSelf: 'center',
        marginBottom: Sizes.fixPadding * 2.0
    },
    requestSubmittedTextStyle: {
        marginBottom: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.0,
        textAlign: 'center',
        ...Fonts.grayColor16SemiBold
    }
})
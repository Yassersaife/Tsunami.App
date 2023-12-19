import { SafeAreaView, Text, View, StatusBar, Image, Dimensions } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../constants/styles'

const { width ,height} = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.push('Onboarding')
    }, 2000);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FEFF' }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {appIcon()}
            </View>
        </SafeAreaView>
    )

   

    function appIcon() {
        return (
            <Image
                source={require('../assets/images/icon.png')}
                style={{ width: width *1.5, height: height*1.5 , resizeMode: 'contain' }}
            />
        )
    }
}

export default SplashScreen;

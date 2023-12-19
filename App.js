import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import { AuthProvider } from './constants/AuthContext';

import BottomTabs from './components/BottomTabs';
import LoadingScreen from './components/loadingScreen';
import SplashScreen from './screens/splashScreen';
import OnboardingScreen from './screens/onBoarding/onboardingScreen';
import ProductInfo from './screens/shop/ProductInfo';
import CartScreen from './screens/shop/CartScreen';
import SuccessPaymentScreen from './screens/shop/successPaymentScreen';
import SignupScreen from './screens/auth/signupScreen';
import SigninScreen from './screens/auth/signinScreen';
import ForgotPasswordScreen from './screens/auth/forgotPasswordScreen';
import OtpVerificationScreen from './screens/auth/otpVerification';
import NewPasswordScreen from './screens/auth/newPasswordScreen';
import HelpScreen from './screens/profile/helpScreen';
import EditProfileScreen from './screens/profile/editProfileScreen';
import HomeTraninerScreen from './screens/Adminpages/Home';
import ClientScreen from './screens/Adminpages/ClientScreen';
import AddProScreen from './screens/Adminpages/AddScreen';
import SelectPaymentMethodScreen from './screens/shop/selectPaymentMethodScreen';

import { I18nManager } from 'react-native';
import ModalScreen from './components/Modal';
import OrderScreen from './screens/order/OrderScreen';
import MYOrderScreen from './screens/order/MyOrder';
import OrderAdminScreen from './screens/Adminpages/OrderAdminScreen';
import OrdersUser from './screens/Adminpages/OrdersUser';

LogBox.ignoreAllLogs();
// Set text direction to RTL (right-to-left)
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const Stack = createStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator
        screenOptions={{
          headerShown: false,
           ...TransitionPresets.SlideFromLeft, // Apply the desired transition preset
        }}
      >

        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
         <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />  
        <Stack.Screen name="BottomTabs" component={BottomTabs}  />
        <Stack.Screen name="ProductInfo" component={ProductInfo}/>
        <Stack.Screen name="Cart" component={CartScreen}/>
        <Stack.Screen name="SuccessPayment" component={SuccessPaymentScreen}/>
        <Stack.Screen name="Modal" component={ModalScreen}/>
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="HomeAdmin" component={HomeTraninerScreen} />
        <Stack.Screen name="Addproduct" component={AddProScreen} />
        <Stack.Screen name="Clients" component={ClientScreen} />
        <Stack.Screen name="SelectPayment" component={SelectPaymentMethodScreen}/>
        <Stack.Screen name="Orders" component={OrderScreen}/>
        <Stack.Screen name="MyOrder" component={MYOrderScreen}/>
        <Stack.Screen name="OrdersAdmin" component={OrderAdminScreen}/>
        
        <Stack.Screen name="OrdersUser" component={OrdersUser}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App = () => {
  return (
    
    <AuthProvider>
    <Route />
    </AuthProvider>
  );
}
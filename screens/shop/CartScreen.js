import React, { useRef } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions
} from "react-native";
import  { useState,useContext,useEffect } from "react";
import { TextInput } from 'react-native-paper';

import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts, Sizes, Size } from "../../constants/styles";
import { PrimaryButton } from "../../components/Button";
import { Ionicons, MaterialIcons, Foundation } from "@expo/vector-icons";
import { AuthContext } from "../../constants/AuthContext";
import { auth, db } from '../../firebase/Firebase';
import { getDocs, doc, collection, updateDoc,deleteDoc  } from "firebase/firestore";

import ModalScreen from "../../components/Modal";
import CartCard from "../../components/Cart";

const { width, height } = Dimensions.get("window");

const CartScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [UserID,setuserID]  = useContext(AuthContext);
  const [qtythend, setqtythend] = useState(1);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  
  const triggerModal=()=>{
    setIsBottomSheetOpen(true);
}

// hide modal
const hideModal=()=>{
  setIsBottomSheetOpen(false);
}


  useEffect(()=>{
    fetchData();
},[])
useEffect(() => {
  const total = products.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.TotlaPrice), 0);
  setTotalValue(total);
},[products]);

const fetchData = async () => {
  try {
    const dataCollection = collection(db,'Cart ' + UserID);

    const querySnapshot = await getDocs(dataCollection);

    const dataArray = querySnapshot.docs.map((doc) => ({
      id: doc.id, 
      ...doc.data(),
    }));

    setProducts(dataArray);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  const Likeinfo=()=> {
    return (
       <View style={{alignSelf: 'center',gap:25,flexDirection:'column',marginVertical:120}}>
            <Image
                source={require('../../assets/images/victore/cart.png')}
                style={{ width: 300.0, height: 300.0 }}
            /> 
        <Text style={{ textAlign: 'center', ...Fonts.blackColor24SemiBold }}>
        المحفظة فارغة
        </Text>
        </View>
    )
  }
  return (
    <SafeAreaView style={{ backgroundColor: Colors.whiteColor, flex: 1 }}>
      <View style={style.header}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{
            alignItems:'center',
                  justifyContent:'center',
                  height:40,width:40,
                  backgroundColor: Colors.DARK_THREE,
                  borderRadius: Size * 1.5,
          }}
        >
          <Ionicons
            name="arrow-forward"
            color={Colors.primaryColor}
            size={Size * 2.5}
          />
        </TouchableOpacity>

        <Text
          style={{ ...Fonts.primaryColor24SemiBold, paddingHorizontal: 10 }}
        >
          المحفظة
        </Text>
      </View>
      {products.length>0 ? 
      <FlatList
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={products}
        renderItem={({ item }) =><CartCard  fetchData={fetchData}item={item} key={item.id} /> }
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        style={{ backgroundColor: Colors.whiteColor }}
      />
:<Likeinfo/>}
     {products.length>0&& <View
        style={{
          backgroundColor: Colors.whiteColor,
          flexDirection: "colum",
          marginVertical: 5,
          borderColor: Colors.primaryColor,
          borderTopWidth: 0.3,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            paddingVertical: 10,
            gap:5
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
            }}
          >
            <Text style={{ ...Fonts.blackColor20SemiBold }}>الفاتورة</Text>
          </View>
          
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
            }}
          >
            <Text style={{ ...Fonts.blackColor18SemiBold }}>مجموع السعر</Text>
            <Text style={{ ...Fonts.primaryColor18SemiBold }}>₪{totalValue}</Text>
          </View>
        </View>
        <View style={{ margin: 20, paddingBottom: 40 }}>
        <TouchableOpacity 
          style={{  display: 'flex',
          width: 340, 
          height: 49, 
          paddingVertical:14,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10, 
          flexShrink: 0,
          borderRadius: 16,
          backgroundColor: Colors.primaryColor,
          shadowColor: Colors.primaryColor,
          shadowOffset: { width: 1, height: 5 },
          shadowOpacity: 0.7,
          shadowRadius: 30,   
          marginVertical:25,          
          }}
          onPress={triggerModal}
          >
         <Text style={{...Fonts.blackColor18SemiBold,textAlign:'center'}}>تأكيد الطلب
</Text>
          </TouchableOpacity>
        </View>
      </View>}
    {isBottomSheetOpen==true &&( <ModalScreen navigation={navigation } hideModal={hideModal} TotalValue={totalValue} />)}
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartCard: {
    height: 130,
    elevation: 1,
    borderRadius: 20,
    borderWidth: 0.3,
    backgroundColor: Colors.SECONDARY_WHITE,
    marginVertical: 8,
    marginHorizontal: 20,
    borderColor: Colors.primaryColor,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 100,
    height:20,
    backgroundColor: Colors.primary2,
    borderRadius: 20,
    paddingHorizontal: 2,
    marginHorizontal:2,
    flex:1,
    flexDirection: "row",
    alignItems:'center',
    justifyContent: "space-between",
  },
  textFieldWrapStyle: {
    borderColor: Colors.DARK_FIVE,
    borderRadius: Sizes.fixPadding - 2.0,
    padding: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
}
});

export default CartScreen;

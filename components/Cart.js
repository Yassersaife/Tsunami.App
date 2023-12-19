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

import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors, Fonts, Sizes, Size } from "../constants/styles";
import { Ionicons, MaterialIcons, Foundation } from "@expo/vector-icons";
import { AuthContext } from "../constants/AuthContext";
import {  db } from '../firebase/Firebase';
import { getDocs, doc, collection, updateDoc,deleteDoc  } from "firebase/firestore";

const CartCard = ({ item,fetchData }) => {
  const [UserID,setuserID]  = useContext(AuthContext);
  
  let Product;
  const cartProductIncrease= async (cartProduct) => {
 
    try {
      Product=cartProduct;
      Product.qty=Product.qty+1;
      Product.TotlaPrice=Product.qty*Product.price;
  
       const dataCollection =  collection(db,'Cart ' + UserID);
       const documentRef = doc(dataCollection, cartProduct.id);
  
           
     await updateDoc(documentRef, Product);
     fetchData();
  
      
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };
  const cartProductDecrease= async (cartProduct) => {
   
    try {
      Product=cartProduct;
      Product.qty=Product.qty-1;
      Product.TotlaPrice=Product.qty*Product.price;
  
       const dataCollection =  collection(db,'Cart ' + UserID);
       const documentRef = doc(dataCollection, cartProduct.id);
  
           
     await updateDoc(documentRef, Product);
     fetchData();
  
      
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };
  const handleDelet= async (documentId) => {
    try {
      const itemRef = doc(db, 'Cart ' + UserID, documentId);
      await deleteDoc(itemRef);
     fetchData();
      
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };
  return (
    <View style={style.cartCard}>
      <Image source={{uri:item.image}} style={{ height: 100, width: 90 }} />
      <View
        style={{
          marginLeft: 0,
          padding: 10,
          flex: 1,
          alignItems: "flex-start",
          justifycontent: 'space-between',gap:20,
        }}
      >
        <Text style={{ ...Fonts.blackColor16SemiBold, }}>
          {item.name}
        </Text>

        <Text
          style={{ ...Fonts.primaryColor18SemiBold,color:Colors.primaryColor, }}
        >
          ₪{item.TotlaPrice}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <View style={{flex:1,flexDirection:'column', alignItems: "center",gap: 20, justifycontent: 'space-between'
                   , paddingHorizontal: 5,paddingVertical:15, }}>
          
          <View style={style.actionBtn}>
            <Icon
              name="add"
              size={25}
              color={Colors.DEFAULT_WHITE}
              style={{ paddingHorizontal: 2 }}
              onPress={() =>cartProductIncrease(item)}
            />
            <Text style={{ ...Fonts.blackColor20SemiBold,  }}>
            {item.qty}
          </Text>
            <Icon
              name="remove"
              size={25}
              color={Colors.DEFAULT_WHITE}
              style={{ paddingHorizontal: 2 }}
              onPress={()=>cartProductDecrease(item)}

            />
          </View>
          <TouchableOpacity
          onPress={()=>handleDelet(item.id)}
            style={{
              backgroundColor: Colors.SECONDARY_WHITE,
              padding: Size / 2,
              borderRadius: Size * 1.5,
              marginTop: 10,
            }}
          >
            <MaterialIcons name="delete-forever" size={25} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  
  export default CartCard;
  
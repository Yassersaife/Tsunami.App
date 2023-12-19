import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors,Size,Fonts } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";


const SearchField = () => {
  return (
    <View
      style={{
        borderRadius: 20,
        height:50,
        width:'90%',
          flexDirection:'row',
          justifyContent: 'flex-start', 
          borderColor:Colors.primary2,
          borderWidth:1,
          marginHorizontal:15
      }}
    >
     <Ionicons
          style={{
            display: 'flex',
    
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
          }}
          name="search"
          color='#A0ABC4'
          size={24}
        />
        <TextInput
          style={{
            textAlign:'center',
            overflow:'haiden',
            padding: 15,
            ...Fonts.blackColor16Regular
          }}
          placeholder="Search hire ..."
          placeholderTextColor={Colors.DARK_FIVE}
          
        />
        
      
    </View>
  );
};

export default SearchField;

const styles = StyleSheet.create({});

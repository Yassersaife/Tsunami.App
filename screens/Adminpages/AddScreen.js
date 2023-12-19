import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { auth, db, storages } from "../../firebase/Firebase";
import { setDoc, doc, collection, addDoc } from "firebase/firestore";
import { Stack, ActivityIndicator } from "@react-native-material/core";
import Categories from "../../components/Categories";

import { Overlay } from "react-native-elements";
const { width } = Dimensions.get("window");
import { RadioButton, TextInput, Button } from "react-native-paper";
import brandsdata from "../../data/brands";

const AddProScreen = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);

  const [state, setState] = useState({
    name: "",
    includes: "",
    image: null,
    price: 0,
    description: "",
    brandId: 1,
    date: "جديد",
    storage: 0,
    battery: 0,
  });

  const {
    name,
    includes,
    image,
    price,
    description,
    brandId,
    date,
    storage,
    battery,
  } = state;

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      updateState({ image: result.assets[0].uri });
    } else {
      updateState({ image: null });
    }
  };
  const uploudImage = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    try {
      const storageRef = ref(storages, `Images/image-${Date.now()}`);
      const result = await uploadBytes(storageRef, blob);
      blob.close();
      return await getDownloadURL(storageRef);
    } catch (error) {}
  };
  const handleAdd = async (e) => {
    setMessage("");

    if (
      name == "" ||
      includes == "" ||
      image == null ||
      description == "" ||
      date == ""
    ) {
      setMessage("املأ جميع الحقول");
      setShowAppointmentDialog(true);
    } else {
      try {
        setisLoading(true);
        console.log(image);

        const uploudURL = await uploudImage(image);
        updateState({ image: uploudURL });

        const dataCollection = collection(db, "Products");
        const newItemData = {
          name: name,
          includes: includes,
          image: uploudURL,
          price: price,
          description: description,
          brandId: brandId,
          battery: battery,

          date: date,

          storage: storage,
        };
        console.log(image);

        await addDoc(dataCollection, newItemData);
        // Log a success message
        setMessage("تم اضافة المنتج بنجاح");
        setisLoading(false);
        setShowAppointmentDialog(true);
      } catch (error) {
        setMessage("حدث خطأ بالاضافة");
        setisLoading(false);
        setShowAppointmentDialog(true);
      }

      //navigation.push('Home')
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 6.0 }}
        >
          {Imageadd()}
          {Name()}
          {Includes()}
          {Description()}
          {Dateinfo()}
          {Storage()}
          {Battery()}
          {Price()}
          {BrandId()}

          {addButton()}
        </ScrollView>
        {loadingDialog()}
        {appointmentDialog()}
      </View>
    </SafeAreaView>
  );
  function loadingDialog() {
    return (
      <Overlay
        isVisible={isLoading}
        overlayStyle={{
          width: "80%",
          backgroundColor: Colors.whiteColor,
          borderRadius: Sizes.fixPadding,
          paddingHorizontal: Sizes.fixPadding * 2.0,
          paddingBottom: Sizes.fixPadding * 3.5,
          paddingTop: Sizes.fixPadding * 3.0,
          elevation: 3.0,
        }}
      >
        <ActivityIndicator
          size={40}
          color={Colors.primaryColor}
          style={{ alignSelf: "center" }}
        />
        <Text
          style={{
            marginTop: Sizes.fixPadding,
            textAlign: "center",
            ...Fonts.blackColor16Bold,
          }}
        >
          انتظر قليلأ
        </Text>
      </Overlay>
    );
  }
  function appointmentDialog() {
    return (
      <Overlay
        isVisible={showAppointmentDialog}
        onBackdropPress={() => setShowAppointmentDialog(false)}
        overlayStyle={{
          zIndex: 1,
          width: width - 40.0,
          backgroundColor: Colors.LIGHT_GREY2,
          borderRadius: Sizes.fixPadding - 2.0,
          padding: 0.0,
          borderWidth: 3,
          borderColor: Colors.primary4,
          height: 100,
        }}
      >
        <View
          style={{
            marginVertical: Sizes.fixPadding * 2.5,
            marginHorizontal: Sizes.fixPadding * 2.0,
          }}
        >
          <Text
            style={{ textAlign: "center", ...Fonts.primaryColor24SemiBold }}
          >
            {message}
          </Text>
          <TouchableOpacity
            activeOpacity={0.99}
            onPress={() => {
              setShowAppointmentDialog(false);
            }}
            style={{ ...styles.buttonStyle, backgroundColor: Colors.primary4 }}
          >
            <Text style={{ ...Fonts.whiteColor18SemiBold }}>تم </Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    );
  }
  function addButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        onPress={handleAdd}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.blackColor16SemiBold }}>أضافة المنتوجات </Text>
      </TouchableOpacity>
    );
  }
  function Name() {
    return (
      <View style={styles.textFieldWrapStyle}>
        <TextInput
          value={name}
          onChangeText={(text) => updateState({ name: text })}
          label={"اسم المنتج"}
          mode="outlined"
          placeholder={"اسم المنتج"}
          style={{
            ...Fonts.blackColor16Regular,
            justifyContent: "center",
            height: 50,
            backgroundColor: "#F8F8F8",
            borderRadius: 40,
          }}
          selectionColor={Colors.primaryColor}
          placeholderTextColor={"#8D8D8D"}
          outlineColor={Colors.DARK_FIVE}
          activeOutlineColor={Colors.primary4}
        />
      </View>
    );
  }
  function Includes() {
    return (
      <View style={styles.textFieldWrapStyle}>
        <TextInput
          value={includes}
          onChangeText={(text) => updateState({ includes: text })}
          label={"خصم اضافي"}
          mode="outlined"
          placeholder={"خصم اضافي"}
          style={{
            ...Fonts.blackColor16Regular,
            justifyContent: "center",
            height: 50,
            backgroundColor: "#F8F8F8",
            borderRadius: 40,
          }}
          selectionColor={Colors.primaryColor}
          placeholderTextColor={"#8D8D8D"}
          outlineColor={Colors.DARK_FIVE}
          activeOutlineColor={Colors.primary4}
        />
      </View>
    );
  }
  function Description() {
    return (
      <View style={styles.textFieldWrapStyle}>
        <TextInput
          value={description}
          onChangeText={(text) => updateState({ description: text })}
          label={"وصف المنتج"}
          mode="outlined"
          placeholder={"وصف المنتج"}
          style={{
            ...Fonts.blackColor16Regular,
            justifyContent: "center",
            height: 50,
            backgroundColor: "#F8F8F8",
            borderRadius: 40,
          }}
          selectionColor={Colors.primaryColor}
          placeholderTextColor={"#8D8D8D"}
          outlineColor={Colors.DARK_FIVE}
          activeOutlineColor={Colors.primary4}
        />
      </View>
    );
  }
  function Storage() {
    return (
      <View style={styles.textFieldWrapStyle}>
        <TextInput
          value={storage}
          keyboardType="numeric"
          onChangeText={(text) => updateState({ storage: text })}
          label={"مساحة الذاكرة"}
          mode="outlined"
          placeholder={"مساحة الذاكرة"}
          style={{
            ...Fonts.blackColor16Regular,
            justifyContent: "center",
            height: 50,
            backgroundColor: "#F8F8F8",
            borderRadius: 40,
          }}
          selectionColor={Colors.primaryColor}
          placeholderTextColor={"#8D8D8D"}
          outlineColor={Colors.DARK_FIVE}
          activeOutlineColor={Colors.primary4}
        />
      </View>
    );
  }
  function Battery() {
    return (
      <View style={styles.textFieldWrapStyle}>
        <TextInput
          value={battery}
          onChangeText={(text) => updateState({ battery: text })}
          label={"البطارية"}
          mode="outlined"
          keyboardType="numeric"
          placeholder={"البطارية"}
          style={{
            ...Fonts.blackColor16Regular,
            justifyContent: "center",
            height: 50,
            backgroundColor: "#F8F8F8",
            borderRadius: 40,
          }}
          selectionColor={Colors.primaryColor}
          placeholderTextColor={"#8D8D8D"}
          outlineColor={Colors.DARK_FIVE}
          activeOutlineColor={Colors.primary4}
        />
      </View>
    );
  }
  function Price() {
    return (
      <View style={styles.textFieldWrapStyle}>
        <TextInput
          value={price}
          keyboardType="numeric"
          onChangeText={(text) => updateState({ price: text })}
          label={"سعر المنتج"}
          mode="outlined"
          placeholder={"سعر المنتج"}
          style={{
            ...Fonts.blackColor16Regular,
            justifyContent: "center",
            height: 50,
            backgroundColor: "#F8F8F8",
            borderRadius: 40,
          }}
          selectionColor={Colors.primaryColor}
          placeholderTextColor={"#8D8D8D"}
          outlineColor={Colors.DARK_FIVE}
          activeOutlineColor={Colors.primary4}
        />
      </View>
    );
  }
  function Imageadd() {
    return (
      <View style={styles.textFieldWrapStyle}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: width / 3.3,
              height: width / 3.3,
              alignSelf: "center",
              borderRadius: 20,
              marginBottom: Sizes.fixPadding * 2.5,
            }}
          />
        )}

        <Button
          icon="camera"
          contentStyle={{ height: 50, borderRadius: 20 }}
          textColor={Colors.whiteColor}
          buttonColor={Colors.primary4}
          mode="elevated "
          onPress={pickImage}
        >
          {"أضافة صورة للمنتج"}
        </Button>
      </View>
    );
  }
  function Dateinfo() {
    return (
      <View style={styles.textFieldWrapStyles}>
        <Text style={{ ...Fonts.primaryColor14Bold, textAlign: "center" }}>
          نوع الجهاز
        </Text>
        <RadioButton.Group
          label={"نوع الجهاز"}
          onValueChange={(text) => updateState({ date: text })}
          value={date}
        >
          <RadioButton.Item color={Colors.primary4} label="جديد" value="جديد" />
          <RadioButton.Item
            color={Colors.primary4}
            label="مستعمل"
            value="مستعمل"
          />
        </RadioButton.Group>
      </View>
    );
  }
  function BrandId() {
    return (
      <View style={styles.textFieldWrapStyles}>
        <Text style={{ ...Fonts.primaryColor14Bold, textAlign: "center" }}>
          {" "}
          اسم الشركة
        </Text>

        <RadioButton.Group
          onValueChange={(text) => updateState({ brandId: text })}
          value={brandId}
        >
          {brandsdata.map((item) => {
            if (item.id != 0)
              return (
                <RadioButton.Item
                  color={Colors.primary4}
                  label={item.brandCategory}
                  value={item.id}
                />
              );
          })}
        </RadioButton.Group>
      </View>
    );
  }
  function header() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MaterialIcons
          name={"arrow-forward"}
          size={30}
          color={Colors.primary4}
          style={{ margin: Sizes.fixPadding * 2.0, alignSelf: "flex-start" }}
          onPress={() => navigation.pop()}
        />
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding,
            ...Fonts.primaryColor24SemiBold,
          }}
        >
          اضافة منتوجات
        </Text>
      </View>
    );
  }
};

export default AddProScreen;

const styles = StyleSheet.create({
  addIconWrapStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    width: 22.0,
    height: 22.0,
    borderRadius: 11.0,
    borderColor: Colors.whiteColor,
    borderWidth: 1.5,
    position: "absolute",
    right: 10.0,
    bottom: 0.0,
  },
  textFieldWrapStyle: {
    borderColor: Colors.DARK_FIVE,
    borderRadius: Sizes.fixPadding - 2.0,
    padding: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  textFieldWrapStyles: {
    borderWidth: 1,
    borderColor: Colors.primary4,
    borderRadius: Sizes.fixPadding * 2.0,
    padding: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding * 2.0,

    backgroundColor: "#F8F8F8",
  },
  profilePicStyle: {
    width: width / 3.3,
    height: width / 3.3,
    alignSelf: "center",
    marginBottom: Sizes.fixPadding * 2.5,
  },
  textFieldStyle: {
    borderColor: Colors.grayColor,
    borderBottomWidth: 1.0,
    ...Fonts.blackColor14Medium,
    elevation: 1.3,
    borderRadius: Sizes.fixPadding - 2.0,
    borderColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    margin: Sizes.fixPadding * 2.0,
  },
  bottomSheetStyle: {
    width: "100%",
    position: "absolute",
    bottom: 0.0,
    borderTopLeftRadius: Sizes.fixPadding - 2.0,
    borderTopRightRadius: Sizes.fixPadding - 2.0,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
  },
});

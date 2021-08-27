import * as React from "react";
import { View } from "react-native";
import RegisterForm from  './RegisterForm';

export default function Register({ navigation }) {
  return (
    <View style={{padding:30}}>
        <RegisterForm navigation={navigation} />
    </View>
  );
}

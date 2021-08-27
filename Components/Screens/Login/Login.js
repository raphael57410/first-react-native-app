import React, { useState } from "react";
import { View, Text } from "react-native";
import LoginForm from "./LoginForm";
import Loader from '../Loader/Loader';

export default function Login( { navigation } ) {
  const [loader, setLoader] = useState(false);

  return (
    <>
    {loader ? <Loader /> : <View style={{padding:30}}>
        <Text style={{textAlign:"center",fontWeight:"bold", fontSize:40, marginBottom:30}}>
            Bonjour{"\n"}et Bienvenur sur{"\n"}
            <Text style={{color:"#486FE0"}}>New Perf</Text> 
        </Text>
        <LoginForm navigation={navigation} setLoader={setLoader} />
    </View>
  }
  </>
  );
}

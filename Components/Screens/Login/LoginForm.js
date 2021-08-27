import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Button } from "react-native";
import  loginRequest  from "../../Requests/loginRequest";

const LoginForm = ( { navigation,setLoader } ) => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const validateEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(regex.test(email)) return true;
    if(!regex.test(email)) return false;
  };

  const submitHandler = (email, password) => {
    if(validateEmail(email)) {
      loginRequest(email,password,navigation,setLoader);
    };
  }

  return (
    <SafeAreaView >
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Ex: john.doe@domaine.tld"
          keyboardType= "email-address"
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Votre mot de passe"
          secureTextEntry
        />
      </View>
      <View style={{marginHorizontal: 30, marginTop:10}}>
          <Button
          title="Connecter"
          onPress={ () => submitHandler(email,password)}
          />
      </View>
      <View style={{marginHorizontal: 30,marginTop:10}}>
          <Button
          title="S'inscrire"
          onPress={() => navigation.navigate('Formulaire d\'inscription')}
          />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:10,
  },
});

export default LoginForm;
import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, Button  } from "react-native";
import  addNewUser  from "../../Requests/addUserRequest";


export default function RegisterForm( { navigation } ) {
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
  
    const submitHandler = () => {
      addNewUser(email,password, navigation);
      onChangeEmail('');
      onChangePassword('');
    }
    return (
      <SafeAreaView>
          <Text style={{textAlign:"center", fontSize:30,marginBottom:10}}>Insciption</Text>
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
        <View style={{marginHorizontal: 30,marginTop:10}}>
          <Button
          title="S'inscrire"
          onPress={submitHandler}
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

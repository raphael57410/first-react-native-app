import React, { useState } from "react";
import { View, Text, ScrollView  } from "react-native";
import Login from  './Components/Screens/Login/Login';
import RegisterForm from './Components/Screens/RegisterForm/Register';
import Main from './Components/Screens/Main/Main';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Se Connecter">
        <Stack.Screen name="Se Connecter" component={Login} />
        <Stack.Screen
          name="Formulaire d'inscription"
          component={RegisterForm}
          options={{
            gestureDirection: 'vertical',
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
        <Stack.Screen name="Utilisiteur" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

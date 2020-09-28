import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import{ HomeScreen } from './Components/HomeScreen'
import {AuthScreen} from './Components/AuthScreen'

// firebase config
import {firebaseConfig} from './config/firebase'
// firebase library
import * as firebase from 'firebase'
//initialise app
if(!firebase.app.length){
  firebase.initializeApp(firebaseConfig)
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator()





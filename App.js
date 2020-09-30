import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import{ HomeScreen } from './Components/HomeScreen'
import {AuthScreen} from './Components/AuthScreen'
import {Detailed} from './Components/Detailed'
import { TouchableOpacity } from 'react-native-gesture-handler';

// firebase config
import {firebaseConfig} from './config/firebase'
// firebase library
import * as firebase from 'firebase'
//initialise app
//if(!firebase.app.length){
  if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  }
//}
const Data = [
  {"Name": "Bobby",
   "Birthdate": "11/22/33",
    "Breed": "French Bulldog",
    "VetDate": "11/22/33",
    "dogID" : "123123123"
  },
  {"Name": "aobby",
  "Birthdate": "21/22/33",
   "Breed": "French Bulldog",
   "VetDate": "11/22/33",
   "dogID" : "123123123"
 },
 {"Name": "cobby",
 "Birthdate": "31/22/33",
  "Breed": "French Bulldog",
  "VetDate": "11/22/33",
  "dogID" : "123123123"
},
{"Name": "dobby",
"Birthdate": "41/22/33",
 "Breed": "French Bulldog",
 "VetDate": "11/22/33",
 "dogID" : "123123123"
}
]
export default function App() {
  const listData = Data
   

  const register = (intent, email, password) => {

    if(intent =='register'){
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error))
           }
    else if(intent =='login'){
        firebase.auth().signInWithEmailAndPassword(email,password)
        .catch(error=>console.log(error))
    }
  }

  const [auth,setAuth] = useState(false)

  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      console.log('user logged in')
      setAuth(true)
    }
    else{
      console.log('user not logged in')
      setAuth(false)
    }
  })

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" >
          {(props) => <AuthScreen {...props} signup={register} loggedIn = {auth} />}
        </Stack.Screen>
        <Stack.Screen 
        name="Home"
        options={({navigation,route}) => ({
          headerTitle: "List",
          headerLeft: () => (
            <TouchableOpacity  onPress={ () => {
              firebase.auth().signOut().then( () => {
                setAuth(false)
                navigation.reset({ index: 0, routes: [{name: "Auth"}] })
              })
            }}>
              <Image style={{width:40,height:40}} source={require('../doggieList/assets/logoutButton.png')}/>
            </TouchableOpacity>
          )
        })}
        >
            {(props) => <HomeScreen {...props} data={listData} />}
        </Stack.Screen>
        <Stack.Screen name ="Detail" >
        {(props) => <Detailed {...props} data={listData} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator()





import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image,Alert } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import * as ImagePicker from 'expo-image-picker'
import{ HomeScreen } from './Components/HomeScreen'
import {AuthScreen} from './Components/AuthScreen'
import {Detailed} from './Components/Detailed'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {AddPet} from './Components/AddPet'

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
  // {"Name": "Bobby",
  //  "Birthdate": "11/22/33",
  //   "Breed": "French Bulldog",
  //   "VetDate": "11/22/33",
  //   "dogID" : "123123123"
  // }
  
]
export default function App() {
  

  

  const BiImagePicker = () => {
    const [selectImg,setSelectedImg] = useState(null)
    let openImage = async() =>{
        let permission = await ImagePicker.requestCameraRollPermissionsAsync();


        if(permission.granted === false){
            return;
        }

    let picker = await ImagePicker.launchImageLibraryAsync()
    if(picker.cancelled=== true){
        return
    }
    setSelectedImg({localUri:picker.uri})
    console.log(picker)
    }

    return(
        <View style={styles.containerImage}>
            <View style ={styles.imageContainer}>
                {
            selectImg !== null ?  (
                <Image 
                style={styles.image} 
                source={{uri:(selectImg.localUri !== null) ? selectImg.localUri : 'https://image.shutterstock.com/image-vector/dots-letter-c-logo-design-260nw-551769190.jpg'}} />
            ) : <Text>No Image</Text>
            }
            </View>
            <View>
                <TouchableOpacity style={styles.buttonImage} onPress={openImage}>
                    <Text>Select Image</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}




  let listData = []
   

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
  const [dataRef, setDataRef] = useState(null)
  const [updating,setUpdating] = useState(false)

  useEffect(()=>{
    readData()
  })

  const addData = (item) =>{
    if(!dataRef){
      return;
    }

    setUpdating(false)
    const dataObject = {
      Name : item.Name,
      Birthdate : item.Birthdate,
      Breed : item.Breed,
      VetDate : item.VetDate,
    }
    firebase.database().ref(`${dataRef}/dogdata/${item.id}`).set(dataObject), ()=>{
      setUpdating(true)
    }
  }

  const readData = () => {
    if(!dataRef){
      return
    }
    firebase.database().ref(`${dataRef}/dogdata`).once('value').then((snapshot)=>{
      let data = snapshot.val()
      if(data){
        let keys = Object.keys(data)
        listData = []
        keys.forEach((key)=>{
          let item = data[key]
          item.id = key
          listData.push(item)
        })
        setUpdating(true)
      }
    })
  }

  const db = firebase.database().ref(`${dataRef}/dogdata`)
  db.on('value', (snapshot) => {
    const dataObj = snapshot.val()
    if(dataObj) {
      let keys = Object.keys(dataObj)
      listData = []
      keys.forEach( (key) => {
        let item = dataObj[key]
        item.id = key
        listData.push(item)
      })
    }
  })

  const deleteData = (id) => {
    setUpdating(false)
    firebase.database().ref(`${dataRef}/dogdata/${id}`).remove()
    .then( () => {
      setUpdating(true)
    })
  }

  const updateData = (item) => {
    setUpdating(false)
    const data = {
      Name : item.Name,
      Birthdate : item.Birthdate,
      Breed : item.Breed,
      VetDate : item.VetDate,
    }
    firebase.database().ref(`${dataRef}/dogdata/${item.id}`).update( data )
    .then(() => {
      // data is updated
      setUpdating(true)
    })
  }
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      console.log('user logged in')
      setAuth(true)
      setDataRef(`users/${user.uid}`)
    }
    else{
      console.log('user not logged in')
      setAuth(false)
      setDataRef(null)
    }
  })

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" >
          {(props) => <AuthScreen {...props} signup={register} loggedIn = {auth} />}
        </Stack.Screen>
        <Stack.Screen name="AddPet">
           {(props) => <AddPet {...props} signup={register} addPetData = {addData} />}
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
            {(props) => <HomeScreen {...props} 
            
            data={listData}
            add = {addData}
            extra = {updating}
            imageFunc = {BiImagePicker}
            />}
        </Stack.Screen>
        <Stack.Screen name ="Detail" >
        {(props) => <Detailed {...props} data={listData} update={updateData} delete={deleteData} imageFunc = {BiImagePicker} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator()

const styles = StyleSheet.create({
  containerImage:{
    width:'100%',
    alignItems:'center'
  },
  imageContainer:{
      borderWidth:1,
      borderColor:'black',
      width:100,
      height:100
  },
  buttonImage:{
      margin:8
  },
  image:{
    width:100,
    height:100,
    resizeMode:'contain'
  }
  
})





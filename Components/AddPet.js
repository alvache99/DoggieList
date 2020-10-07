import { NavigationHelpersContext, useNavigation } from '@react-navigation/native'
import React, {useState,useEffect} from 'react'
import {StyleSheet,Text,View,TouchableOpacity, FlatList,Image} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import BiImagePicker from './BiImagePicker'
import * as ImagePicker from 'expo-image-picker'
import { back } from 'react-native/Libraries/Animated/src/Easing'
import { LinearGradient } from 'expo-linear-gradient';

export const AddPet = (props) => {

    const navigation = useNavigation()
    const [Home,setHome] = useState(true)
    const [name,setName] = useState(null)
    const [birthdate,setBirthdate] = useState(false)
    const [breed,setBreed] = useState(null)
    const [vetdate,setVetdate] = useState(null)
    const [validBirthyear,setValidBirthyear] = useState(null)



    const addItem = () => {
        const dogId = new Date().getTime()
        const dogName = name
        const dogBirthdate = birthdate
        const dogBreed = breed
        const dogVetDate = vetdate
        
        props.addPetData({
            id : dogId,
            Name : dogName,
            Birthdate: dogBirthdate,
            Breed: dogBreed,
            VetDate: dogVetDate,
            
        })
        navigation.navigate("Home");
    }
    const validateBirthyear = (birthyear) => {
        if( parseFloat(birthyear) && parseFloat(birthyear)>999 & parseFloat(birthyear)<10000 ) {
          setValidBirthyear(true)
          setBirthdate(birthyear)
        }
        else {
          setValidBirthyear(false)
        }
      }

    return(
        <View style = {styles.container}>
        <LinearGradient
         // Background Linear Gradient
         colors={['rgba(255,255,0,1)', 'transparent']}
         style={{
         position: 'absolute',
         left: 1,
         right: 0.5,
         top: 0,
         height: 1000,
         }}
     />
     <Text style={{alignSelf:'center', fontSize:30}}>Add your Dog</Text>
     <TextInput style={styles.textInputStyle} placeholder={"Name"} onChangeText = {(Name) => {setName(Name)}}/>
     <TextInput style={styles.textInputStyle} placeholder={"Birthyear"} onChangeText = {(Birthdate)=> {validateBirthyear(Birthdate)}}/>
     <TextInput style={styles.textInputStyle} placeholder={"Breed"} onChangeText = {(Breed)=> {setBreed(Breed)}}/>
     <TextInput style={styles.textInputStyle} placeholder={"Vet Date"} onChangeText = {(Vetdate)=> {setVetdate(Vetdate)}}/>
     <TouchableOpacity 
     style={!validBirthyear ? styles.confirmButtonDisabled: styles.confirmButton}
     disabled={!validBirthyear ? true : false}
     onPress={()=>{addItem()}}>
         <Text style={{fontSize:25,textAlign:'center',marginTop:4,color:'white'}}>Confirm++</Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.confirmButton} onPress={()=>{navigation.navigate("Home")}}>
         <Text style={{fontSize:25,textAlign:'center',marginTop:4,color:'white'}}>Back</Text>
     </TouchableOpacity>
        </View>
    )


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10,
    },
    header: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:100,
        height:100
    },
    headerText:{
        fontSize:30,
        alignSelf:'center',

    },
    headerButton:{
        backgroundColor:'#00ccff',
        height:50,
        width:50,
        flexDirection:'column',
        borderRadius:50,
        marginLeft:50
    },
    textInputStyle:{
        padding:5,
        fontSize:20,
        backgroundColor:'grey',
        marginTop:20,
        height:40,
        width:300,
        marginLeft:30,
        borderBottomWidth:2,
        borderRadius:10
    },
    confirmButton:{
        backgroundColor:'#00ccff',
        height:40,
        width:120,
        borderRadius:10,
        alignSelf:'center',
        marginTop:20
    },
    confirmButtonDisabled:{
        backgroundColor:'#777777',
        height:40,
        width:120,
        borderRadius:10,
        alignSelf:'center',
        marginTop:20
    },
    itemBox:{
        paddingHorizontal:20,
        paddingVertical:15,
       
        height:200,
        width:200,

    }
    ,
    itemText:{
        fontSize:15,
        alignSelf:'flex-start',
        marginTop:0,
        padding:10
      
    }, containerImage:{
        alignSelf:'flex-start',
        width:150,
        
        
      },
      imageContainer:{

          borderColor:'black',
          width:150,
          height:160,
      },
      buttonImage:{
          marginTop:5,
          borderRadius:10,
          backgroundColor:'#07E9C0',
          height:30,
          flex:1,
          justifyContent:'center'

      },
      image:{
        width:150,
        height:160,
      }
  
})
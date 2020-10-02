import React, {useState,useEffect} from 'react'
import {StyleSheet,Text,View,TouchableOpacity,TextInput, Button, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker'




export const Detailed = (props) => {
    const navigation = useNavigation()
    

    return(
        <View style ={styles.container}>
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
 
            <Text style={styles.textStyle}>Dog Name: {props.route.params.Name}</Text>
            <Text style={styles.textStyle}>Dog Breed: {props.route.params.Breed}</Text>
            <Text style={styles.textStyle}>Vet Date: {props.route.params.VetDate}</Text>
            <Text style={styles.textStyle}>Birthdate: {props.route.params.Birthdate}</Text>
            <Text style={styles.textStyle}>Dog's ID: {props.route.params.id}</Text>
            <TouchableOpacity style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Enable Feeding Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} 
          onPress={ () => { 
          props.delete(props.route.params.id) 
          navigation.goBack()
        }}>
                <Text style={styles.buttonText}>Delete Dog</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10,
        marginTop:50,
    },
    textStyle:{
        fontSize:25,
        padding:15
    },
    buttonStyle:{
        backgroundColor:'#07E9C0',
        height:45,
        width:325,
        borderRadius:10,
        alignSelf:'center',
        marginTop:15
    },
    buttonText:{
        fontSize:25,
        color:'white',
        textAlign:'center',
        marginTop:6
    },
      containerImage:{
        width:'100%',
        alignItems:'center'
      },
      imageContainer:{
          borderWidth:1,
          borderColor:'black',
          width:200,
          height:200
      },
      buttonImage:{
          margin:8
      },
      image:{
        width:200,
        height:200,
        resizeMode:'contain'
      }
    
    
})
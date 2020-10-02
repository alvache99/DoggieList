import React,{useState,useEffect} from 'react'
import {View,Text, Button, Image, StyleSheet, TouchableOpacity} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
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
        <View style={styles.container}>
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
                <TouchableOpacity style={styles.button} onPress={openImage}>
                    <Text>Select Image</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default BiImagePicker;
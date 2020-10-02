import { useNavigation } from '@react-navigation/native'
import React, {useState,useEffect} from 'react'
import {StyleSheet,Text,View,TouchableOpacity, FlatList,Image} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import BiImagePicker from './BiImagePicker'
import * as ImagePicker from 'expo-image-picker'
import { back } from 'react-native/Libraries/Animated/src/Easing'
import { LinearGradient } from 'expo-linear-gradient';

export const HomeScreen = (props) => {
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
        
        props.add({
            id : dogId,
            Name : dogName,
            Birthdate: dogBirthdate,
            Breed: dogBreed,
            VetDate: dogVetDate,
            
        })
        setHome(true)
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

    const renderList = ({item}) => (
        <ListItem  
        Name = {item.Name} 
        Birthdate = {item.Birthdate}
        clickHandler = {showDetail}
        item ={item}
        />
    )
    
    const showDetail = (item) => {
        navigation.navigate("Detail",item)
    }
    
    

    if(Home){
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
            <View style={styles.header}>
                <Text style={styles.headerText}>List of Dogs</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => {setHome(false),setBirthdate(false)}}>
                    <Text style={{fontSize:40,color:'white',marginBottom:10,marginLeft:12}}>+</Text>
                </TouchableOpacity>
            </View>
            <FlatList
            data = {props.data}
            renderItem = {renderList}
            keyExtractor = {item => item.id}
            />
        </View>
        )
    }else{
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
                <Text style={{fontSize:25,textAlign:'center',marginTop:4,color:'white'}}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={()=>{setHome(true)}}>
                <Text style={{fontSize:25,textAlign:'center',marginTop:4,color:'white'}}>Back</Text>
            </TouchableOpacity>
        </View>
        )
    }
}

const ListItem = (props) => {
    const [selectImg,setSelectedImg] = useState(null)
    var file
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

    file = picker
    console.log(file)
    console.log(picker)
    }


    return(
        <View style={{flexDirection:'row',marginTop:5}}>
        <View style={styles.containerImage}>
            <TouchableOpacity style ={styles.imageContainer} onPress ={()=>props.clickHandler(props.item)}>
                <View>
                    {
                selectImg !== null ?  (
                    <Image 
                    style={styles.image} 
                    source={{uri:(selectImg.localUri !== null) ? selectImg.localUri : 'https://image.shutterstock.com/image-vector/dots-letter-c-logo-design-260nw-551769190.jpg'}} />
                ) : <Text>No Image</Text>
                }
                </View>
            </TouchableOpacity>
            <View>
                <TouchableOpacity style={styles.buttonImage} onPress={openImage}>
                    <Text style={{textAlign:'center',color:'white'}}>Edit Image</Text>
                </TouchableOpacity>
            </View>
        </View>
       
        <View style={styles.itemBox}>
            <View>
                <Text style={styles.itemText}>Tap on the image to view details!</Text>
                <Text style={styles.itemText}>Name: {props.Name} </Text>
                <Text style={styles.itemText}>Age: {new Date().getFullYear()-parseFloat(props.Birthdate)}</Text>
            </View>
        </View>
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

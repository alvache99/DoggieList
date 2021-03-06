import React, {useState,useEffect} from 'react'
import {StyleSheet,Text,View,TouchableOpacity,TextInput, Button, Image, Alert} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';

export const AuthScreen = (props) => {
    const [login,setLogin] = useState(false)
    const navigation = useNavigation()
    const [validEmail,setValidEmail] = useState(false)
    const [validPassword,setValidPassword] = useState(false)
    const [validPasswordLogin,setValidPasswordLogin] = useState(false)
    
    const[email,setEmail] = useState(null)
    const[password,setPassword] = useState(null)
    const[passwordCfm,setPasswordCfm] = useState(null)

  

    useEffect(()=>{
        if(props.loggedIn){
            navigation.reset({
               index: 0,
                routes:[{name: "Home"}]
            })

       }

    })

    const validateEmail = (email) => {
        if(email.indexOf('@')>0 && email.indexOf('.')>0){
            setValidEmail(true)
            setEmail(email)
        }else{
            setValidEmail(false)
        }
    }
    const validatePasswords = (password , passwordCfm)=>{
        if(password == passwordCfm && password.length>=6){
            setValidPassword(true)
            setPassword(password)
        }else{
            setValidPassword(false)
        }
    }
    const validatePasswordsLogin = (password) => {
        if(password.length>=6){
            setValidPasswordLogin(true)
            setPassword(password)
        }else{
            setValidPasswordLogin(false)
        }
    }

    if(!login){
        return(
                   //Login View
                   <View style={styles.container} >
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
                   <View style={{flexDirection:'row', alignContent:'center', justifyContent:'center',height:100}}>
                       <Image style={{width:40,height:40,marginLeft:10,marginTop:40}} source={require('../assets/logo_button.png')}/>
                       <Text style={styles.title}>DoggieList</Text>
                   </View>
                   <View style={styles.mainCont}>
                       <TextInput 
                       style={styles.input} 
                       placeholder="youremail@email.com" 
                       onChangeText = {(email)=>validateEmail(email)}
                       />
                       <TextInput 
                       style={styles.input} 
                       placeholder="Your Password" 
                       secureTextEntry={true}
                       onChangeText ={(password) => validatePasswordsLogin(password)}
                       />
                   </View>
                   <View style={styles.buttonView}>
                       <TouchableOpacity 
                       style={!validEmail  ? styles.submitButtonDisabled : styles.submitButton}
                       onPress={()=>{props.signup('login',email,password)}}
                       >
                        <Text 
                        style={{fontSize: 30,textAlign:'center',color:'#eeeeee' }}
                        >Login</Text>
                       </TouchableOpacity>
                   </View>
                   <View style={styles.buttonView}>
                       <TouchableOpacity style={styles.submitButton} onPress={() => {setLogin(true), navigation.setOptions({title: 'Authentication'})}}>
                               <Text style={{fontSize: 30,textAlign:'center',color:'#eeeeee' }}>Signup</Text>
                       </TouchableOpacity>
                   </View>
               </View>
        )
    }
    else {
        return(
        //RegisterView
        <View style={styles.container}>
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
                <View style={{flexDirection:'row', alignContent:'center', justifyContent:'center'}}>
                    <Image style={{width:40,height:40,marginLeft:10,marginTop:40}} source={require('../assets/logo_button.png')}/>
                    <Text style={styles.title}>Signup</Text>
                </View>
                <View style={styles.mainCont}>
                    <TextInput 
                    style={styles.input} 
                    placeholder="youremail@email.com"
                    onChangeText = {(email)=>validateEmail(email)}
                    />
                    <TextInput 
                    style={styles.input} 
                    placeholder="Your Desired Password" 
                    secureTextEntry={true}
                    onChangeText={(password)=>setPassword(password)}
                    />
                    <TextInput 
                    style={styles.input} 
                    placeholder="Re-enter Password" 
                    secureTextEntry={true}
                    onChangeText={(passwordA)=>validatePasswords(passwordA,password)}
                    />
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity   
                       style={!validEmail || !validPassword  ? styles.submitButtonDisabled : styles.submitButton}
                       disabled={!validEmail || !validPassword ? true : false}
                       onPress={()=>{props.signup('register',email,password)}}>
                            <Text style={{fontSize: 30,textAlign:'center',color:'#eeeeee' }}>Confirm</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.submitButton} onPress={()=>setLogin(false)}>
                            <Text style={{fontSize: 30,textAlign:'center',color:'#eeeeee' }}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        
        )
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        paddingHorizontal:10,
    },
    title:{
        fontSize:35,
        textAlign:'center',
        marginTop:40,
        
    },
    input:{
        padding:5,
        borderBottomWidth: 2,
        borderColor: '#777777',
        fontSize:20,
        width:300,
        marginTop:15,
        marginLeft:25
    },
    mainCont:{
        flexDirection: 'column',
        justifyContent:'center',
        marginTop: 40
    },
    submitButton:{
        borderRadius:10,
        padding:10,
        width:150,
        backgroundColor:"#07E9C0"
    },
    submitButtonDisabled:{
        borderRadius:10,
        padding:10,
        width:150,
        backgroundColor:"#777777"
    }
    ,
    buttonView:{
        alignContent:'center',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:50,
    }
})
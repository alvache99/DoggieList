import { useNavigation } from '@react-navigation/native'
import React, {useState,useEffect} from 'react'
import {StyleSheet,Text,View,TouchableOpacity, FlatList} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'


export const HomeScreen = (props) => {
    const navigation = useNavigation()
    const [Home,setHome] = useState(true)
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
            <View style={styles.header}>
                <Text style={styles.headerText}>List of Dogs</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => {setHome(false)}}>
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
            <Text style={{alignSelf:'center', fontSize:30}}>Add your Dog</Text>
            <TextInput style={styles.textInputStyle} placeholder={"Name"}/>
            <TextInput style={styles.textInputStyle} placeholder={"Birthdate"}/>
            <TextInput style={styles.textInputStyle} placeholder={"Breed"}/>
            <TextInput style={styles.textInputStyle} placeholder={"Vet Date"}/>
            <TouchableOpacity style={styles.confirmButton} onPress={()=>{setHome(true)}}>
                <Text style={{fontSize:25,textAlign:'center',marginTop:4,color:'white'}}>Confirm</Text>
            </TouchableOpacity>
        </View>
        )
    }
}
const ListItem = (props) => {
    return(
        <TouchableOpacity onPress ={()=>props.clickHandler(props.item)}>
            <View style={styles.itemBox}>
                <Text style={styles.itemText}>Name: {props.Name} </Text>
                <Text style={styles.itemText}>Birthdate: {props.Birthdate}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10,
        marginTop:50,
    },
    header: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:100
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
    itemBox:{
        paddingHorizontal:20,
        paddingVertical:15,
        borderBottomWidth:1,
        height:100
    }
    ,
    itemText:{
        fontSize:15
      
    }
  
})

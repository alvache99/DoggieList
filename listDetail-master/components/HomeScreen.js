import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import { Select } from './Select'



export const HomeScreen = (props) => {
  const selectItems = [
    {label: "Food", value: "food"},
    {label: "Transport", value: "transport"},
    {label: "Groceries", value: "groceries"},
    {label: "Bills", value: "bills"},
  ]


  const [category,setCategory] = useState(null)
  const [amount,setAmount] = useState(0)
  const [note,setNote] = useState(null)

  const [validAmount,setValidAmount] = useState(false)

  const navigation = useNavigation()

  const validateAmount = (amount) => {
    if( parseFloat(amount) ) {
      setValidAmount(true)
      setAmount(amount)
    }
    else {
      setValidAmount(false)
    }
  }

  const addItem = () => {
    const itemId = new Date().getTime()
    const itemAmount = amount
    const itemCategory = category
    const itemNote = note
    props.add({
      id: itemId,
      amount: itemAmount,
      category: itemCategory,
      note: itemNote
    })
  }

  const renderList = ({item}) => (
    <ListItem 
    id={item.id} 
    amount={item.amount} 
    category={item.category} 
    clickHandler = {showDetail}
    item = {item}
    />
  )
  
  const showDetail = ( item ) => {
    navigation.navigate("Detail", item )
  }

  return (
    <View style={homeStyle.container}>
      <View>
        <TextInput 
          style={homeStyle.input} 
          placeholder="amount" 
          onChangeText={ (amount) => validateAmount(amount) }
          keyboardType='decimal-pad'
        />
        <Select items={selectItems} onSelect={setCategory} />
        <TextInput 
          style={homeStyle.input} 
          placeholder="notes" 
          onChangeText={ (note) => setNote(note)}
        />
        <TouchableOpacity 
          style={ validAmount && category ? homeStyle.button : homeStyle.buttonDisabled }
          disabled={ validAmount && category ? false : true }
          onPress={ () => { addItem() } }
        >
          <Text style={homeStyle.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data = {props.data}
        renderItem = {renderList} 
        keyExtractor = { item => item.id }
        extraData = {props.extra}
      />
    </View>
  )
}

const ListItem = (props) => {
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

  return (
    <TouchableOpacity onPress={ () => props.clickHandler(props.item) }>
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
      <View style={homeStyle.item}>
        <Text>{props.category}</Text>
        <Text>$ {props.amount}</Text>
      </View>
    </TouchableOpacity>
  )
}

const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    padding: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginVertical: 15,
  },
  button: {
    backgroundColor: '#33ffcc',
    padding: 10,
    borderRadius: 10,
  },
  buttonDisabled: {
    backgroundColor: '#c0f9eb',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#333333',
  },
})
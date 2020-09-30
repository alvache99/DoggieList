import React, {useState,useEffect} from 'react'
import {StyleSheet,Text,View,TouchableOpacity,TextInput, Button, Image} from 'react-native'


export const Detailed = (props) => {
    return(
        <View>
            <Text>Detailed Page</Text>
            <Text>Dog Name: {props.route.params.Name}</Text>
            <Text>Dog Breed: {props.route.params.Breed}</Text>
            <Text>Vet Date: {props.route.params.VetDate}</Text>
            <Text>Birthdate: {props.route.params.Birthdate}</Text>
            <Text>Dog's ID: {props.route.params.dogID}</Text>
            <TouchableOpacity>
                <Text>Enable Feeding Notification</Text>
            </TouchableOpacity>
        </View>
    )

}
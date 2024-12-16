import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, SafeAreaView, TextInput ,TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import FormComponent from '../components/Form';

export default function RegisterScreen(){
    return(
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <View style={{flex:1}}/>
            <Image 
                source={require('../assets/walled.png')} 
                style={{ width:233, height:57,alignSelf:'center' }}
            />
            <View style={{flex:1}}/>
            <FormComponent state='register' style={{width:'100%'}}/>
            <View style={{flex:1}}/>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea:{
        flex:1,
        width:'100%'
    }, 
    container: {
        flex: 1,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff"
      // #fafbfd
    }, 
    inputStyle:{
        height:60,
        borderRadius:10,
        backgroundColor: '#FAFBFD',
        width:'90%',
        paddingHorizontal:20
    }
})
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FormComponent({state}) {
    const navigation = useNavigation()
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatarURL, setAvatarURL] = useState('')

    const [isSelected, setSelection] = useState(false);
    const [errors, setErrors] = useState({});

    let newErrors = {};

    const validate = () => {
        // Todo: bikin validasi untuk name minimal 3 karakter, validasi format email
        // Validasi Email
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!validEmail) {
            newErrors.messageEmailError = 'Email Tidak Valid';
        }

        // Validasi Password
        const validPassword = password.length > 7;
        if (!validPassword) {
            newErrors.messagePasswordError = 'Password harus lebih dari 7 karakter';
        }

        // Validasi Nama (untuk state register)
        if (state === 'register') {
            const validName = name.length > 3;
            if (!validName) {
                newErrors.messageNameError = 'Nama harus lebih dari 3 karakter';
            }
        }

        setErrors(newErrors);
    }

    return(
        <SafeAreaView style={{ width:'100%', paddingHorizontal:20}}>
            {state === 'register' &&
                <TextInput
                    style={styles.input}
                    placeholder='Enter your name'
                    value={name}
                    onChangeText={(text) => {setName(text), validate()}}
                />
            }
            {errors.messageNameError && (
                    <Text style={styles.errorText}>{errors.messageNameError}</Text>
            )}

            <TextInput 
                onChangeText={(text) => {
                    setEmail(text),
                    validate()
                }}
                placeholder='Email'
                style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
            />
            {errors.messageEmailError && (
                <Text style={styles.errorText}>{errors.messageEmailError}</Text>
            )}

            <TextInput 
                onChangeText={(text) => {
                    setPassword(text), validate()
                }}
                placeholder='Password'
                secureTextEntry
                style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
            />
            {errors.messagePasswordError && (
                <Text style={styles.errorText}>{errors.messagePasswordError}</Text>
            )}

            {state === 'register' && 
                <TextInput
                    style={styles.input}
                    placeholder='Avatar URL'
                    // value={avatarURL}
                    onChangeText={setAvatarURL}
                    autoCorrect={false}
                    inputMode='numeric'
                    autoCapitalize='none'
                />
            }
            
            {state === 'register' &&
                <TouchableOpacity
                    style={[styles.checkboxContainer, {marginTop:30}]}
                    onPress={() => setSelection(!isSelected)}
                >
                    <View style={[styles.checkbox, isSelected && styles.checkedCheckbox]} />
                    <Text style={styles.label}>I agree to the 
                        <TouchableOpacity onPress={()=> console.log('term and con Pressed')} > 
                        <Text style={{ color:'teal' }}>
                            Terms and Conditions
                        </Text>
                        </TouchableOpacity>
                    </Text>
            </TouchableOpacity>
            }

            {/* <View style={{flex:1}}/>  Object.keys(newErrors).length === 0 && state==='login'? navigation.navigate("Home") : navigation.navigate("Login")*/}
            <TouchableOpacity onPress={()=> {
               if (Object.keys(newErrors).length === 0) { // Periksa jika tidak ada error
                    if (state === 'login') {
                        navigation.navigate("Home");
                    } else {
                        navigation.navigate("Login");
                    }
                }  
            }} style={{alignItems: 'center', backgroundColor:'teal', width: '100%', borderRadius:5, paddingVertical:15, marginBottom:10, ...(state === 'login' && { marginTop: 100 })}}> 
                <Text style={[styles.topupText, {color:'#fff'}]}>
                    {state === 'login'? "Login" : "Register"}
                </Text>
            </TouchableOpacity>
            <Text style={{ textAlign:'left', width:'90%' }}>
            {state === 'login'? "Don’t have account?" : "Have an account?"} 
                <TouchableOpacity onPress={()=> console.log('Register Pressed')} > 
                    <Text style={{ color:'teal' }}>
                        {state === 'login'? "Register Here" : "Login Here"} 
                    </Text>
                </TouchableOpacity>
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input:{
        height:60,
        borderRadius:10,
        backgroundColor: '#FAFBFD',
        width:'100%',
        paddingHorizontal:20,
        marginTop:15
    }, errorText:{
        fontSize: 12,
        color:'red'
    }, checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    }, checkbox: {
        height: 24,
        width: 24,
        borderWidth: 2,
        borderColor: 'gray',
        backgroundColor: '#FAFBFD',
        marginRight: 8,
        borderRadius:5
    }, checkedCheckbox: {
        backgroundColor: '#4CAF50',
    }
})
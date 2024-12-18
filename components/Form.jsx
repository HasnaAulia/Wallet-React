import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalComp from './Modal';
import { login, register } from '../api/restAPI';
import { useAuth } from '../context/AuthContext';

export default function FormComponent({state}) {
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatarURL, setAvatarURL] = useState('')

    const { login: setLoginState } = useAuth();
    const { regiter: setRegisterState } = useAuth();

    const [isSelected, setSelection] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmitLogin = () => {
        if (!email || !password) {
          alert('Validation Error', 'Email and Password are required');
          return;
        }
        handleLogin(email, password);
    };

    const handleSubmitRegister = () => {
        if (!name || !email || !password) {
          alert('Validation Error', 'Name, Email, and Password are required');
          return;
        }
        handleRegister(name, email, password);
    };
    
    const handleLogin = async (email, password) => {
 
        try {
            const response = await login(email, password); // Await the response
            const {token} = response.data

            if(!token) throw new Error('token not found in response')
            setLoginState(token); 
            console.log('Token:', token);
            
            alert('Success', 'Login successful');
            navigation.navigate("Home")

            return token
        } catch (error) {
            console.log('Login Error:', error.message);
            alert('Error', error.message);
        }
    };
    

    const handleRegister = async (name, email, password) => {
        try {
          const token  = await register(name, email, password);
        //   setRegisterState(token);
          alert('Success', 'Register successful');
          navigation.navigate("Login");
        } catch (error) {
          alert('Error', error.message);
        }
    };

    return(
        <SafeAreaView style={{ width:'100%', paddingHorizontal:20}}>
            <ModalComp modalVisible={ modalVisible } setModalVisible={setModalVisible}>
            </ModalComp>
            {state === 'register' &&
                <TextInput
                    style={styles.input}
                    placeholder='Enter your name'
                    value={name}
                    onChangeText={(text) => {setName(text)}}
                />
            }
            {/* {errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
            )} */}

            <TextInput 
                onChangeText={(text) => {
                    setEmail(text)
                }}
                placeholder='Email'
                style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
            />
            {/* {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
            )} */}

            <TextInput 
                onChangeText={(text) => {
                    setPassword(text)
                }}
                placeholder='Password'
                secureTextEntry
                style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
            />
            {/* {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
            )} */}

            {state === 'register' && 
                <TextInput
                    style={styles.input}
                    placeholder='Avatar URL'
                    value={avatarURL}
                    onChangeText={(text) => {setAvatarURL(text)}}
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
                        <TouchableOpacity onPress={()=> setModalVisible(true)} > 
                        <Text style={{ color:'teal' }}>
                            Terms and Conditions
                        </Text>
                        </TouchableOpacity>
                    </Text>
            </TouchableOpacity>
            }

            {/* <View style={{flex:1}}/>  Object.keys(newErrors).length === 0 && state==='login'? navigation.navigate("Home") : navigation.navigate("Login")*/}
            
            <TouchableOpacity 
                onPress={() => (state === 'login' ? handleSubmitLogin() : handleSubmitRegister())}
                style={{alignItems: 'center', backgroundColor:'teal', width: '100%', borderRadius:5, paddingVertical:15, marginBottom:10, ...(state === 'login' && { marginTop: 100 })}}> 
                <Text style={[styles.topupText, {color:'#fff'}]}>
                    {state === 'login'? "Login" : "Register"}
                </Text>
            </TouchableOpacity>
            <Text style={{ textAlign:'left', width:'90%' }}>
            {state === 'login'? "Don’t have account?" : "Have an account?"} 
                <TouchableOpacity onPress={()=> navigation.navigate(state==='login'?'Register':'Login')} > 
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
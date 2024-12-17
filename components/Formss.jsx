import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, SafeAreaView, FlatListm, SafeAreaProvider, TextInput} from 'react-native';
import React, {useState} from 'react';
import { login } from '../api/restAPI';
import { register } from '../api/restAPI';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function Form({state}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState('')
    // const [errorsEmail, setErrorsEmail] = useState('')
    // const [errorsPassword, setErrorsPassword] = useState('')
    const { login: setLoginState } = useAuth();
    const { register: setRegisterState } = useAuth();
    const navigation = useNavigation();


    // const validate = () => {
    //     const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    //     const validPassword = password.length > 7 ? true : false;
    //     if (!validPassword) {
    //         setErrors({
    //             messagePasswordError: 'Password kurang dari 7'
    //         })
    //     return false;
    //     } 

    //     if (!validEmail) {
    //         setErrors({
    //             messageEmailError: 'Email tidak sesuai'
    //         })
    //     return false;
    //     }

    //     console.log('errorrrrrrrr')
    // }

    // const validateEmail = () => {
    //     const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    //     if (!validEmail) {
    //         setErrorsEmail('Email tidak sesuai')
    //     } else {
    //         setErrorsEmail('')
    //     }
    //     console.log(errorsEmail)
    // }

    // const validatePassword = () => {
    //     const validPassword = password.length > 7 ? true : false;
    //     if (!validPassword) {
    //         setErrorsPassword('Password kurang dari 8')
    //     } else {
    //         setErrorsPassword('')
    //     }
    //     console.log(errorsPassword)
    // }
    
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
        const { token } = await login(email, password);
        setLoginState(token);
        navigation.navigate('Home');
        alert('Success', 'Login successful');
      } catch (error) {
        alert('Error', error.message);
      }
    };

    const handleRegister = async (name, email, password) => {
      try {
        const { token } = await register(name, email, password);
        setRegisterState(token);
        navigation.navigate('Login');
        alert('Success', 'Register successful');
      } catch (error) {
        alert('Error', error.message);
      }
    };


    return(
        <SafeAreaView>
            {state === 'register' &&
            <TextInput
                style={styles.input}
                placeholder='Fullname'
                value={name}
                onChangeText={(text) => setName(text)}/>
            }
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={(text) => setEmail(text)}
                // onChange={validateEmail}
                autoCorrect={false}
                autoCapitalize='none'/>
            {/* {errorsEmail &&
                <Text style={{marginHorizontal: 15, color: 'red'}}>{errorsEmail}</Text>
            } */}
            <TextInput
                style={styles.input}
                placeholder='Password'
                value={password}
                onChangeText={(text) => setPassword(text)}
                // onChange={validatePassword}
                autoCorrect={false}
                autoCapitalize='none'
                secureTextEntry/>
            {/* {errorsPassword &&
                <Text style={{marginHorizontal: 15, color: 'red'}}>{errorsPassword}</Text>
            } */}
            {state === 'register' &&
            <TextInput
                style={styles.input}
                placeholder='Avatar URL'
                value={avatar}
                onChangeText={(text) => setAvatar(text)}/>
            }

            {state === 'register' ?
               <View style={[styles.button, styles.primary]}>
                  <Button title='Register' color='white'  onPress={handleSubmitRegister}/>
              </View> 
              :
              <View style={[styles.button, styles.primary]}>
                <Button title='Login' color='white' onPress={handleSubmitLogin}/>
              </View>
            }

        </SafeAreaView>
    )

}

// const Form = ({
//     onChangeText,
//     value,
//     placeholder,
//     autoCorrect,
//     secureTextEntry
// }) => {
//     return (
//     <View>
//         <TextInput 
//             style={styles.input}
//             onChangeText={onChangeText}
//             value={value} 
//             placeholder={placeholder}
//             autoCorrect={autoCorrect}
//             placeholderTextColor={'black'}
//             secureTextEntry={secureTextEntry}
//         />
//     </View>
//     )
// }

const styles = StyleSheet.create({
    input: {
        height: 50,
        padding: 20,
        margin: 15,
        borderRadius: 10,
        backgroundColor: 'whitesmoke',
    },
    button: { 
      textAlign: 'center', 
      fontSize: 20, 
      paddingVertical: 5, 
      borderRadius: 10, 
      marginHorizontal: 15, 
    },
    primary: {
      backgroundColor: '#19918F', 
      marginVertical: 15
    },
})
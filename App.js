import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button } from "react-native";
import React, {useState} from "react";
import HomeScreen from './screens/HomePage'
import LoginScreen from './screens/LoginPage'
import TopUpScreen from './screens/TopUp'
import TransferScreen from './screens/Transfer'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator()

export default function App(){
    return(
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="TopUp" component={TopUpScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Transfer" component={TransferScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
        </NavigationContainer>
    )
}
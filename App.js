import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button } from "react-native";
import React, {useState} from "react";
import HomeScreen from './screens/HomePage'
import LoginScreen from './screens/LoginPage'
import RegisterScreen from './screens/RegisterPage'
import TopUpScreen from './screens/TopUp'
import TransferScreen from './screens/Transfer'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            }else if (route.name === "TopUp"){
                iconName = focused ? "cash" : "cash-outline";
            }else if (route.name === "Transfer"){
                iconName = focused ? "paper-plane" : "paper-plane-outline";
            } 
            return <Ionicons name={iconName} size={size} color={'teal'} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="TopUp" component={TopUpScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="Transfer" component={TransferScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>
    );
  }
``  
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen 
        name="Home"
        component={TabNavigator}
        options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default function App(){
//     return(
//         <NavigationContainer>
//         <Stack.Navigator initialRouteName="Home">
//             <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
//             <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
//             <Stack.Screen name="TopUp" component={TopUpScreen} options={{ headerShown: false }}/>
//             <Stack.Screen name="Transfer" component={TransferScreen} options={{ headerShown: false }}/>
//             <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
//         </Stack.Navigator>
//         </NavigationContainer>
//     )
// }
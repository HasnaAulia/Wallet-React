import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { postsTransaction } from '../api/restAPI';

export default function TransferScreen() {
    const navigation = useNavigation()

    const [amount, setAmount] = useState('');
    const [notes, setNotes] = useState('');
    const [recipient, setRecipient] = useState('');
    const [type, setType] = useState('d')
    const {refresh, setRefresh} = useAuth()

    const handleTransfer = async () => {
            console.log('Transfer initiated.');
            setRefresh(false)
            if (!amount || parseInt(amount) <= 0) {
              alert('Please enter a valid amount.');
              return;
            }
        
            const payload = {
              type: type, // Always "d" for debit in a top-up
              from_to: recipient, // Payment method (e.g., BYOND Pay, OVO, etc.)
              amount: parseInt(amount),
              description: notes || 'No description', // Default if no notes
            };
    
            console.log('payload', payload)
        
            try {
              const response = await postsTransaction(payload)
              console.log('Transfer successful:', response);
              alert('Transfer successful!');
              navigation.goBack(); // Navigate back after success
              setRefresh(true)
            } catch (error) {
                if (error.response) {
                    console.error("API Error Data:", error.response.data);
                    console.error("API Status Code:", error.response.status);
                    alert("Transfer failed: " + error.response.data.message);
                } else {
                    console.error("Unexpected Error:", error.message);
                    alert("Transfer failed: " + error.message);
                }
            } finally{
                setRefresh(true)
            }
          };

    return(
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={()=> navigation.goBack()} style={{alignItems: 'center'}}> 
                    <Image source={require('../assets/back.svg')} style={{width:10, height:16}}></Image>
                </TouchableOpacity>
                <Text style={[ styles.transferText, {color: 'black', marginLeft: 30}]}>Transfer</Text>
            </View>
            <View style={{width:'100%', backgroundColor:'teal', flexDirection:'row', padding:10, alignItems:'center'}}>
                <Text style={[styles.labels, {color:'#fff', marginRight:10}]}>To:</Text>
                <TextInput
                    style={[styles.labels, {color:'#fff', backgroundColor:'transparent', margin:0}]}
                    placeholder='Enter recipient account number'
                    keyboardType='numeric'
                    onChangeText={(text) => setRecipient(text)}
                    value={recipient}/>
            </View>
            <View style={styles.box}>
                <Text style={[styles.labels, {color:'#b3b3b3', marginBottom: 15}]}>Amount</Text>
                <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                    <Text style={[styles.labels, {color:'black'}]}>IDR</Text>
                    <TextInput 
                        style={{fontSize: 36, fontWeight:400, width:'100%'}}
                        placeholder='100.000'   
                        keyboardType='numeric'
                        onChangeText={(text) => setAmount(text)}
                        value={amount}
                    />
                </View>
                <View style={styles.line}></View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={[styles.subLabel,{color:'#b3b3b3'}]}>Balance</Text>
                    <Text style={[styles.subLabel,{color:'teal'}]}>IDR 10.000.000</Text>
                </View>
            </View>
            <View style={[styles.box, {height:100}]}>
                <Text style={[styles.labels, {color:'#b3b3b3', marginBottom:10}]}>Notes</Text>
                <TextInput 
                    style={{ borderColor:'transparent', fontSize:16, fontWeight:400}}
                    multiline
                    numberOfLines={4}
                    onChangeText={(text) => setNotes(text)}
                    value={notes}
                />
                <View style={styles.line}></View>
            </View>
            <View style={{flex:1}}></View>
            <TouchableOpacity onPress={handleTransfer} style={{alignItems: 'center', backgroundColor:'teal', width: '90%', borderRadius:5, paddingVertical:15, marginBottom:20}}> 
                <Text style={[styles.transferText, {color:'#fff'}]}>Transfer</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#FAFBFD",
      // #fafbfd
    }, box:{
        backgroundColor: '#fff',
        padding: 20,
        width: '100%',
        marginVertical: 10
    }, line:{
        height: 1, 
        backgroundColor: '#ccc', 
        width: '100%'
    }, labels:{
        fontSize: 16,
        fontWeight: 400
    }, navBar:{
        flexDirection: 'row',
        paddingHorizontal: 20, 
        display: 'flex', 
        alignItems: 'center', 
        height: 80, 
        width: '100%', 
        borderBottomWidth:1, 
        backgroundColor: '#fff', 
        borderBottomColor: '#ccc', 
        justifyContent:'flex-start'
    }, transferText:{
        fontWeight: 700, 
        fontSize:16,
    }, subLabel:{
        fontSize:12,
        fontWeight:400
    }
  });
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, SafeAreaView, TextInput ,TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { postsTransaction } from '../api/restAPI';
import { useAuth } from '../context/AuthContext';

export default function TopUpScreen() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('BYOND Pay'); // Default option
    const [amount, setAmount] = useState('');
    const [notes, setNotes] = useState('');
    const options = ['BYOND Pay', 'OVO', 'Gopay', 'DANA'];
    const navigation = useNavigation()
    const {refresh, setRefresh} = useAuth()
    const [type, setType] = useState('c')


    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    
    const selectOption = (option) => {
        setSelectedOption(option);
        setDropdownVisible(false);
    };

    const handleTopUp = async () => {
        console.log('Top-up initiated.');
        setRefresh(false)
        if (!amount || parseInt(amount) <= 0) {
          alert('Please enter a valid amount.');
          return;
        }
    
        const payload = {
          type: type, // Always "d" for debit in a top-up
          from_to: selectedOption, // Payment method (e.g., BYOND Pay, OVO, etc.)
          amount: parseInt(amount),
          description: notes || 'No description', // Default if no notes
        };

        console.log('payload', payload)
    
        try {
          const response = await postsTransaction(payload)
          console.log('Top-up successful:', response);
          alert('Top-up successful!');
          navigation.goBack(); // Navigate back after success
        } catch (error) {
            if (error.response) {
                console.error("API Error Data:", error.response.data);
                console.error("API Status Code:", error.response.status);
                alert("Top-up failed: " + error.response.data.message);
            } else {
                console.error("Unexpected Error:", error.message);
                alert("Top-up failed: " + error.message);
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
                <Text style={[ styles.topupText, {color: 'black', marginLeft: 30}]}>TopUp</Text>
            </View>
            <View style={styles.box}>
                <Text style={[styles.labels, {color:'#b3b3b3', marginBottom: 15}]}>Amount</Text>
                <View style={{flexDirection:'row', alignItems:'flex-start'}}
                >
                    <Text style={[styles.labels, {color:'black', borderColor:'transparent'}]}>IDR</Text>
                    <TextInput 
                        style={{fontSize: 36, fontWeight:400, width:'100%'}}
                        keyboardType='numeric'
                        placeholder='100.000'
                        onChangeText={(text) => setAmount(text)}
                        value={amount}
                    />
                </View>
                <View style={styles.line}></View>
            </View>
            <View style={styles.box}>
                <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownHeader}>
                    <Text style={styles.labels}>{selectedOption}</Text>
                    <Image source={require('../assets/dropdown.svg')} style={{ width: 16, height: 10, transform: [{ rotate: dropdownVisible ? '180deg' : '0deg' }] }} />
                </TouchableOpacity>
                {dropdownVisible && (
                    <View style={styles.dropdownList}>
                    {options.map((option, index) => (
                        <TouchableOpacity key={index} onPress={() => selectOption(option)} style={styles.dropdownItem}>
                        <Text style={styles.dropdownText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                    </View>
                )}
                </View>
            <View style={[styles.box, {height:100}]}>
                <Text style={[styles.labels, {color:'#b3b3b3', marginBottom:10}]}>Notes</Text>
                <TextInput 
                    style={{ borderColor:'transparent', fontSize:16, fontWeight:400}}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => setNotes(text)}
                    value={notes}></TextInput>
                <View style={styles.line}></View>
            </View>
            <View style={{flex:1}}></View>
            <TouchableOpacity onPress={handleTopUp} style={{alignItems: 'center', backgroundColor:'teal', width: '90%', borderRadius:5, paddingVertical:15, marginBottom:20}}> 
                <Text style={[styles.topupText, {color:'#fff'}]}>Top Up</Text>
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
        elevation: 3, 
        paddingHorizontal: 20, 
        display: 'flex', 
        alignItems: 'center', 
        height: 80, 
        width: '100%', 
        borderBottomWidth:1, 
        backgroundColor: '#fff', 
        borderBottomColor: '#ccc', 
        justifyContent:'flex-start'
    }, topupText:{
        fontWeight: 700, 
        fontSize:16,
    }, dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
      dropdownList: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 2,
    },
      dropdownItem: {
        padding: 10,
    },
      dropdownText: {
        fontSize: 14,
        color: '#333',
    },
  });
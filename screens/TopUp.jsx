import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, SafeAreaView, TextInput ,TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function TopUpScreen() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('BYOND Pay'); // Default option
    const options = ['BYOND Pay', 'OVO', 'Gopay', 'DANA'];
    const navigation = useNavigation()


    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    
    const selectOption = (option) => {
        setSelectedOption(option);
        setDropdownVisible(false);
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
                    numberOfLines={4}></TextInput>
                <View style={styles.line}></View>
            </View>
            <View style={{flex:1}}></View>
            <TouchableOpacity onPress={()=> console.log('Button Back Pressed')} style={{alignItems: 'center', backgroundColor:'teal', width: '90%', borderRadius:5, paddingVertical:15, marginBottom:20}}> 
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
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TransferScreen() {
    const navigation = useNavigation()
    return(
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={()=> navigation.goBack()} style={{alignItems: 'center'}}> 
                    <Image source={require('../assets/back.svg')} style={{width:10, height:16}}></Image>
                </TouchableOpacity>
                <Text style={[ styles.transferText, {color: 'black', marginLeft: 30}]}>Transfer</Text>
            </View>
            <View style={{width:'100%', backgroundColor:'teal', flexDirection:'row', padding:20}}>
                <Text style={[styles.labels, {color:'#fff', marginRight:10}]}>To:</Text>
                <Text style={[styles.labels, {color:'#fff'}]}>9000008940208</Text>
            </View>
            <View style={styles.box}>
                <Text style={[styles.labels, {color:'#b3b3b3', marginBottom: 15}]}>Amount</Text>
                <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                    <Text style={[styles.labels, {color:'black'}]}>IDR</Text>
                    <TextInput 
                        style={{fontSize: 36, fontWeight:400, width:'100%'}}
                        placeholder='100.000'   
                        keyboardType='numeric'                             
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
                />
                <View style={styles.line}></View>
            </View>
            <View style={{flex:1}}></View>
            <TouchableOpacity onPress={()=> console.log('Button Back Pressed')} style={{alignItems: 'center', backgroundColor:'teal', width: '90%', borderRadius:5, paddingVertical:15, marginBottom:20}}> 
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
import React from 'react';
import { Modal, StyleSheet, Text, Button, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function  ModalComp({modalVisible, setModalVisible}) {
  
  return (
    <Modal 
        onRequestClose={() => setModalVisible(false)} //perintah menutup modal
        visible={modalVisible} // mengatur modal muncul
        presentationStyle='pageSheet' // untuk mengatur tampilan modal (untuk ios aza)
        animationType="slide" // untuk mengatur animasi modal
        transparent={true} // untuk mengatur transparansi modal
        >
    <View style={styles.navBar}>
        <TouchableOpacity onPress={() => setModalVisible(false)} style={{alignItems: 'center'}}> 
          <Image source={require('../assets/back.svg')} style={{width:10, height:16}}></Image>
        </TouchableOpacity>
        <Text style={{color: 'black', marginLeft: 30, fontWeight: 700, 
        fontSize:16,}}>Terms and Conditions</Text>
      </View>
    <ScrollView>
    <View style={styles.modalView}>
          <Text style={styles.modalText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
          {/* <Button title="Close Modal" onPress={() => setModalVisible(false)} /> */}
        </View>
    </ScrollView>    
    </Modal> 
  )
}

const styles = StyleSheet.create({
  centeredView: {
    
  },
  modalView: {
    margin: 0,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left'
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
}
})
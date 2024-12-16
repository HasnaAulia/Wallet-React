import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, TextInput, SafeAreaView, TouchableOpacity, Modal } from 'react-native';

export default function Modal({modalVisible}){
    const [modalVisible, setModalVisible] = useState(false)
    return(
        <SafeAreaView>
            <Modal
                onRequestClose={() => setModalVisible(false)}
                visible={modalVisible}
                animationType='slide'
                transparent={true}
            >
                <View>
                    <Text></Text>
                    <Button></Button>
                </View>
            </Modal>
        </SafeAreaView>
    )
}
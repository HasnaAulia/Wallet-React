import { StyleSheet, Text, View } from "react-native";


export default function box({children, style}) {
    return(
        <View style={[styles.box, style]}>
            <Text style={styles.text}>{children}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    box:{
        backgroundColor: 'blue',
        padding: 30
    }, text:{
        fontSize: 24,
        color: 'white',
        textAlign:'center'
    }
})
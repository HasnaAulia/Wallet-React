import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Image, ImageBackground, ScrollView, Touchable, TouchableOpacity } from 'react-native';
const logo = require("./assets/favicon.png")
import Box from './components/box';

export default function App() {
  return (
    <ScrollView style={styles.ScrollView}>
      {/* <View style={{width: 200, height:200,backgroundColor:"lightblue"}}></View>
      <View style={{width:200, height:200, backgroundColor:"lightgreen"}}></View> */}
      <Image source={{uri:"https://i.pinimg.com/originals/b5/df/6e/b5df6e88db58a19e85ebec90898425cf.jpg"}} style={styles.image}/>
      <Button title='Press to donate' onPress={()=> console.log('Button Pressed')}s color="red" />
      <TouchableOpacity onPress={()=> console.log('Button Pressed')} style={{alignItems: 'center'}}> 
        {/* biar buttonnya ga kapital */}
        <Text style={{textAlign: 'center'}}>Click me!</Text>
      </TouchableOpacity>
      <View style={[styles.box, styles.green]}>
        <Text>Green Box</Text>
      </View>
      <View style={[styles.box, styles.blue]}>
        <Text>Blue Box</Text>
      </View>
      <View style={styles.container}>
        <Box style={{backgroundColor: 'teal'}}>Box1</Box>
        <Box style={{backgroundColor: 'orange'}}>Box2</Box>
        <Box style={{backgroundColor: 'pink'}}>Box3</Box>
      </View>
      <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nunc ligula, lobortis in fermentum in, vehicula sed massa. Aliquam arcu quam, lacinia ut semper ut, vehicula non orci. Phasellus non leo tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla id nisl eleifend quam auctor eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pharetra, odio vitae posuere blandit, leo urna accumsan sem, ac tincidunt ante sapien sed turpis. Maecenas non ultrices est. Ut massa odio, viverra sit amet placerat eu, vestibulum at risus. Aliquam vulputate ac elit ut mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper sem vitae ex viverra, eget consequat nisi fringilla.

      Quisque vehicula rhoncus mollis. Nunc consectetur maximus orci nec egestas. Integer sed diam vel lectus tempor finibus quis id elit. Donec quis sodales orci. Nam eu maximus felis, iaculis iaculis nisi. Aenean vitae nulla tempus, ornare nisl vitae, imperdiet ligula. Fusce gravida nisl quis urna pulvinar, quis molestie velit aliquam. Aenean dapibus elit a diam mollis venenatis. Nullam vestibulum vehicula velit vel imperdiet. Donec mollis, urna dignissim pellentesque volutpat, nunc nisl tempor mi, ac porta odio leo vitae ex. Cras id elementum risus, vel tempor velit. Etiam lacinia a quam sed vehicula. Suspendisse lectus magna, fringilla sed nisi at, molestie congue dolor. Mauris sollicitudin nisi sit amet ex ullamcorper pharetra.
      </Text>
      {/* <ImageBackground source={"https://i.pinimg.com/originals/b5/df/6e/b5df6e88db58a19e85ebec90898425cf.jpg"} style={{flex:1}}>
        <Text style={{margin: 20, color: "black"}}>Ini text </Text>
      </ImageBackground> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ScrollView: {
    flex: 1,
    backgroundColor: 'plum',
    padding: 40,
  }, image:{
    height:300, 
    width:300, 
    alignItems:'center'
  }, text:{
    color:"yellow", 
    marginTop:100, 
    marginLeft:20,
    fontSize: 20,
  }, box:{
    width: 300,
    height:100,
    paddingHorizontal:20,
    paddingVertical: 20,
    margin: 10
  }, blue:{
    backgroundColor: "lightblue",
  }, green:{
    backgroundColor: "lightgreen"
  }
});

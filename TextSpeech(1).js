import * as React from 'react';
import { View, StyleSheet, Button, TextInput, Image, Text, TouchableOpacity, BackHandler} from 'react-native';
import * as Speech from 'expo-speech';
import {useEffect } from 'react';

export default function App({navigation}) {
  const [textToSay, setTextToSay] = React.useState(''); // Estado para almacenar el texto del TextInput

  const speak = () => {
    // Utiliza el texto ingresado en el TextInput
    Speech.speak(textToSay);
  };

  const clearText = () => {
    // Limpia el contenido del TextInput
    setTextToSay('');
  };
  useEffect(() => {
    const backAction = () => {
        navigation.goBack();
        return true;
    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    return () => backHandler.remove();
}, []);

  return (
    <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
  <Image source={require('./assets/background2.png')} style={[styles.image, StyleSheet.absoluteFill]} />
  <Image source={require('./assets/tell2.png')} style={[styles.appPicture, {top:-50}]} />
          <Text style={{ fontSize: 48, fontWeight: '800', color: '#551854', top:-50}}>Tell</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe algo..."
        value={textToSay}
        onChangeText={text => setTextToSay(text)} // Actualiza el estado con el texto ingresado
        multiline={true} // Hace que el TextInput sea multilinea
        textAlignVertical="top"
      />
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={speak}>
          <View style={{marginHorizontal:5, flexDirection: 'row',justifyContent: 'center', alignItems: 'center',backgroundColor:'#410D3F', padding:0, width:170, borderRadius:50,}}>
              <Image source={require('./assets/play.png')} style={[styles.appPicture,{top:-13,left:-10,height:30,width:30}]} />
              <Text style={{ fontSize: 20, fontWeight: '800', color: 'white',  textAlign:'center',top:0}}>Reproducir</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearText}>
          <View style={{marginHorizontal:5, flexDirection: 'row',justifyContent: 'center', alignItems: 'center',backgroundColor:'#410D3F', padding:0, width:170, borderRadius:50,}}>
              <Image source={require('./assets/trash.png')} style={[styles.appPicture,{top:-13,left:-10, height:30,width:30}]} />
              <Text style={{ fontSize: 20, fontWeight: '800', color: 'white',  textAlign:'center',top:0}}>Limpiar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  
  },
  input: {
      width: 300,
      height: 300,
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      backgroundColor: 'lightgrey',
      marginBottom: 50
    },
    appPicture: {
      width: 50,
      height: 50,
      marginTop: 30,
    
    },
});


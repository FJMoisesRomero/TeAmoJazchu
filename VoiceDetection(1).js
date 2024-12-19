import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, BackHandler} from 'react-native';
import { openBrowserAsync } from 'expo-web-browser';
import FloatingButton from './button';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileButton from './ProfileButton';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="VoiceDetection" component={VoiceDetection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default function VoiceDetection() {
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
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
    <Image source={require('./assets/background2.png')} style={[styles.image, StyleSheet.absoluteFill]} />

    <Image source={require('./assets/microphone2.png')} style={[styles.appPicture, {top:-50}]} />
          <Text style={{ textAlign: 'center',fontSize: 28, fontWeight: '800', color: '#551854', top:-50}}>Herramientas de Voz</Text>

      <TouchableOpacity onPress={() => openBrowserAsync("https://fjmoisesromero.github.io/Tell/index.html")} >
        <View style={{marginVertical:25, flexDirection: 'row',justifyContent: 'center', alignItems: 'center',backgroundColor:'#2E032A', padding:0, width:300, borderRadius:50,}}>
            <Image source={require('./assets/speak.png')} style={[styles.appPicture,{top:-13,left:-10}]} />
            <Text style={{ fontSize: 14, fontWeight: '800', color: 'white',  textAlign:'center',top:0}}>Convertir Voz a Texto</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TextSpeech')}>
        <View style={{marginVertical:25, flexDirection: 'row',justifyContent: 'center', alignItems: 'center',backgroundColor:'#2E032A', padding:0, width:300, borderRadius:50,}}>
            <Image source={require('./assets/write.png')} style={[styles.appPicture,{top:-13,left:-10}]} />
            <Text style={{ fontSize: 14, fontWeight: '800', color: 'white',  textAlign:'center',top:0}}>Convertir Texto a Voz</Text>
        </View>
      </TouchableOpacity>

      <FloatingButton />
      <ProfileButton/>
    </View>
  );
  }

const styles = StyleSheet.create({
  infoText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  infoImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
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
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'lightgrey',
      },
      appPicture: {
        width: 50,
        height: 50,
        marginTop: 30,
      
      },
});


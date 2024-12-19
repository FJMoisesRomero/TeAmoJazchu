import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, BackHandler} from 'react-native';
import { openBrowserAsync } from 'expo-web-browser';
import FloatingButton from './button';
import ProfileButton from './ProfileButton'; 
export default function PoseDetection({navigation}) {
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
    <View style={styles.container}>
    <Image source={require('./assets/background2.png')} style={[styles.image, StyleSheet.absoluteFill]} />
    <ScrollView style={{ flex: 1}}>
      <View style={{alignItems:'center',justifyContent:'center', top:40}}>
          <Image source={require('./assets/sign-language.png')} style={[styles.appPicture, {top:0}]} />
          <Text style={{marginBottom:-20, textAlign: 'center',fontSize: 28, fontWeight: '800', color: '#551854', top:0}}>Lenguaje de Señas</Text>
      </View>
    <TouchableOpacity onPress={() => openBrowserAsync("https://fjmoisesromero.github.io/Tell/FaceDetection.html")} style={{alignItems:'center', marginVertical:60, marginTop:100}}>
          <View style={{ flexDirection: 'row',justifyContent: 'center', alignItems: 'center',backgroundColor:'#2E032A', padding:0, width:300, borderRadius:50,}}>
              <Image source={require('./assets/gesture.png')} style={[styles.appPicture,{top:-13,left:-10}]} />
              <Text style={{ fontSize: 14, fontWeight: '800', color: 'white',  textAlign:'center',top:0}}>Acceder a Deteccion de Gestos</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ width: 350,fontSize: 28, fontWeight: '800', color: '#551854'}}>Palabras Comunes</Text>
      <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageScrollView}
        >
          <Image source={require('./assets/sign_language/0.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/1.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/2.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/3.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/4.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/5.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/6.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/7.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/8.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/9.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/10.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/11.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/12.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/14.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/15.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/16.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/17.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/18.png')} style={styles.scrollImage} />
          <Image source={require('./assets/sign_language/19.png')} style={styles.scrollImage} />
          {/* Agrega más imágenes según sea necesario */}
        </ScrollView>
        <Text style={{ width: 350,fontSize: 28, fontWeight: '800', color: '#551854'}}>Vocales</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageScrollView}
        >
          <Image source={require('./assets/sign_language/A.png')} style={styles.scrollImage2} />
          <Image source={require('./assets/sign_language/E.png')} style={styles.scrollImage2} />
          <Image source={require('./assets/sign_language/I.png')} style={styles.scrollImage2} />
          <Image source={require('./assets/sign_language/O.png')} style={styles.scrollImage2} />
          <Image source={require('./assets/sign_language/U.png')} style={styles.scrollImage2} />
          </ScrollView>
          <Text style={{ width: 350,fontSize: 28, fontWeight: '800', color: '#551854'}}>Videos Utiles</Text>
          <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageScrollView}
          >
            <TouchableOpacity onPress={() => openBrowserAsync("https://www.youtube.com/watch?v=cYsixd_AYGc")} style={{alignItems:'center', marginVertical:60}}>
              <View style={{justifyContent: 'center', alignItems: 'center', padding:0, width:300, borderRadius:50,}}>
              <Image source={require('./assets/video1.jpg')} style={styles.scrollImage3} />
                  <Text style={{ fontSize: 14, fontWeight: '800', color: 'white',  textAlign:'center',top:-15}}>Curso LENGUA de SEÑAS</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openBrowserAsync("https://www.youtube.com/watch?v=q-juc7-tByU")} style={{alignItems:'center', marginVertical:60}}>
              <View style={{justifyContent: 'center', alignItems: 'center', padding:0, width:300, borderRadius:50,}}>
              <Image source={require('./assets/video2.jpg')} style={styles.scrollImage3} />
                  <Text style={{ fontSize: 14, fontWeight: '800', color: 'white',  textAlign:'center',top:-15}}>¿La lengua de señas es universal?</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>

      </ScrollView>
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
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2E032A',
        padding: 10,
        width: 300,
        borderRadius: 50,
      },
      buttonText: {
        fontSize: 14,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center',
        top: 0,
      },
      imageScrollView: {
        flexDirection: 'row',
        alignItems: 'center',
        height:250,
        marginVertical:30,
        backgroundColor: 'rgba(103, 35, 105, 0.2)',
      },
      scrollImage: {
        width: 150,
        height: 220,
        borderRadius: 10,
        marginRight: 10,
        marginTop:20,
        marginBottom:20,

      },
      scrollImage2: {
        width: 120,
        height: 220,
        borderRadius: 10,
        marginRight: 10,
        marginTop:30,
        marginBottom:30,

      },
      scrollImage3: {
        width: 280,
        height: 180,
        borderRadius: 10,
        marginRight: 10,
        marginTop:30,
        marginBottom:30,

      },
});


import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated, Text, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { openBrowserAsync } from 'expo-web-browser';
import HomeScreen from "./App";
import SpeechText from "./#SpeechText";
import PoseDetection from "./PoseDetection";
import VoiceDetection from "./VoiceDetection";
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Speech" component={SpeechText} />
        <Stack.Screen name="PoseDetection" component={PoseDetection} />
        <Stack.Screen name="VoiceDetection" component={VoiceDetection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function FloatingButton() {
  const [icon_1] = useState(new Animated.Value(20));
  const [icon_2] = useState(new Animated.Value(20));
  const [icon_3] = useState(new Animated.Value(20));
  const [pop, setPop] = useState(false);
  const [selectedImageSource, setSelectedImageSource] = useState(null);

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 100,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 80,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 100,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 20,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 20,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 20,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const navigation = useNavigation();

  const handleImageClick1 = (imageSource) => {

    popOut(); // Cerrar el menú al seleccionar una imagen
    navigation.navigate('Home'); // Navegar a HomeScreen
  };
  
  const handleImageClick2 = (imageSource) => {

    popOut(); // Cerrar el menú al seleccionar una imagen
    navigation.navigate('VoiceDetection'); // Navegar a SpeechTextScreen
  };
  
  const handleImageClick3 = (imageSource) => {

    popOut(); // Cerrar el menú al seleccionar una imagen
    navigation.navigate('PoseDetection'); // Navegar a PoseDetectionScreen
  };

  return (
    <View style={{ position: 'absolute',
    bottom: 0,
    left: 0,}}>
      <Animated.View style={[styles.circle, { bottom: icon_1 }]}>
        <TouchableOpacity onPress={() => handleImageClick1(require('./assets/board2.png'))}>
          <Image source={require('./assets/board2.png')} style={{ top:1,right:1,width: 40, height: 40 }} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, { bottom: icon_2, left: icon_2 }]}>
        <TouchableOpacity onPress={() => handleImageClick2(require('./assets/hand.png'))} >
          <Image source={require('./assets/microphone.png')} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, { left: icon_3 }]}>
        <TouchableOpacity onPress={() => handleImageClick3(require('./assets/hand.png'))}>
          <Image source={require('./assets/hand.png')} style={{right:2, width: 40, height: 40 }} />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}
      >
        <Image source={selectedImageSource || require('./assets/home.png')} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: '#410D3F',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    left: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { App };

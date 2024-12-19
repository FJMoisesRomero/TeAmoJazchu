import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function JoinRoomScreen() {
  const [roomName, setRoomName] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const avatarIndex1 = Math.floor(Math.random() * 9);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (data.trim() !== '') {
      navigation.navigate('Chat', { roomName: data, avatarIndex: avatarIndex1 });
    }
  };
  const handleJoinRoom = () => {
    if (roomName.trim() === '') {
      Alert.alert('Por favor, ingrese una sala válida');
    } else {
      navigation.navigate('Chat', { roomName, avatarIndex: avatarIndex1 });
    }
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
    <View style={styles.container}>
    <Image source={require('./assets/background2.png')} style={[styles.image, StyleSheet.absoluteFill]} />
    <View style={{top:300}}>
      <TextInput
        style={styles.input}
        placeholder='Ingrese el nombre de la Sala'
        value={roomName}
        onChangeText={text => setRoomName(text)}
        editable={!scanned}
      />
      <TouchableOpacity onPress={handleJoinRoom}>
        <View style={styles.button}>
          <Image source={require('./assets/tell.png')} style={[styles.appPicture, { top: -13, left: -10 }]} />
          <Text style={styles.buttonText}>Acceder a la Sala</Text>
        </View>
      </TouchableOpacity>
      <View style={[styles.button,{marginTop:40, left:50,width:200, alignItems:'center', justifyContent:'center'}]}>
        <Image source={require('./assets/camera.png')} style={[styles.appPicture, { top: -13, left: -10,width:30, height:30 }]} />
        <Text style={styles.buttonText}>Escanear QR</Text>
      </View>
    </View>

      <View style={styles.cameraContainer}>
        {hasPermission === null ? (
          <Text>Esperando permiso para acceder a la cámara...</Text>
        ) : hasPermission === false ? (
          <Text>No tienes permiso para acceder a la cámara.</Text>
        ) : (
          <View style={styles.cameraView}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.camera}
            />
            {scanned && <Text style={styles.scannedText}>Accediendo a: {roomName} </Text>}
          </View>
        )}
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
  cameraContainer: {
    
    bottom: -400,
    marginTop:-100,

    alignItems: 'center',
  },
  cameraView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  camera: {
    width: 300,
    height: 300, // Haz que la cámara sea cuadrada

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
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#410D3F',
    padding: 0,
    width: 300,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    top: 0,
  },
  scannedText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color: '#410D3F'
  },
});

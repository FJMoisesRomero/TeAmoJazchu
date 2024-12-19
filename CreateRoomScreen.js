import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, BackHandler} from 'react-native';
import { useRoute} from '@react-navigation/native';
const CreateRoomScreen = ({ navigation, route }) => {
  const { rooms, setRooms } = route.params; // Recibe el vector de salas y su función para actualizarlo
  const [newRoomName, setNewRoomName] = useState('');

  const handleCreateRoom = () => {
    if (newRoomName) {
      setRooms((prevRooms) => [...prevRooms, newRoomName]);
      navigation.goBack(); // Regresa a la pantalla anterior (RoomSelectionScreen)
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
      <TextInput style={styles.input}
        value={newRoomName}
        onChangeText={(text) => setNewRoomName(text)}
        placeholder='Ingrese el nombre de la Sala'
      />
      <TouchableOpacity onPress={handleCreateRoom}>
        <View style={{ flexDirection: 'row',justifyContent: 'center', alignItems: 'center',backgroundColor:'#410D3F', padding:0, width:300, borderRadius:50,}}>
            <Image source={require('./assets/tell.png')} style={[styles.appPicture,{top:-13,left:-10}]} />
            <Text style={{ fontSize: 20, fontWeight: '800', color: 'white',  textAlign:'center',top:0}}>Crear Sala</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

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

export default CreateRoomScreen;

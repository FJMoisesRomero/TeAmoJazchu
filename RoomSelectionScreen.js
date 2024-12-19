import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, BackHandler } from 'react-native';
import { useRoute } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

const RoomSelectionScreen = ({ navigation }) => {
    const route = useRoute();
    const { avatarIndex } = route.params;
    const [selectedRoom, setSelectedRoom] = useState(null); // Almacena la sala seleccionada
    const [showQRCode, setShowQRCode] = useState(false); // Estado para mostrar el código QR en una burbuja flotante

    const [rooms, setRooms] = useState(['chats', 'Sala 1', 'Sala 2', 'Sala 3']); // Lista de salas disponibles

    const handleRoomQR = (room) => {
        setSelectedRoom(room); // Almacena la sala seleccionada
        setShowQRCode(true); // Muestra el código QR al seleccionar una sala
    };
    const handleRoomSelection = (room) => {
      navigation.navigate('Chat', { roomName: room, avatarIndex });
  };


    const handleCreateRoom = () => {
        navigation.navigate('CreateRoom', { rooms, setRooms });
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
            <Text style={styles.title}>Selecciona una sala:</Text>
             <Image source={require('./assets/background2.png')} style={[styles.image, StyleSheet.absoluteFill]} />
             <Image source={require('./assets/room2.png')} style={[styles.appPicture, {marginTop:-20, top:-50}]} />
          <Text style={{marginBottom:-20, textAlign: 'center',fontSize: 28, fontWeight: '800', color: '#551854', top:-50}}>Seleccionar Sala</Text>
            <FlatList
                numColumns={1}
                data={rooms}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => handleRoomSelection(item)} style={{ marginVertical: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2E032A', padding: 0, width: 300, borderRadius: 50 }}>
                            <Image source={require('./assets/tell.png')} style={[styles.appPicture, { top: -13, left: -10 }]} />
                            <Text style={{ fontSize: 20, fontWeight: '800', color: 'white', textAlign: 'center', top: 0 }}>{item}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleRoomQR(item)} style={{ marginVertical: 10 }}>
                      <View style={{ top: 15 }}><QRCode value={item} size={50} /></View>
                    </TouchableOpacity>
                  </View>
                )}
            />
            {showQRCode && (
                <View style={styles.qrCodeBubble}>
                    <QRCode value={selectedRoom} size={350} />
                    <TouchableOpacity onPress={() => setShowQRCode(false)}>
                        <Text style={styles.closeQRCodeButton}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={handleCreateRoom}>
                    <View style={{ borderRightWidth: 1, borderRightColor: 'white', justifyContent: 'center', alignItems: 'center', backgroundColor: '#410D3F', padding: 0, width: 200 }}>
                        <Image source={require('./assets/tell.png')} style={[styles.appPicture, { top: -20 }]} />
                        <Text style={{ fontSize: 20, fontWeight: '800', color: 'white', textAlign: 'center', top: -10 }}>Crear una Sala</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('JoinRoomScreen')} >
                    <View style={{ borderLeftWidth: 1, borderLeftColor: 'white', justifyContent: 'center', alignItems: 'center', backgroundColor: '#410D3F', padding: 0, width: 200 }}>
                        <Image source={require('./assets/tell.png')} style={[styles.appPicture, { top: -20 }]} />
                        <Text style={{ fontSize: 20, fontWeight: '800', color: 'white', textAlign: 'center', top: -10 }}>Sala Personalizada</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 100,
        color: '#fff',
    },
    roomItem: {
        fontSize: 18,
        marginVertical: 10,
    },
    appPicture: {
        width: 50,
        height: 50,
        marginTop: 30,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    qrCodeBubble: {
        position: 'absolute',
        top: 120, // Ajusta la posición según tus necesidades
        backgroundColor: '#672369',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',


    },
    closeQRCodeButton: {
        marginTop: 10,
        color: 'white',
        textDecorationLine: 'underline',
        fontSize:24
    },
});

export default RoomSelectionScreen;

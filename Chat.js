import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';
import { TouchableOpacity, Text, ImageBackground, View,StyleSheet, ScrollView, TextInput, Image, SafeAreaView, BackHandler } from 'react-native'; // Importa ImageBackground
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from './firebase-config';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from './colors';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import Voice from '@react-native-voice/voice';
import FloatingButton from './button';
import { Permissions } from "expo-permissions";

// Lista de imágenes aleatorias
const imagenesAleatorias = [
  'edward-elric.jpg',
  'roy-mustang.jpg',
  'alphonse-elric.jpg',
  'tony-tony-chopper.jpg',
  'shoto-todoroki.jpg',
  'saitama.jpg',
  'guts.jpg',
  'inuyasha.jpg',
  'boa-hancock.jpg'
];


export default function Chat() {
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
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('Esperando');
  const [audioPermission, setAudioPermission] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { avatarIndex, roomName } = route.params;
  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={onSignOut}>
          <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database,  roomName);
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      console.log('querySnapshot unsubscribe');
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      );
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    async function getPermission() {
      const { status, expires, permissions } = await Permissions.askAsync(
        Permissions.AUDIO_RECORDING
      );
      if (status !== "granted") {
        console.log("Audio recording permission not granted.");
        setAudioPermission(false);
      } else {
        console.log("Audio recording permission granted.");
        setAudioPermission(true);
      }
    }

  
    getPermission();

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      if (recording) {
        stopRecording();
      }
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  const onSend = useCallback(messages => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, roomName), {
      _id,
      createdAt,
      text,
      user
    });
  }, []);

  const onSpeechStart = (event) => {
    console.log('Comenzó la grabación...', event);
  };

  const onSpeechEnd = () => {
    setIsListening(false);
  };

  const onSpeechResults = (event) => {
    console.log('Resultados de la grabación:', event);
    const text = event.value[0];
    setRecognizedText(text);
  };

  const onSpeechError = (error) => {
    console.error('Error en la grabación:', error);
  };

  const startListening = async () => {
    setIsListening(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log('Error al iniciar la grabación', error);
    }
  };

  const stopListening = async () => {
    setIsListening(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.log('Error al detener la grabación', error);
    }
  };

  const sendMessage = () => {
    if (recognizedText) {
      setMessages([...messages, { text: recognizedText, sender: 'user' }]);
      setRecognizedText('');
    }
  };
  async function startRecording() {
    try {
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      }

      const newRecording = new Audio.Recording();
      console.log('Iniciando grabación');
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus('Grabando');
    } catch (error) {
      console.error('Error al iniciar la grabación', error);
    }
  }

  async function stopRecording() {
    try {
      if (recordingStatus === 'Grabando') {
        console.log('Deteniendo grabación');
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();

        const fileName = `recording-${Date.now()}.caf`;

        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings/', { intermediates: true });
        await FileSystem.moveAsync({
          from: recordingUri,
          to: FileSystem.documentDirectory + 'recordings/' + `${fileName}`
        });

        const playbackObject = new Audio.Sound();
        await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings/' + `${fileName}` });
        await playbackObject.playAsync();

        setRecording(null);
        setRecordingStatus('Detenido');
      }
    } catch (error) {
      console.error('Error al detener la grabación', error);
    }
  }

  async function handleRecordButtonPress() {
    if (recording) {
      await stopRecording(recording);
    } else {
      await startRecording();
    }
  }

  // Definir el estilo de la imagen de fondo
  const backgroundImageStyle = {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  };

  return (
    <ImageBackground // Utiliza ImageBackground para agregar la imagen de fondo
      source={require('./assets/background2.png')} // Ruta de la imagen de fondo
      style={backgroundImageStyle}
    >

      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        showUserAvatar={true}
        onSend={messages => onSend(messages)}
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#672369',
              },
              left: {
                backgroundColor: '#672369',
              }
            }}
            textStyle={{
              right: {
                color: 'white',  // Cambia el color del texto en el lado derecho
              },
              left: {
                color: 'white',  // Cambia el color del texto en el lado izquierdo
              },
            }}
          />
        )}
        messagesContainerStyle={{
          backgroundColor: 'transparent', // Establece el fondo transparente
        }}
        placeholder="Escribe un mensaje..." // Cambia el texto del input aquí
        textInputStyle={{
          backgroundColor: '#fff',
          borderRadius: 20,
        }}
        user={{
          _id: auth?.currentUser?.email,
          avatar: 'https://cdn-0.generatormix.com/images/anime-character/' + imagenesAleatorias[avatarIndex]
        }}
        
      />

       <View style={styles.recordingButtonContainer}>

        <TouchableOpacity style={styles.recordingButton} onPress={handleRecordButtonPress}>
          {recording ? (
            <FontAwesome name="stop-circle" size={25} color="white" />
          ) : (
            <FontAwesome name="microphone" size={25} color="white" />
          )}
          </TouchableOpacity>
        </View> 
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#FFF5E0',
    alignItems: 'center',
    justifyContent: 'center',
    width:50,
    height:50
  },
  recordingButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    height:50,
    backgroundColor: 'white',
  },
  recordingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#410D3F',
  },
  recordingStatusText: {
    marginTop: 16,
    alignSelf: 'center',
  },
  messagesContainer: {

    padding: 0,
    width: 350,
  },
  messageBubble: {
    maxWidth: '70%',
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
  },
  voiceButton: {
    color: '#410D3F', // Cambia el color aquí (por ejemplo, a azul)
    // Otros estilos para el botón
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    width: 300,
    left: 40,
    bottom:10
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#EFEFEF',
  },
  sendButton: {
    marginLeft: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#410D3F',
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  
  },
  // Add your chat styles here
});

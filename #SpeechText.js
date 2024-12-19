import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, TextInput, Image, SafeAreaView } from 'react-native';
import Voice from '@react-native-voice/voice';
import FloatingButton from './button';
import { Permissions } from "expo-permissions";

export default function SpeechText() {
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('Esperando');
  const [audioPermission, setAudioPermission] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
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

  return (
    <View style={styles.container}>
      <Image source={require('./assets/background2.png')} style={[styles.image, StyleSheet.absoluteFill]} />
      <View style={styles.recordingButtonContainer}>

        <TouchableOpacity style={styles.recordingButton} onPress={handleRecordButtonPress}>
          {recording ? (
            <FontAwesome name="stop-circle" size={64} color="white" />
          ) : (
            <FontAwesome name="microphone" size={64} color="white" />
          )}
          </TouchableOpacity>
      </View> 

      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              {
                alignSelf:
                  message.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor:
                  message.sender === 'user' ? '#672369' : '#141E46',
              },
            ]}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje..."
          value={recognizedText}
          onChangeText={(text) => setRecognizedText(text)}
        />
                <TouchableOpacity
          onPress={() => {
            isListening ? stopListening() : startListening();
          }}
          style={styles.voiceButton}>
          {isListening ? (
            <Text style={styles.voiceButtonText}>   •••    </Text>
          ) : (
            <TouchableOpacity style={[styles.recordingButton,{height:45, width:45, left:6}]} onPress={handleRecordButtonPress}>
          {recording ? (
            <FontAwesome name="stop-circle" size={20} color="white" />
          ) : (
            <FontAwesome name="microphone" size={20} color="white" />
          )}
          </TouchableOpacity>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
        
      </View>
              <FloatingButton/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordingButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 250,
    marginBottom:200,
  },
  recordingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
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

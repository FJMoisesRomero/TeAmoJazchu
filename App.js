import React, {useEffect} from 'react';
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Button, Alert, BackHandler} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import { openBrowserAsync } from 'expo-web-browser';
import { Linking } from 'react-native';
import { useBackHandler } from '@react-native-community/hooks';
import Chat from './Chat';
import SpeechText from './#SpeechText';
import PoseDetection from './PoseDetection';
import CreateRoomScreen from './CreateRoomScreen';
import RoomSelectionScreen from './RoomSelectionScreen';
import FloatingButton from './button';
import JoinRoomScreen from './JoinRoomScreen'; // Asegúrate de que la ruta sea correcta
import TextSpeech from './TextSpeech';
import VoiceDetection from './VoiceDetection';
import ProfileButton from './ProfileButton'; 

const Stack = createStackNavigator();
const imagenesAleatorias = ['edward-elric.jpg', 'roy-mustang.jpg', 'alphonse-elric.jpg', 'tony-tony-chopper.jpg', 'shoto-todoroki.jpg', 'saitama.jpg', 'guts.jpg', 'inuyasha.jpg', 'boa-hancock.jpg'];
let avatarIndexFinal = 0;
export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Speech" component={SpeechText} />
      <Stack.Screen name="PoseDetection" component={PoseDetection} />
      <Stack.Screen name="RoomSelection" component={RoomSelectionScreen} />
      <Stack.Screen name="CreateRoom" component={CreateRoomScreen} />
      <Stack.Screen name="Button" component={FloatingButton} />
      <Stack.Screen name="JoinRoomScreen" component={JoinRoomScreen} />
      <Stack.Screen name="TextSpeech" component={TextSpeech} />
      <Stack.Screen name="VoiceDetection" component={VoiceDetection} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
const abrirChrome = () => {
  const url = 'https://fjmoisesromero.github.io/Tell/lectorindex.html'; // Reemplaza con la URL que desees abrir

  Linking.openURL(url)
    .then((supported) => {
      if (!supported) {
        console.error("No se puede abrir la URL en el navegador");
      } else {
        console.log("Navegador abierto exitosamente");
      }
    })
    .catch((err) => console.error("Error al abrir el navegador", err));
};
function HomeScreen({ navigation }){
  useEffect(() => {
    const backAction = () => {
        Alert.alert('', '¿Deseas Cerrar Sesión?', [
            {
                text: "Cancelar",
                onPress: () => null,
                style: "cancel"
            },
            { text: "Cerrar Sesión", onPress: () => {
                navigation.navigate('Login');
                }
            }
        ]);
        return true;
    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    return () => backHandler.remove();
}, []);
  
  return(
      <View style={styles.container}>
        <Image source={require('./assets/backgroundhome.png')} style={[styles.image, StyleSheet.absoluteFill]} />
        <ScrollView contentContainerStyle={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          }}>
          <Image source={require('./assets/tell2.png')} style={[styles.appPicture, {top:-50}]} />
          <Text style={{ fontSize: 48, fontWeight: '800', color: '#551854', top:-50}}>Tell</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center', top: 0, flexDirection: 'row' }}>

            <View>
              <TouchableOpacity onPress={() => navigation.navigate('RoomSelection', { avatarIndex: avatarIndexFinal})}>
                <View style={{ top:-20,marginVertical:25, flexDirection: 'row',justifyContent: 'center', alignItems: 'center',backgroundColor:'#2E032A', padding:0, width:220, borderRadius:50,}}>
                    <Image source={require('./assets/room.png')} style={[styles.appPicture2,{top:-13,left:-10}]} />
                    <Text style={{ fontSize: 20, fontWeight: '800', color: 'white',  textAlign:'center',top:0}}>Salas</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={abrirChrome} title="Abrir Chrome">
                <View style={{top:-20,marginVertical:25, flexDirection: 'row',justifyContent: 'center', alignItems: 'center',backgroundColor:'#2E032A', padding:0, width:220, borderRadius:50,}}>
                    <Image source={require('./assets/savefiles.png')} style={[styles.appPicture2,{top:-13,left:-10}]} />
                    <Text style={{ fontSize: 20, fontWeight: '800', color: 'white',  textAlign:'center',top:0}}>Guardados</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
        <FloatingButton/>
        <ProfileButton />
      </View>
  );
}

function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const handleLogin = async () => {
    if (email && password) {
      signInWithEmailAndPassword(auth,email,password)
      .then(()=>{
        console.log('Sesion Iniciada');
        Alert.alert('','Sesion Iniciada');
        const user = auth.currentUser;
        console.log(user)
        navigation.navigate('Home')
      })
      .catch(error =>{
        console.log(error)
        Alert.alert(error.message)
      })
    }
    else {
      // Muestra un mensaje de error si no se completaron todos los campos
      Alert.alert('','Por favor, ingrese todos los campos');
    }
  }
  return (
    <View style={styles.container}>
      <Image source={require('./assets/background.png')} style={[styles.image, StyleSheet.absoluteFill]} />
      <ScrollView contentContainerStyle={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

          <View style={styles.login}>
            <Image source={require('./assets/tell.png')} style={[styles.appPicture,{top:-100}]} />
            <Text style={{ fontSize: 48, fontWeight: '400', color: '#F9FBFE',top:-100 }}>Tell</Text>
            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: '#410d3f'}}>E-mail</Text>
              <TextInput onChangeText={(text)=> setEmail(text)} style={styles.input} placeholder='E-mail' />
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: '400', color: '#410d3f' }}>Contraseña</Text>
              <TextInput onChangeText={(text)=> setPassword(text)} style={styles.input} placeholder='Contraseña' secureTextEntry={true} />
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              style={{
                backgroundColor: '#672369',
                borderRadius: 10,
                width: 300,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 20,
              }}
            >
                <Text style={{fontSize: 17, fontWeight: '400', color: '#f9fbfe' }}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#551854' }]}
              onPress={() => navigation.navigate('Registro')}
            >
                <Text style={{ fontSize: 17, fontWeight: '400', color: '#f9fbfe' }}>Registrarse</Text>
            </TouchableOpacity>
          </View>

      </ScrollView>
    </View>
  );
}

function RegistroScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleRegister = () => {
    if (email && username && password && confirmPassword && acceptedTerms) {
      createUserWithEmailAndPassword(auth,email,password)
      .then(()=>{
        console.log('Registrado con éxito');
        Alert.alert('','Registrado con éxito',[{text:'Continuar'}]);
        const user = auth.currentUser;
        console.log(user)
        // Genera un índice aleatorio
        avatarIndexFinal = Math.floor(Math.random() * 9);

        // Redirige a la pantalla de chat y pasa el índice aleatorio como parámetro
        navigation.navigate('Home');
        
      })
      .catch(error =>{
        console.log(error)
        Alert.alert(error.message)
      })
    } else {
      // Muestra un mensaje de error si no se completaron todos los campos
      console.log('Por favor, completa todos los campos');
      Alert.alert('','Por favor, completa todos los campos');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/background2.png')} style={[styles.image, StyleSheet.absoluteFill]} />
      <TouchableOpacity>
        <Image source={require('./assets/profile.png')} style={styles.profilePicture} />
      </TouchableOpacity>
      <View style={{ backgroundColor: '#672369',borderColor: '#672369',borderRadius:100, borderWidth: 5, position: 'relative', top: -40, right: -40 }}>
    <Image source={require('./assets/camera.png')} style={{ width: 20, height: 20, backgroundColor: '#672369' }} />
  </View>
      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <Text style={styles.label}>Nombre de usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={text => setUsername(text)}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <Text style={styles.label}>Confirmar Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />

      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => setAcceptedTerms(!acceptedTerms)}
      >
        {acceptedTerms ? (
          <Text style={styles.checkboxText}>✔️ Acepto los términos y condiciones</Text>
        ) : (
          <Text style={styles.checkboxText}>❌ Acepto los términos y condiciones</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
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
  appPicture: {
    width: 100,
    height: 100,
    marginTop: 30,
  
  },
  appPicture2: {
    width: 50,
    height: 50,
    marginTop: 30,
  
  },
  profilePicture: {
    width: 150,
    height: 150,
    marginTop: 30,
    borderColor: '#672369',
    borderWidth: 5,
    borderRadius: 100,
    marginTop: -10,
    marginBottom: 10,
  },
  label: {
    fontSize: 17,
    fontWeight: '400',
    color: '#410d3f',
    marginTop: 5,
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
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkboxText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
    marginVertical: 20,
    textDecorationLine: 'underline',
  },
  button: {
    width: 300,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#672369',

  },
  buttonText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
  },
  login: {
    width: 350,
    height: 550,
    padding: 10,
    alignItems: 'center',

  },
});

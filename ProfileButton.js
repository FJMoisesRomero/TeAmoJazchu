import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated, Image, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
const avatarIndex = Math.floor(Math.random() * 9);
const ProfileButton = () => {
  const [viewWidth] = useState(new Animated.Value(0));
  const [isVisible, setIsVisible] = useState(false);
  const [iconSource, setIconSource] = useState(require('./assets/profile-icon.png'));

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
  const navigation = useNavigation();

  const slideIn = () => {
    setIsVisible(true);
    Animated.timing(viewWidth, {
      toValue: 250,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(viewWidth, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setIsVisible(false);
      viewWidth.setValue(30);
    });
  };

  const toggleIcon = () => {
    if (iconSource === require('./assets/profile-icon.png')) {
      setIconSource(require('./assets/cross-icon.png'));
    } else {
      setIconSource(require('./assets/profile-icon.png'));
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: () => {
            // Aquí puedes agregar la lógica para navegar a la pantalla de inicio de sesión
            navigation.navigate("Login"); // Asegúrate de tener "LoginScreen" configurado como nombre de ruta en tu StackNavigator
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ position: 'absolute', top: 0, right: -30, height: '100%' }}>
      {isVisible && (
        <Animated.View style={[styles.profileView, { width: viewWidth, alignItems: "center" }]}>
          <Image source={{ uri: `https://cdn-0.generatormix.com/images/anime-character/${imagenesAleatorias[avatarIndex]}` }} style={styles.profilePicture} />
          <TouchableOpacity onPress={() => console.log("Ir a perfil")}>
            <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: '800', color: 'white', right: 10, marginVertical: 10, top: -150 }}>Perfil</Text>
          </TouchableOpacity>
          {isVisible && (
            <TouchableOpacity onPress={handleLogout}>
              <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: '800', color: 'white', right: 10, marginVertical: 10 }}>Cerrar Sesión</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      )}
      <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          isVisible ? slideOut() : slideIn();
          toggleIcon();
        }}
      >
        <Image source={iconSource} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: '#410D3F',
    width: 100,
    height: 80,
    right: 0,
    top: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileView: {
    backgroundColor: '#410D3F',
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
  },
  icon: {
    width: 25,
    height: 25,
    right: 5,
    tintColor: 'white',
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
    top: -150,
    right: 12,
  },
});

export default ProfileButton;

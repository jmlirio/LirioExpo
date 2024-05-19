import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, Button } from 'react-native';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
   <Image source={require('./NewLogoMobile.png')} style={styles.logo} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signinscreen')}>
        <Text style={styles.buttonText}>Got to Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('Signupscreen')}>
        <Text style={styles.buttonText_1}>No account yet? Sign up</Text>
        
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171616',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 185,
    height: 185,
    marginBottom: 125,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: '80%',
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOutline: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    width: '80%',
    borderRadius: 25,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
  },
  buttonText_1: {
    color: 'white',
    fontSize: 18,
  },
});

export default LandingPage;
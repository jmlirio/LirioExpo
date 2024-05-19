import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, Button } from 'react-native';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderBackButton } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import LandingPage from './Landingpage';

const Signinscreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInputFocused, setInputFocus] = useState(false);



  const handleLogin = async () => {
    try{
      console.log('Attempting to log in with email:', email); // Debug log
      const response = await axios.post('http://192.168.100.3:3001/login', {email, password});
      const { token } = response.data;
      const decoded = jwt_decode(token);
      console.log('Decoded JWT:', decoded); // Debug log
      await AsyncStorage.setItem('token', token);
      const testToken = await AsyncStorage.getItem('token'); // Debug log
      console.log('Stored token:', testToken); // Debug log
      navigation.navigate('Homescreen');
    } catch (error) {
      console.error('Login error:', error); // Debug log
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.inputContainer}>
     <TouchableOpacity onPress={() => navigation.navigate('Landingpage')}>
     <Image source={require('./backbutton.png')} style={styles.inputIcon} />
    </TouchableOpacity>
    <Text style={{position: 'relative', bottom: 100, left: 40, fontSize: 30, color: 'white'}}>Hey, Welcome</Text>
    <Text style={{position: 'relative', bottom: 100, left: 40, fontSize: 30, color: 'white'}}>Back!</Text>
        <TextInput 
                
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
    style={[styles.input, { paddingLeft: 30 }]} // Adjust paddingLeft to make room for the image
    placeholder="Email" 
    placeholderTextColor="#fff"
    value={email} 
    onChangeText={setEmail} 
    autoCapitalize='none'
  />
    
      <TextInput 
    style={[styles.input, { paddingLeft: 30 }]} // Adjust paddingLeft to make room for the image
    placeholder="Password" 
    placeholderTextColor="#fff"
    value={password} 
    secureTextEntry={true}
    onChangeText={setPassword} 
    autoCapitalize='none'
  />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const  styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#171616',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderRadius: 25,
    padding: 10,
    marginTop: 25,
    marginBottom: 15,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    width: '95%',
    padding: 15,
  },
  inputIcon: {
    width: 25, // Adjust as needed
    height: 20, // Adjust as needed
    marginLeft: 10,
    marginBottom: 210  // Adjust as needed
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 25,
    width: '95%',
    padding: 20,
    margin: 1,
    marginBottom: 15,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Signinscreen;
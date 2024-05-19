import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, Modal, Button } from 'react-native';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signupscreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInputFocused, setInputFocus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleRegister = async () => {
    try{
      const response = await axios.post('http://192.168.100.3:3001/Users/register', {
        email: email,
        password: password
      })
      console.log(response.data);
      if (response.data.message === "User registered successfully") {
        Alert.alert('Registration Successful', response.data.message);
        setModalVisible(true);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.log(error.response);
      Alert.alert('Registration Failed', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Landingpage')}>
        <Image source={require('./backbutton.png')} style={styles.inputIcon} />
      </TouchableOpacity>
      <Text style={{position: 'relative', bottom: 100, left: 40, fontSize: 30, color: 'white'}}>Create your</Text>
      <Text style={{position: 'relative', bottom: 100, left: 40, fontSize: 30, color: 'white'}}>account</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{marginTop: 22}}>
          <View>
            <Text>User Created Successfully!</Text>
            <Button
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              title="Close"
            />
          </View>
        </View>
      </Modal>
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

export default Signupscreen;
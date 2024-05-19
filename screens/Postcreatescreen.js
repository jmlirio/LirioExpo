import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Postcontext } from '../Postcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const Postcreatescreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [user_id, setUserID] = useState('');
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [user, setUser] = useState(null);
  const { addPost } = useContext(Postcontext);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const user = jwtDecode(token);
        setUser(user);
      }
    };

    fetchUser();
  }, []);

  const submitPost = () => {
    addPost(title, description, user_id);
    setTitle('');
    setDescription('');
    setUserID('');
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
    <Text style={styles.Text}>Create Post</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Homescreen')}>
      <Image source={require('./backbutton.png')} style={styles.inputIcon} />
    </TouchableOpacity>
    {showUserInfo && (
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>ID: {user.id}</Text>
      </View>
    )}
    <TouchableOpacity style={styles.userCircle} onPress={() => setShowUserInfo(!showUserInfo)}>
      <Text style={styles.userCircleText}>?</Text>
    </TouchableOpacity>
    <TextInput
      style={styles.input3}
      placeholderTextColor="white"
      placeholder="ID"
      value={user_id}
      onChangeText={setUserID}
    />
    <TextInput
      style={{...styles.input1, paddingLeft: 10, fontWeight: '900', color: 'white'}}
      placeholderTextColor="white"
      placeholder="Your Caption"
      value={title}
      onChangeText={setTitle}
    />
    <TextInput
      style={{...styles.input2, paddingLeft: 10, paddingBottom: 150, fontWeight: '900', color: 'white'}}
      placeholderTextColor="white"
      placeholder="What's on your mind?"
      value={description}
      onChangeText={setDescription}
    />
    <TouchableOpacity style={styles.submit} onPress={submitPost}>
      <Text style={styles.submitText}>Post</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#171616',
  },
  input1: {
    height: 40,
    borderColor: 'white',
    borderWidth: 2,
    marginBottom: 20,
    marginTop: 140,
    marginBottom: 5,
    borderRadius: 25,
    
  },
  input2: {
    height: 40,
    borderColor: 'white',
    borderWidth: 2,
    marginBottom: 20,
    marginTop: 10,
    marginBottom: 30,
    width: '100%',
    height: 200,
    borderRadius: 25,
    
  },
  input3: {
    position: 'absolute', // add this
    top: 230, // adjust as needed
    left: 20, // adjust as needed
    borderColor: 'white',
    borderWidth: 2,
    width: '15%', // adjust as needed
    height: 30, // adjust as needed
    borderRadius: 25,
    paddingLeft: 10, // adjust as needed
    fontWeight: '900',
    color: 'white'
  },
  inputIcon: {
    width: 25, // Adjust as needed
    height: 20, // Adjust as needed
    marginLeft: 10,
    // marginBottom: 21,
    marginTop: 91   // Adjust as needed
  },
  submit: {
    backgroundColor: 'black',
    borderRadius: 25,
    width: 250,
    padding: 20,
    margin: 35,
    marginBottom: 15,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 0.5,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
  Text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 105,
    left: 90,
    position: 'absolute',
  },
  userCircle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    top: 229,
    left: 300,
    position: 'absolute',
  },
  userCircleText: {
    color: 'black',
    fontWeight: 'bold',
  },
  userInfo: {
   position: 'absolute',
    top: 228,
    left: 240,
    width: '15%',
    height: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoText: {
    color: 'white',
    position: 'absolute',
  },
});

export default Postcreatescreen;
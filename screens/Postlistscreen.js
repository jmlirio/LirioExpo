import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { Postcontext } from '../Postcontext';

const Postlistscreen = ({navigation}) => {
  const { posts, fetchPosts, updatePost, deletePost } = useContext(Postcontext);

  const [editingPost, setEditingPost] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedUserId, setUpdatedUserId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleUpdate = (id) => {
    updatePost(id, { title: updatedTitle, description: updatedDescription, user_id: updatedUserId }); 
    setEditingPost(null);
    setModalVisible(false);
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.title}>Caption: {item.title}</Text>
      <Text style={styles.description}>Description: {item.description}</Text>
      <Text style={styles.userId}>Posted by: {item.user_id}</Text>
      <TouchableOpacity onPress={() => {setEditingPost(item.id); setModalVisible(true);}}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deletePost(item.id)}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <Text style={styles.Text}>Posts History</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Homescreen')}>
        <Image source={require('./backbutton.png')} style={styles.inputIcon} />
      </TouchableOpacity>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
     <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <TextInput
        value={updatedTitle}
        onChangeText={setUpdatedTitle}
        style={{...styles.inputText1, color: 'white', paddingLeft: 10, width: 200}}
        placeholder="Update title"
        placeholderTextColor="white"
      />
      <TextInput
        value={updatedDescription}
        onChangeText={setUpdatedDescription}
        style={{...styles.inputText2, color: 'white', paddingLeft: 10, width: 200}}
        placeholder="Update description"
        placeholderTextColor="white"
      />
      <TouchableOpacity onPress={() => handleUpdate(editingPost)}>
        <Text style={styles.buttonText}>Submit Update</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(false)}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#171616',
    
  },
  post: {
    marginTop: 65,
    borderWidth: 0.5, 
    borderColor: 'white', 
    borderRadius: 10, 
    padding: 10, 
    backgroundColor: '#333',
    height: 200, 
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 16,
    color: 'white',
    marginTop: 20,
  },
  inputIcon: {
    width: 25, // Adjust as needed
    height: 20, // Adjust as needed
    marginLeft: 10,
    // marginBottom: 21,
    marginTop: 91   // Adjust as needed
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
  userId: {
    fontSize: 14,
    color: 'white',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  inputText1: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 10,
    
    borderRadius: 25,
  },
  inputText2: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 10,
   
   
    borderRadius: 25,
  },
  inputText3: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 10,
    
    borderRadius: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: '#171616',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

});

export default Postlistscreen;
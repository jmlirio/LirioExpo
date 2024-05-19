import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Postcontext } from '../Postcontext';

const Postdetailscreen = ({navigation}) => {
  const { posts, fetchPosts } = useContext(Postcontext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.title}>Caption: {item.title}</Text>
      <Text style={styles.description}>Description: {item.description}</Text>
      <Text style={styles.date}>Created at: {item.created_at}</Text>
      <Text style={styles.date}>Updated at: {item.updated_at}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Posts Details</Text>
       <TouchableOpacity onPress={() => navigation.navigate('Homescreen')}>
     <Image source={require('./backbutton.png')} style={styles.inputIcon} />
    </TouchableOpacity>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
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
    borderColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', 
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: 'white',
  },
  date: {
    fontSize: 14,
    color: '#fff',
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
});

export default Postdetailscreen;
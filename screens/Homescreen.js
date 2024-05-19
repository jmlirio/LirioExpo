import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwtDecode from 'jwt-decode';





const Homescreen = ({navigation}) => {
    const [user, setUser] = useState(null);
    
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
            navigation.navigate('Landingpage');
        } catch (error) {
            console.error("Failed to remove the user.", error);
        }
    };

    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>OutBlog</Text>
            {user && <Text>Email: {user.email}</Text>}
            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Postcreatescreen')}>
                <Text style={styles.boxText}>What's on your mind?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Postlistscreen')}>
                <Text style={styles.boxText}>View Posts History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Postdetailscreen')}>
                <Text style={styles.boxText}>View Posts Details</Text>
            </TouchableOpacity>
            

            <TouchableOpacity style={styles.logout} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#171616',
    },
    box: {
        width: 250,
        height: 50,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 1,
    },
    boxText: {
        fontSize: 20,
        color: 'white',
    },
    
    title: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    logout: {
        backgroundColor: 'white',
        borderRadius: 25,
        width: 250,
        padding: 20,
        margin: 10,
        marginBottom: 15,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutText: {
        color: 'black',
        fontWeight: 'bold',
    },
});

export default Homescreen;
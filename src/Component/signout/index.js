import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native'; // Add this import statement

const DeleteDataButton = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    // Retrieve the user's name and image URI from AsyncStorage
    const fetchData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        const storedImage = await AsyncStorage.getItem('userImage');

        if (storedName !== null) {
          setUserName(storedName);
        }

        if (storedImage !== null) {
          setUserImage(storedImage);
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleDeleteAllData = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Logout ',"Login again");

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.error('Error deleting all data from AsyncStorage:', error.message);
      Alert.alert('Error', 'An error occurred while deleting all AsyncStorage data.');
    }
  };

  const profile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={{ backgroundColor: '#b3ffff', width: '100%', padding: '3%', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
      <TouchableOpacity onPress={profile}>
        <View>
          {userImage !== '' && <Image source={{ uri: userImage }} style={{ width: 50, height: 50, borderRadius: 500 }} />}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeleteAllData}>
        <Text style={{ color: 'black', alignSelf: 'flex-end', fontSize: 20 }}>Signout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeleteDataButton;

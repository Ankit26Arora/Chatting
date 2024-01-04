import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        const storedImage = await AsyncStorage.getItem('userImage');
        const storedEmail = await AsyncStorage.getItem('userEmail');

        if (storedName !== null) {
          setUserName(storedName);
        }

        if (storedImage !== null) {
          setUserImage(storedImage);
        }

        if (storedEmail !== null) {
          setUserEmail(storedEmail);
        }
      } catch (error) {
        console.error('Error retrieving user data from AsyncStorage:', error.message);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <View style={{backgroundColor:'#b3ffff',flex:1,justifyContent:'center',alignItems:'center'}}>
        <View >
      {userImage !== '' && <Image source={{ uri: userImage }} style={{ width: 200, height: 200, borderRadius: 100 }} />}
      </View>
      <View style={{alignItems:'center'}}>

      <Text style={{fontSize:30,color:'#00cccc',marginTop:'3%'}}>{userName}</Text>
      <Text style={{fontSize:30,color:'#00cccc',marginTop:'3%'}}>{userEmail}</Text>
      </View>
      
    </View>
  );
};

export default Profile;

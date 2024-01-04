import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Signout from '../../Component/signout';

const Chat = () => {
  const navigation = useNavigation();

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const querySnapshot = await firestore().collection('Users').get();
      const allUsers = querySnapshot.docs.map(doc => doc.data());
      setUsers(allUsers);
      console.log(allUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const opendetail = (item) => {
    navigation.navigate('Onemessage', { user: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => opendetail(item)}>
      <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc', flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => opendetail(item)}>
          <Image
            source={{ uri: item.profileImage }}
            style={{ width: 50, height: 50, borderRadius: 100 }}
          />
        </TouchableOpacity>

        <View style={{ marginTop: '3%', marginLeft: '3%' }}>
          <Text style={{ fontSize: 20, color: 'black' }}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
        <Signout/>
        
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
      <View >

        </View>
    </View>
  );
};

export default Chat;

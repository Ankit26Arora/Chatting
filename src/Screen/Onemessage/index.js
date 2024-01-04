import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons'; 
const Onemessage = () => {
  const route = useRoute();
  const user = route.params;
  const users = user.user.uid;
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const [userUID, setUserUID] = useState(null);
  const [messages, setMessages] = useState([]);
  const [storedUID, setStoredUID] = useState(null);

  const getUserUID = async () => {
    try {
      const uid = await AsyncStorage.getItem('userUID');
      if (uid) {
        setStoredUID(uid);
      } else {
        console.error('User UID is not available.');
      }
    } catch (error) {
      console.error('Error while accessing AsyncStorage:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserUID();
        const docid =
          users > storedUID ? storedUID + "-" + users : users + "-" + storedUID;

        const query = firestore()
          .collection('chatrooms')
          .doc(docid)
          .collection('messages')
          .orderBy('createdAt', 'desc');

        const unsubscribe = query.onSnapshot((querySnapshot) => {
          const allmsg = querySnapshot.docs.map((docSnap) => {
            return {
              ...docSnap.data(),
              createdAt: docSnap.data().createdAt.toDate(),
            };
          });

          setMessages(allmsg);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchData();
  }, [storedUID, users]); // Include storedUID and users in the dependency array

  const onSend = (messages) => {
    const msg = messages[0];
    const mymsg = {
      ...msg,
      sendBy: storedUID,
      sendTo: users,
      createdAt: new Date(),
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, mymsg)
    );

    const docid = users > storedUID ? storedUID + "-" + users : users + "-" + storedUID;

    firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .add(mymsg);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: '6%',
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: '2%',
        }}>
        <TouchableOpacity onPress={goBack}>
        <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <Image
          source={{ uri: user.user.profileImage }}
          style={{ width: 30, height: 30, borderRadius: 100, marginLeft: '1%' }}
        />
        <Text style={{ fontSize: 25, color: 'black', marginLeft: '3%' }}>
          {user.user.name}
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={text => onSend(text)}
        user={{
          _id: storedUID,
        }
      }
      
        
      />
    </View>
  );
};

export default Onemessage;

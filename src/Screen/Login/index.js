import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const route = useRoute();
  const { isSignUpSuccess } = route.params || {};

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userUID, setUserUID] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    checkPreviousLogin(); 
  }, []); 

  const checkPreviousLogin = async () => {
    try {
      const userUIDFromStorage = await AsyncStorage.getItem('userUID');
      if (userUIDFromStorage) {
        navigation.navigate('Chat');
      }
    } catch (error) {
      console.error('Error checking AsyncStorage:', error);
    }
  };

  const handleLogin = async () => {
    try {
      console.log('Logging in with email:', email);
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log("this data may be save in ",user)
      const uid = user.uid;
      setUserUID(uid);
      console.log('User UID:', uid);
  
      try {
        await AsyncStorage.setItem('userUID', uid); // Store the UID in AsyncStorage
        console.log('User UID stored in AsyncStorage');
      } catch (error) {
        // Handle errors related to AsyncStorage, if necessary
        console.error('Error storing userUID in AsyncStorage:', error);
      }
  
      console.log('User logged in. UID:', uid);
      navigation.navigate('Chat');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  const gotosignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={{color: '#00cccc', fontSize: 25, fontFamily: 'Cursive'}}>
          Wlcome back!
        </Text>
      </View>
      <Text style={styles.title}>Login</Text>
      
      {isSignUpSuccess && (
        <Text style={{ color: 'green', fontSize: 16 }}>
          Account created successfully. You can now log in.
        </Text>
      )}
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: '10%' }} onPress={gotosignup}>
        <Text style={{ color: 'black', fontSize: 15 }}>
          Don't have an account? Sign up here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor:'#b3ffff'
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
    borderBottomColor:'black',
    borderBottomWidth:1
  },
  button: {
    width: '100%',
    backgroundColor: 'blue', // Customize button color
    borderRadius: 5,
    paddingVertical: 12,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Login;

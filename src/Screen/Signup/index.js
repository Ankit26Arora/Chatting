import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const Signup = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    // Validate the form
    if (!fullName || !email || !password || !confirmPassword || !phoneNumber) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');

    navigation.navigate('Image', {
      name: fullName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    });
  };

  const gotoLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={{color: '#00cccc', fontSize: 25, fontFamily: 'Cursive'}}>
          Hello!
        </Text>
      </View>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={{color: 'red'}}>{error}</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={text => setFullName(text)}
        value={fullName}
      />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={text => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={text => setPhoneNumber(text)}
        value={phoneNumber}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={gotoLogin}>
        <Text style={{marginTop: 20}}>Login?</Text>
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
    backgroundColor: '#b3ffff',
  },
  title: {
    fontSize: 35,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  button: {
    width: '100%',
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 12,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Signup;

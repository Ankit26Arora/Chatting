import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DefaultImage = require('../../Assets/image/profile.jpg');

const ImagePickerComponent = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const route = useRoute();
  const { name, email, phoneNumber, password } = route.params;
  console.log(name, password);

  const pickImage = async () => {
    try {
      const selectedImage = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      setImage(selectedImage.path);
      console.log('Image state after setting:', selectedImage);
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const saveDataToFirebase = async () => {
    try {
      setLoading(true);

      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log("User:", user);

      if (user) {
        const userid = user.uid;
        console.log('User ID:', userid);

        let imageDownloadURL = null;

        if (image) {
          const filename = `${userid}_profile.jpg`;
          const imageRef = storage().ref(`userImages/${filename}`);
          await imageRef.putFile(image);
          imageDownloadURL = await imageRef.getDownloadURL();

          console.log('Image uploaded to Firebase Storage:', imageDownloadURL);
        }

        await firestore()
          .collection('Users')
          .doc(userid)
          .set({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            profileImage: imageDownloadURL,
            uid: userid
          });

        // Store the UID in AsyncStorage
        await AsyncStorage.setItem('userUID', userid);
        await AsyncStorage.setItem('userName', name);
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userImage',image)

        console.log('User registered successfully');
        navigation.navigate('Chat');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Error registering user. Please try again.');
    } finally {
      setLoading(false); // Set loading to false when the registration process is complete
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#b3ffff' }}>
      <View style={{ marginTop: '40%' }}>
        <View style={{ alignItems: 'center' }}>
          {image ? (
            <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
          ) : (
            <Image source={DefaultImage} style={{ width: 100, height: 100 }} />
          )}
        </View>
        <View style={{ marginTop: '4%' }}>
          <TouchableOpacity onPress={pickImage} style={{ backgroundColor: '#00cccc', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: 'black', margin: '1%' }}>Pick image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={saveDataToFirebase} style={{ backgroundColor: '#00cccc', alignItems: 'center', marginTop: '3%' }}>
            <Text style={{ fontSize: 20, color: 'black', margin: '1%' }}>Create account</Text>
          </TouchableOpacity>
          <View style={{ alignItems: 'center', marginTop: '3%' }}>
            <Text style={{ fontSize: 15, color: 'black', }}>Already have an account?</Text>
          </View>
          {loading && (
            <View style={{ marginTop: 20 }}>
              <ActivityIndicator size="large" color="#00cccc" />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ImagePickerComponent;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Chat, ImagePickerComponent, Login, Onemessage, Signup} from '../Screen';
import Profile from '../Screen/Profile';

const AuthStack = () => {
  const stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name="Login" component={Login} />
        <stack.Screen name="Signup" component={Signup} />

        <stack.Screen name='Image' component={ImagePickerComponent}/>
        <stack.Screen name='Chat' component={Chat}/>
        <stack.Screen name='Onemessage' component={Onemessage}/>
        <stack.Screen name='Profile' component={Profile}/>
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;

import React from 'react';
import Login from '../Components/Screens/Login';
import SignUp from '../Components/Screens/SignUp';
import {createStackNavigator} from '@react-navigation/stack';

const RootStackScreen = createStackNavigator();

const RootStack = ({navigation}) => (
  <RootStackScreen.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
    })}>
    <RootStackScreen.Screen name="Login" component={Login} />
    <RootStackScreen.Screen name="SignUp" component={SignUp} />
  </RootStackScreen.Navigator>
);

export default RootStack;

import React from 'react';
import {View, Text, Image, Platform, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabActions} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Components/Screens/Home';
import Profile from '../Components/Screens/Profile';
const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        style: {
          backgroundColor: '#fff',
        },
        initialRouteName: 'Home',
        activeColor: '#25C866',
        inactiveColor: '#AEAEAE',
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStackScreen}
        options={{
          tabBarIcon: () => (
            <View>
              <Text>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: () => (
            <View>
              <Text>Profile</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};


const HomeStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

const ProfileStackScreen = ({navigation}) => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default MainTabScreen;

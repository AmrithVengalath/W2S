import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootStack from './RootStack';
import MainTabScreen from './MainTabScreen';
import { userSelectorFull } from './Redux/Selectors/UserSelector';
import {useSelector} from 'react-redux';
// const Stack = createNativeStackNavigator();

const App = ({navigation}) => {
  const {token} = useSelector(state => userSelectorFull(state));
  return (
    <NavigationContainer>
      {token !== '' ? <MainTabScreen /> : <RootStack />}
    </NavigationContainer>
  );
};

export default App;

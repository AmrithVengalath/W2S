import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { useDispatch } from 'react-redux';
import LoginDispatch from '../../Config/Redux/Dispatchers/LoginDispatch';
// import Toast from "react-native-simple-toast";

const db = openDatabase({ name: 'mydb.db' });

const SignUp = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const dispatch = useDispatch();

const handleSignup = () => {

    // if (name == '' || email == '' || password == '')
    // {
    //     Toast.show("Fill all feilds")}
    // else{

        db.transaction((txn) => {
            txn.executeSql('SELECT * FROM users WHERE email = ?',[email],
            (_, result) => {
                if (result.rowsAffected > 0) {
                    console.log(result)
                } else {
                    txn.executeSql(
                        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                        [name, email, password],
                        (_, result) => {
                          if (result.rowsAffected > 0) {
                            
                            dispatch(LoginDispatch(password, name,email,password));
                          }
                        }
                      );
                }
              })
        })
// }
  };

  return (
    <SafeAreaView backgroundColor='rgb(107,208,148)'>
      <StatusBar backgroundColor='#3DC173' />
      <View style={styles.container}>
        <Text style={{color: 'white', fontSize: 36, fontWeight: '600'}}>
          Register
        </Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInputBox} placeholder="Name" 
        value={name}
        onChangeText={setName}/>
          <TextInput style={styles.textInputBox} placeholder="Email" 
        value={email}
        onChangeText={setEmail}/>
          <TextInput style={styles.textInputBox} placeholder="Password" 
        value={password}
        onChangeText={setPassword}/>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleSignup()
          }}
          style={styles.button}>
          <Text style={{color: 'white'}}>Register</Text>
        </TouchableOpacity>
        <View style={styles.signinTextContainer}>
          <Text style={styles.text}>Already have account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.clickableText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(107,208,148)',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textInputBox: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#6A74CF',
    borderRadius: 40,
    alignItems: 'center',
    width: '50%',
    borderRadius: 40,
    padding: 10,
    marginTop: 20,
  },
  clickableText: {
    color: '#6A74CF',
    fontWeight: '400',
    fontSize: 14,
  },
  signinTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontWeight: '400',
    fontSize: 14,
  },
  imageContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
});

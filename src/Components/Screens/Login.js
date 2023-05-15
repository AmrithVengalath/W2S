import React, { useState, useEffect }  from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { openDatabase } from "react-native-sqlite-storage";
import { useDispatch } from 'react-redux';
import LoginDispatch from '../../Config/Redux/Dispatchers/LoginDispatch';
// import Toast from "react-native-simple-toast";
const db = openDatabase({ name: 'mydb.db' });

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (_, result) => {
          if (result.rows.length > 0) {
            const user = result.rows.item(0);
            // console.log(JSON.stringify(result.rows.item(0).email))
            dispatch(LoginDispatch(result.rows.item(0).password, result.rows.item(0).name,result.rows.item(0).email,result.rows.item(0).password))
          } 
          else {
            // Toast.show("Incorrect email/password")
            // console.log("Incorrect Password")
          }
        }
      );
    });
  };

  const createTable = (() => {
  db.transaction(function (txn) {
    // Create cart table if not exisit
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
      [],
      function (tx, res) {
        // console.log("item (row length):", res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql("DROP TABLE IF EXISTS users", []);
          txn.executeSql(
            "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), email VARCHAR(50),  password VARCHAR(50))",
            []
          );
        }
      }
    );
  })
  })

  useEffect(() => {
    createTable()
  }, [])

  return (
    <SafeAreaView backgroundColor="#fff">
      <StatusBar backgroundColor="#fff" />
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: 'rgb(107,208,148)',
            marginVertical: 150,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 36, fontWeight: '600'}}>
            Login
          </Text>
          <View style={styles.inputTextContainer}>
            <TextInput style={styles.textInputBox} placeholder="Email" 
        value={email}
        onChangeText={setEmail}/>
            <TextInput style={styles.textInputBox} placeholder="Password" 
        value={password}
        onChangeText={setPassword}/>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleLogin()
            }}
            style={styles.button}>
            <Text style={{color: 'white'}}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signupTextContainer}>
            <Text style={styles.text}>Don't have account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={styles.clickableText}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(107,208,148)',
    justifyContent:'center',
    width: '100%',
    height: '100%',
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
  text: {
    color: 'white',
    fontWeight: '400',
    fontSize: 14,
  },
  ImageContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  signupTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  inputTextContainer: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
import React,{useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { useSelector } from 'react-redux';
import { userSelectorFull } from '../../Config/Redux/Selectors/UserSelector';
import { useDispatch } from 'react-redux';
import LoginDispatch from '../../Config/Redux/Dispatchers/LoginDispatch';
import { openDatabase } from 'react-native-sqlite-storage';
// import Toast from "react-native-simple-toast";

const db = openDatabase({ name: 'mydb.db' });

const Profile = ({navigation}) => {
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {token, name, email} = useSelector(state => userSelectorFull(state));

  const handleChangePassword = () => {
    // if (password === '')
    // {
    //     Toast.show("Enter New password")}
    // else{
        db.transaction((txn) => {
            txn.executeSql(' UPDATE users SET password = ? WHERE email = ?',[password, email],
            (_, result) => {
                if (result.rowsAffected > 0) {
                  console.log(result)
                  // Redirect to login screen after successful signup
                  // Toast.show("Password Updated")
                }
              })
        })
// }
  };

  return (
    <SafeAreaView backgroundColor="#fff">
      <StatusBar backgroundColor='#3DC173' />
      <View style={{backgroundColor: '#3DC173', height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{name? `Hey ${name}!` : 'John Doe'}</Text>
          </View>

          <View style={styles.cardContainer}>
            <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
              <Text>Your email ID is </Text>
            <Text>{email ? email : 'johndoe@gmail.com'}</Text>
            </View>
          </View>
<View style={{justifyContent:'center', alignItems:'center'}}>
<View style={{...styles.cardContainer, alignItems:'center'}}>
<TextInput style={styles.textInputBox} placeholder="New Password" 
        value={password}
        onChangeText={setPassword}/>
          <TouchableOpacity
            onPress={() => {
              handleChangePassword()
            }}
            style={styles.button}>
            <Text style={{color: 'white'}}>Change Password</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              dispatch(LoginDispatch('','','',''));
            }}
            style={{...styles.button, marginTop: 20}}>
            <Text style={{color: 'white'}}>Logout</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 230,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '100%',
  },
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    marginHorizontal: 40,
    marginTop: -100,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  dp: {width: 80, height: 80, borderRadius: 70, marginTop: -90},
  name: {fontWeight: '600', fontSize: 20, marginTop: 10},
  cardContainer: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 5,
    marginHorizontal: 40,
    marginTop: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  button: {
    backgroundColor: '#6A74CF',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // width: '50%',
    borderRadius: 40,
    padding: 10,
    marginTop: 20,
  },
  textInputBox: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 10,
    marginTop: 10,
  },
});

export default Profile;
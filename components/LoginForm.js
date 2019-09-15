import React, { useState }  from 'react';
import { 
  Text, 
  View,
  StyleSheet, 
  Button,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import { IdentifierForm } from '../components/IdentifierForm';

export function LoginForm(props) {

  const [text, onChangeText] = useState('Введите идентификатор ВТБ кошелька');

//   console.log("LoginForm");
//   console.log(props.cb);

  return (
    <View style={styles.view}>
        <View style={styles.welcomeImageView}>
          <View style={{height: 265, width: 200, flex: 1, alignItems: 'center', marginTop: 30}}>
          <Image
            resizeMode="stretch"
            source={require('../assets/images/login4.png')}
          />
          </View>
        </View>
        <IdentifierForm cb={props.cb}/>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    // flex: 1,
    backgroundColor: '#27A5D9',
    width: '100%',
    height: '100%',
  },
  header: {
    height: 50,
    width: '100%',
    backgroundColor: '#5759FF',
    color: 'red',

  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    width: '100%',
    color: 'white',
  },
  welcomeImageView: {
    justifyContent:'center',
    alignItems: 'center',
    height: 300,
  },
  textUnderImage: {
    textAlign: 'center',
    fontSize: 20,
    color: 'blue',
    height: 30,
  },
});
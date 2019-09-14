import React, { useState }  from 'react';
import { 
  Text, 
  View,
  StyleSheet, 
  Button,
  TextInput,
  Image,
} from 'react-native';

import { IdentifierForm } from '../components/IdentifierForm';

export function LoginForm(props) {

  const [text, onChangeText] = useState('Введите идентификатор ВТБ кошелька');

//   console.log("LoginForm");
//   console.log(props.cb);

  return (
    <View style={styles.view}>
        <View style={styles.header}>
            <Text style={styles.headerText}>
                TITLE
            </Text>
        </View>
        <View style={styles.welcomeImageView}>
          <Image
            source={require('../assets/images/login2.png')}
            style={styles.welcomeImage}
          />
          <Text style={styles.textUnderImage} > FRIENDCHECK </Text>
        </View>
        <IdentifierForm cb={props.cb}/>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    // flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    height: 50,
    width: '100%',
    // marginLeft: 20,
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
    height: 250,
  },
  welcomeImage: {
    // width: '50%',
    // height: '100%',
    marginTop: 50,
    // marginBottom: 50,
    alignSelf: 'center',
  },
  textUnderImage: {
    textAlign: 'center',
    fontSize: 20,
    color: 'blue',
    height: 30,
  },
});
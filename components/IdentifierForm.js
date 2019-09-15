import React, { useState }  from 'react';
import { 
  Text, 
  View,
  StyleSheet, 
  Button,
  TextInput,
  Alert
} from 'react-native';

import { checkTestInvoice, getInvoice, createTestInvoice, getAccountInfo, createSession, setUserId } from '../actions.js';
import { classBody } from '@babel/types';

export function IdentifierForm(props) {

  const [text, onChangeText] = useState('Введите идентификатор ВТБ кошелька');

  const onPressButton = () => {
    console.log("press button...");
    createSession((err, session) => {
      console.log("checking...");
      if (err)
        return console.log(err);
      console.log(text);
      getAccountInfo(session, text, (err, account) => {
        createTestInvoice(session, account.address, (err, res) => {
          checkTestInvoice(session, account.address, (err, status) => {
            console.log(err, status);
            console.log("status accept...");
            console.log(props.cb);
            setUserId(text);
            if (status)
              props.cb.navigate('Events');
            else
              Alert.alert(
                'Внимание',
                'Произведите оплату через кошелек ВТБ',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
            // setCheckin(false);
          })
        })
      })
    });
  };

  // console.log("IdentifierForm");
  // console.log(props.cb);

  return (
    
    <View style={styles.view}>
      <Text style={styles.headerText}>ID</Text>
      <TextInput {...props} style={styles.identifierText} onChangeText={text => onChangeText(text)} text={text} placeholder='Введите идентификатор ВТБ кошелька'/>
      <View style={styles.okButton}>
          <Button 
            onPress={onPressButton}
            title="OK"
            color="#5759FF"
          />
        </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent:'space-around',
    alignItems:'center',

  },
  headerText: {
    alignContent: 'flex-start',
    alignSelf:'flex-start',
    marginLeft: 20,
  },
  identifierText: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    color: 'red',
    borderColor: 'green',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    // fontFamily: 'space-mono',
    fontSize: 14,
    borderBottomWidth: 1,
    height: 20,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    textDecorationLine: 'none',
  },
  okButton: {
    width: '50%', 
    color: '#5759FF',
    margin: 10,
  },
});
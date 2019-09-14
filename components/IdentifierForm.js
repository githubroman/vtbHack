import React, { useState }  from 'react';
import { 
  Text, 
  View,
  StyleSheet, 
  Button,
  TextInput,
} from 'react-native';

export function IdentifierForm(props) {

  const [text, onChangeText] = useState('enter identifier');

  const onPressButton = () => {
    setText('update identifier');
  };

  return (
    <View style={styles.view}>
      <Text style={styles.headerText}>ID</Text>
      <TextInput {...props} style={styles.identifierText} onChangeText={text => onChangeText(text)} text={text} placeholder='enter identifier'/>
      <Button style={styles.okButton} title='OK' onPress={onPressButton}/>
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
    marginLeft: 16,
    borderColor: 'red',
    // backgroundColor: 'transparent',
    borderWidth: 1, 
    borderRadius: 3,
  },
  identifierText: {
    width: '100%',
    backgroundColor: '#fff',
    color: 'red',
    borderColor: 'green',
    backgroundColor: 'transparent',
    borderWidth: 1, 
    borderRadius: 3,
    borderStyle: 'solid',
    fontFamily: 'space-mono',
    fontSize: 14,
    // borderBottomWidth: ,
    height: 20,
    paddingLeft: 16,
  },
  okButton: {
    fontSize: 14,
    width: 50,
    height: 50,
    // textAlign: 'center',
  },
});
import React, {useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { IdentifierForm } from '../components/IdentifierForm';
import { LoginForm } from '../components/LoginForm';
import { checkTestInvoice, getInvoice, createTestInvoice, getAccountInfo, createSession } from '../actions.js';

export default function IdetifierScreen(props) {
  const [checkin, setCheckin] = useState(false);

  checkLogin = () => {
    setTimeout(() => {
      createSession((err, session) => {
        if (err)
          return console.log(err);

    getAccountInfo(session, 'chizhikov', (err, account) => {
      if (account){
      createTestInvoice(session, account.address, (err, res) => {
        checkTestInvoice(session, account.address, (err, status) => {
          if (err)
            console.log(err, status);
          console.log("First screen");
          setCheckin(false);
          clearInterval(interval);
        })
        })
      } else {
        console.log("account not exist");
        clearInterval(interval);
      }
      })
    })
    }, 1000);
  };

    const interval = setInterval(() => {
      {checkLogin()}
    }, 1000);

    const goLinksScreen = () => {
      props.navigation.navigate('Events');
    };

  return (
    <ScrollView style={styles.container}>

      <LoginForm cb={props.navigation}/>
      {/* { checkin ? goLinksScreen() : <LoginForm cb={props.navigation}/>} */}

    </ScrollView>
  );
}

IdetifierScreen.navigationOptions = {
  title: 'Login',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // paddingTop: 15,
    height: '100%',
    width:'100%',
    backgroundColor: '#27A5D9',
  },
});

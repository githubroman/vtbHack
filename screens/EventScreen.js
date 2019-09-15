import React, {useState} from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Meteor, { withTracker } from 'react-native-meteor';
import { getUserId, createPaymentInvoice, createSession, getAccountInfo, getAccountInfoByAddress } from '../actions.js';


const People = (props) => {
  return (
    <View style={{borderRadius: 50, backgroundColor: 'grey', width: 24, height: 24, margin: 5}}></View>
  )
}

const Product = (props) => {
  const addPeople = (i, peopleId) => {
    let newProducts = props.products;

    if (!newProducts[i].peoples)
      newProducts[i].peoples = [peopleId];
    else
      newProducts[i].peoples.push(peopleId);

    Meteor.call('events.updateOne', {
      _id: props.event._id,
      products: newProducts,
    });
  }
  const removePeople = (i, peopleId) => {
    let newProducts = props.products;

    if (newProducts[i].peoples.indexOf(peopleId) < 0)
      return;

    if (!newProducts[i].peoples)
      newProducts[i].peoples = [];
    else
      newProducts[i].peoples.splice(newProducts[i].peoples.indexOf(peopleId), 1);

    Meteor.call('events.updateOne', {
      _id: props.event._id,
      products: newProducts,
    });
  }
  return (
    <View style={{ 
      margin: 5,
      backgroundColor: '#ffffff',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 5,
      borderRadius: 5,
      shadowOpacity: 0.15,
      elevation: 3,
      padding: 15,
    }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Text style={{color: '#304547', fontSize: 17, lineHeight: 17}}>{props.count} x</Text>
        <Text style={{color: '#304547', fontSize: 17, lineHeight: 17}}>{props.name}</Text>
        <Text style={{color: '#304547', fontSize: 17, lineHeight: 17, fontWeight: 'bold'}}>{props.price}р</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10, flexWrap: 'wrap', minHeight: 34}}>
        {props.peoples && props.peoples.map((people, i) => <People key={i} {...people} />)}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => removePeople(props.index, getUserId())} style={{ height: 42, width: 42, borderRadius: 6, margin: 5, borderColor: '#EB5353', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{color: '#EB5353'}}>-</Text>
        </TouchableOpacity>
        <Text style={{color: '#304547', fontSize: 24, lineHeight: 24, marginLeft: 10, marginRight: 10}}>{props.peoples ? props.peoples.length : 0}</Text>
        <TouchableOpacity onPress={() => addPeople(props.index, getUserId())} style={{ height: 42, width: 42, borderRadius: 6, margin: 5, borderColor: '#25AA42', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{color: '#25AA42'}}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const EventScreen = function EventsScreen(props) {
  const [activity, setActivity] = useState(false);
  const [payEnable, setPayEnable] = useState(false);
  const peopleId = getUserId();
  const total = props.event && props.event.products.reduce((acc, cur) => {
    if (cur.peoples && cur.peoples.length) {
      const countP = cur.peoples.filter((people) => people == peopleId).length;
      return acc + cur.price / cur.peoples.length * countP;
    }
    else
      return acc;
  }, 0)

  createSession((err, session) => {
    if (err)
      return console.log(err) || setPayEnable(false);
    
    getAccountInfo(session, peopleId, (err, account) => {
      if (err)
        return console.log(err) || setPayEnable(false);
      console.log(account.address, props.event.owner)
      if (account.address !== props.event.owner)
        setPayEnable(true);
      else
        setPayEnable(false);
    })
  });


  const pay = (amount) => {
    setActivity(true);
    createSession((err, session) => {
      if (err)
        return console.log(err) || setActivity(false);
      
      getAccountInfo(session, peopleId, (err, account) => {
        if (err)
          return console.log(err) || setActivity(false);
      
        createPaymentInvoice(session, amount, { id: props.event.owner, address: props.event.owner }, account.address, (err, data) => {
          setActivity(false);
          Alert.alert(
            'Внимание',
            'Произведите оплату через кошелек ВТБ',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
        })
      })
    })
  }

  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      <ScrollView style={styles.container}>
        {props.event && props.event.products.map((product, i) => <Product key={i} index={i} event={props.event} products={props.event.products} {...product} />)}
      </ScrollView>
      <View style={{height: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: '#5759FF', padding: 20}}>
        <Text style={{fontSize: 20, color: '#304547'}}>{total} р</Text>

        {!activity && payEnable ? 
          <TouchableOpacity onPress={() => pay(total)} style={{ height: 42, borderRadius: 50, margin: 5, padding: 10, borderColor: '#25AA42', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color: '#25AA42'}}>Оплатить</Text>
          </TouchableOpacity> :

          !activity && !payEnable ? <TouchableOpacity onPress={() => props.navigation.navigate('Events')} style={{ height: 42, borderRadius: 50, margin: 5, padding: 10, borderColor: '#25AA42', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color: '#25AA42'}}>Просмотр операция</Text>
          </TouchableOpacity> : <ActivityIndicator size="large" color="#0000ff" />
        }
      </View>
    </View>
  );
}

export default withTracker(params => {
  return {
    event: Meteor.collection('events').findOne({_id: params.navigation.getParam('_id')}, { sort: { createdAt: -1} }),
  };
})(EventScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

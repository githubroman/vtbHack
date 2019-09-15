import React, {useState} from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Meteor, { withTracker } from 'react-native-meteor';
import { getUserId, createInvoice, createSession, getAccountInfo } from '../actions.js';


const PeopleInfo = (props) => {
  return (
    <View style={{borderRadius: 50, backgroundColor: 'grey', width: 24, height: 24, margin: 5}}>
      <Text style={{width: '80%', height: 24, padding: 20}}>{props.event.name}</Text>
      <Text style={{width: '80%', height: 24, padding: 20}}>..................</Text>
      <View style={{width: '80%', height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{width: 250, height: 24, padding: 20, alignSelf: 'flex-start'}}>{props.event && props.event.products && props.event.products.name}</Text>
        <Text style={{width: 150, height: 24, padding: 20, alignSelf: 'flex-end'}}>count x {props.event && props.event.products && props.event.products.price} p</Text>
      </View>
      <Text style={{width: '80%', height: 24, padding: 20}}>..................</Text>
      <Text style={{width: '80%', height: 24, padding: 20}}>Всего {props.event.total} p</Text>
    </View>
  )
}

const People = (props) => {
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
        {props.peoples && props.peoples.map((people, i) => <PeopleInfo key={i} {...people} />)}
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


const HistoryEventScreen = function HistoryEventScreen(props) {
  // const [activity, setActivity] = useState(false);
  const peopleId = getUserId();
  const total = props.event && props.event.products && props.event.products.reduce((acc, cur) => {
    if (cur.peoples && cur.peoples.length) {
      const countP = cur.peoples.filter((people) => people == peopleId).length;
      return acc + cur.price / cur.peoples.length * countP;
    }
    else
      return acc;
  }, 0)

  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      <ScrollView style={styles.container}>
      {<PeopleInfo event={props.event} products={props.event && props.event.products} {...product} />}
        {/* {props.event && props.event.products.map((product, i) => <People key={i} index={i} event={props.event} products={props.event.products} {...product} />)} */}
      </ScrollView>
      <View style={{height: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: '#5759FF', padding: 20}}>
        <Text style={{fontSize: 20, color: '#000000', alignItems: 'center'}}>ПОЛУЧЕНО</Text>
        <Text style={{fontSize: 20, color: '#304547', alignItems: 'center'}}>{total} р</Text>
      </View>
    </View>
  );
}

export default withTracker(params => {
  return {
    event: Meteor.collection('events').findOne({_id: params.navigation.getParam('_id')}, { sort: { createdAt: -1} }),
  };
})(HistoryEventScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

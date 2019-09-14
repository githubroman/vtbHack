import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Meteor, { withTracker } from 'react-native-meteor';


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
        <Text style={{color: '#304547', fontSize: 14, lineHeight: 17}}>{props.count} x</Text>
        <Text style={{color: '#304547', fontSize: 14, lineHeight: 17}}>{props.name}</Text>
        <Text style={{color: '#304547', fontSize: 14, lineHeight: 17, fontWeight: 'bold'}}>{props.price}р</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10, flexWrap: 'wrap'}}>
        {props.peoples && props.peoples.map((people, i) => <People key={i} {...people} />)}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => removePeople(props.index, 'asd')} style={{ height: 22, width: 22, borderRadius: 2, margin: 5, borderColor: '#EB5353', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{color: '#EB5353'}}>-</Text>
        </TouchableOpacity>
        <Text style={{color: '#304547', fontSize: 16, lineHeight: 19}}>0</Text>
        <TouchableOpacity onPress={() => addPeople(props.index, 'asd')} style={{ height: 22, width: 22, borderRadius: 2, margin: 5, borderColor: '#25AA42', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{color: '#25AA42'}}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const EventScreen = function EventsScreen(props) {
  return (
    <ScrollView style={styles.container}>
      {props.event && props.event.products.map((product, i) => <Product key={i} index={i} event={props.event} products={props.event.products} {...product} />)}
    </ScrollView>
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

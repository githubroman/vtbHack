import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Meteor, { withTracker } from 'react-native-meteor';


const Event = (props) => {
  const sum = props.products ? props.products.reduce((acc, cur) => acc + cur.price, 0) : 0;
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('Event', { _id: props._id }) } style={{ height: 216, backgroundColor: '#5759FF', borderRadius: 5, margin: 5, flex: 1, minWidth: 150 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignContent: 'center' }}>
          <Text style={{ fontSize: 14, lineHeight: 24, color: 'white' }}>12 чел.</Text>
          <Text style={{ fontSize: 16, lineHeight: 24, fontWeight: '500', color: 'white' }}>{sum} ₽</Text>
        </View>
        <View style={{ height: 80, backgroundColor: 'rgba(255, 255, 255, 0.7)', justifyContent: 'center', paddingLeft: 16, paddingRight: 16 }}>
          <Text style={{ fontSize: 16, lineHeight: 24, color: 'white' }}>{props.place ? props.place : 'Тестовое событие'}</Text>
          <Text style={{ fontSize: 14, lineHeight: 20, color: 'rgba(255, 255, 255, 0.7);' }}>22:00 - 21.02.19</Text>
        </View>
    </TouchableOpacity>
    
  )
}

const EventsScreen = function EventsScreen(props) {
  const addEvent = () => {
    props.navigation.navigate('AddEvent')
  }
  return (
    <View style={{ justifyContent: 'space-between', flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {props.events.map((event) => {
            return <Event key={event._id} navigation={props.navigation} {...event} />
          })}
        </View>
      </ScrollView>
      <View style={{ backgroundColor: '#5759FF', borderTopColor: 'white', borderTopWidth: 4, height: 60 }}>

      </View>
      
        <View style={{ backgroundColor: '#5759FF', borderRadius: 50, borderWidth: 8, borderColor: 'white', height: 56, width: 56, position: 'absolute', right: 16, bottom: 28, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={addEvent}>
            <Text style={{color: 'white', fontSize: 26 }}>+</Text>
          </TouchableOpacity>
        </View>
      
    </View>
  );
}

export default withTracker(params => {
  return {
    events: Meteor.collection('events').find({}, { sort: { createdAt: -1} }),
  };
})(EventsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

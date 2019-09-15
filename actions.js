import React from 'react';
import Constants from 'expo-constants';
import axios from 'axios';
import * as Crypto from 'expo-crypto';
import Meteor, { withTracker } from 'react-native-meteor';


const apiUrl = 'http://89.208.84.235:31080';
const baseRecipientAddress = '605ae7d65981c8df1c53895f56a21dc4b5eb4ec8';

let userId = '';
export const setUserId = (id) => {
  userId = id;
}
export const getUserId = () => {
  return userId;
}

export const createSession = (cb) => {
  axios({
    method: 'POST',
    url: `${apiUrl}/api/v1/session`,
    data: {
      "addresses": [],
      "deviceId": Constants.deviceName,
      "deviceType": Constants.platform === 'android' ? 1 : 0
    },
  }).then((response) => response.data).then((session) => {
    if (session.data)
      cb(null, session.data);
    else
      cb(new Error('Session field is empty'));
  }).catch((err) => cb(err, null))
}

export const createIdentifierHash = async (identifier, cb) => {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    identifier
  );
  cb(null, digest);
}

export const getAccountInfo = (session, identifier, cb) => {
  createIdentifierHash(identifier, (err, hash) => {
    if (err)
      return cb(err);

    axios({
      url: `${apiUrl}/api/v1/account/identifier/${hash}`,
      headers: {'FPSID': session}
    }).then((response) => response.data).then((account) => {
      if (account.data)
        cb(null, account.data);
      else
        cb(new Error('Account field is empty'));
    }).catch((err) => cb(err, null))
  });
}

export const createInvoice = (session, amount, currencyCode, number, description, payer, recipient, cb) => {
  axios({
    method: 'POST',
    url: `${apiUrl}/api/v1/invoice`,
    headers: {'FPSID': session},
    data: {
      amount,
      currencyCode, 
      description, 
      number, 
      payer, 
      recipient
    },
  }).then((response) => response.data).then((session) => {
    if (session.data)
      cb(null, session.data);
    else
      cb(new Error('Session field is empty'));
  }).catch((err) => cb(err, null))
}

export const getInvoice = (session, currencyCode, number, recipient, cb) => {
  axios({
    url: `${apiUrl}/api/v1/invoice/${currencyCode}/${number}/${recipient}`,
    headers: { 'FPSID': session },
  }).then((response) => response.data).then((invoice) => {
    if (invoice.data)
      cb(null, invoice.data);
    else
      cb(new Error('Invoice field is empty'));
  }).catch((err) => cb(err, null))
}

export const createTestInvoice = (session, payer, cb) => {
  if (!Meteor.status().connected)
    return cb(new Error('Backend is disconnected'));

  if (Meteor.collection('testInvoices').find({ payer }).length)
    return cb(new Error('Test invoice is already created'));

  const randNumber = 'Test invoice ' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const currentCode = 810;
  createInvoice(session, 0.01, currentCode, randNumber, 'Please pay invoice', payer, baseRecipientAddress, (err, invoice) => {
    if (err)
      return cb(err);

    Meteor.call('testInvoices.addOne', {
      payer,
      currentCode,
      number: randNumber,
      recipient: baseRecipientAddress,
      status: 'waiting',
      txId: invoice.txId,
      createdAt: new Date(),
    }, (err, _id) => {
      cb(err, { 
        _id, 
        payer,
        currentCode,
        number: randNumber,
        recipient: baseRecipientAddress,
        txId: invoice.txId,
      });
    });
  });
}

export const checkTestInvoice = (session, payer, cb) => {
  if (!Meteor.status().connected)
    return cb(new Error('Backend is disconnected'));

  if (!Meteor.collection('testInvoices').find({ payer }).length)
    return cb(new Error('Test invoice is not created'));

  const testInvoice = Meteor.collection('testInvoices').findOne({ payer });
  if (testInvoice.status == 'waiting')
    getInvoice(session, testInvoice.currentCode, testInvoice.number, testInvoice.recipient, (err, invoice) => {
      if (err)
        return cb(err);

      if (invoice.state !== 1)
        Meteor.call('testInvoices.updateOne', {
          _id: testInvoice._id,
          status: 'completed',
        }, (err, _id) => {
          cb(err, true);
        });
      else
        cb(null, false);
    })
  else
    cb(null, true);
}

export const createEvent = (_id, place, products, cb) => {
  if (!Meteor.collection('events').find({ _id }).length)
    Meteor.call('events.addOne', {
      _id,
      place,
      products,
      createdAt: new Date(),
    }, (err, _id) => {
      cb(err, _id);
    });
  else
    cb(null, _id)
}


import React from 'react';
import Constants from 'expo-constants';
import axios from 'axios';

const apiUrl = 'http://89.208.84.235:31080';

export const createSession = (cb) => {
  axios({
    method: 'POST',
    url: `${apiUrl}/api/v1/session`,
    data: {
      "addresses": [],
      "deviceId": Constants.deviceName,
      "deviceType": Constants.platform === 'android' ? 1 : 0
    },
  }).then((response) => response.data).then((conversation) => {
    cb(null, conversation);
  }).catch((err) => cb(err, null))
}
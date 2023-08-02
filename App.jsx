import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import {
  requestUserPermission,
  getFCMToken,
} from './src/utils/pushnotification_helper';

const App = () => {
  const [text, setText] = useState('');

  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {}
    }
  };

  useEffect(() => {
    checkApplicationPermission();
    requestUserPermission();
    getFCMToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setText(
        'A new FCM message arrived! Foreground\n' +
          JSON.stringify(remoteMessage.notification, null, 2),
      );
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      setText(
        'Notification caused app to open from background state:\n' +
          JSON.stringify(remoteMessage.notification, null, 2),
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          setText(
            'Notification caused app to open from quit state:\n' +
              JSON.stringify(remoteMessage.notification, null, 2),
          );
        }
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2b3423',
      }}>
      <Text style={{color: 'orange', fontSize: 40, fontWeight: 'bold'}}>
        Push Notification
      </Text>
      <Text
        style={{
          textAlign: 'center',
        }}>
        {text}
      </Text>
    </View>
  );
};

export default App;

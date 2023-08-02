import React from 'react';
import {View, Text} from 'react-native';

const App = () => {
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
    </View>
  );
};

export default App;

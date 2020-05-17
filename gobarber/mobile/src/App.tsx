import React from 'react';
import { View, StatusBar } from 'react-native';

import Routes from './routes';

import colors from './colors';

const App: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.black }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      <Routes />
    </View>
  );
};

export default App;

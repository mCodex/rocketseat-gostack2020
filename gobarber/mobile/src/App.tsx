import React from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Routes from './routes';

import AppProvider from './hooks';
import colors from './colors';

const App: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.black }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      <SafeAreaProvider>
        <AppProvider>
          <Routes />
        </AppProvider>
      </SafeAreaProvider>
    </View>
  );
};

export default App;

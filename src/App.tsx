import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import Home from './screens/Home';
import { appBackground } from './styles/colors';

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Home />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appBackground,
  },
});

export default App;

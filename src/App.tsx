import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import Home from './screens/Home';
import { appBackground } from './styles/colors';
import { getMaxHR, getWeekData, initHealthKit } from './lib/health';
import { HealthItem } from './types/health';

const App = () => {
  const [data, setData] = useState<HealthItem[]>([]);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    initHealthKit()
      .then(() => getMaxHR())
      .then(() => getWeekData())
      .then((res) => {
        setData(res);
        RNBootSplash.hide({ fade: true });
      })
      .catch((err) => setError(err));
  }, []);

  const refresh = () => {
    setLoading(true);
    getWeekData()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {!!data.length && !error && (
          <Home data={data} refresh={refresh} loading={loading} />
        )}
        {!!error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>An error has occurred:</Text>
            <Text style={styles.errorText}>{error.message}</Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appBackground,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 15,
  },
});

export default App;

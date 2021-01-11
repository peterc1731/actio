import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import Home from './screens/Home';
import { appBackground } from './styles/colors';
import { getMaxHR, getWeekData, initHealthKit } from './lib/health';
import { HealthItem } from './types/health';
import Start from './screens/Start';
import ErrorScreen from './screens/Error';
import { isSetUp, setUp } from './lib/persist';

const App = () => {
  const [data, setData] = useState<HealthItem[]>([]);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const init = async () => {
    try {
      await initHealthKit();
      await getMaxHR();
      const res = await getWeekData();
      setData(res);
      setReady(true);
      RNBootSplash.hide({ fade: true });
    } catch (err) {
      setError(err);
      RNBootSplash.hide({ fade: true });
    }
  };

  useEffect(() => {
    isSetUp().then((set) => {
      if (set) {
        init();
      } else {
        RNBootSplash.hide({ fade: true });
      }
    });
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

  const completeSetup = () => {
    init().then(() => setUp());
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {!!data.length && !error && ready && (
          <Home data={data} refresh={refresh} loading={loading} />
        )}
        {!!error && <ErrorScreen message={error.message} />}
        {!ready && !error && <Start onPress={completeSetup} />}
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

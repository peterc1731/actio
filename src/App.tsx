import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import Home from './screens/Home';
import { useTheme } from './styles/styles';
import { getMaxHR, getWeekData, initHealthKit } from './lib/health';
import { HealthItem } from './types/health';
import Start from './screens/Start';
import ErrorScreen from './screens/Error';
import { isSetUp, setUp } from './lib/persist';
import { useForegrounded } from './lib/hooks';
import { initNotifications } from './lib/notifications';
import { setUpBackgroundUpdates } from './lib/background';
import { initTracking, trackEvent } from './lib/tracking';
import { shouldIgnore } from './lib/errors';

const App = () => {
  const [data, setData] = useState<HealthItem[]>([]);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const init = async () => {
    try {
      await initTracking();
      await initHealthKit();
      await getMaxHR();
      const res = await getWeekData();
      initNotifications();
      setUpBackgroundUpdates();
      trackEvent('init');
      setData(res);
      setReady(true);
    } catch (err) {
      trackEvent('error', { message: err.message });
      if (!shouldIgnore(err)) {
        setError(err);
      } else {
        setReady(true);
      }
    }
    RNBootSplash.hide({ fade: true });
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
    trackEvent('manual_refresh');
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

  const silentRefresh = () => {
    trackEvent('automatic_refresh');
    getWeekData()
      .then((res) => {
        setData(res);
      })
      .catch(() => {});
  };

  const completeSetup = () => {
    init().then(() => setUp());
  };

  useForegrounded(silentRefresh);

  const { appBackground } = useTheme();
  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView
        style={[styles.container, { backgroundColor: appBackground }]}>
        {!error && ready && (
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
  },
});

export default App;

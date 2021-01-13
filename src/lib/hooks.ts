import { useCallback, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export const useForegrounded = (handler: () => void) => {
  const appState = useRef(AppState.currentState);
  const onForeground = useCallback(() => handler(), [handler]);

  useEffect(() => {
    const _handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        onForeground();
      }

      appState.current = nextAppState;
    };

    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [onForeground]);
};

import { Mixpanel, MixpanelClient } from 'mixpanel-react-native';

let mp: MixpanelClient;

type Event =
  | 'run_background_activity'
  | 'background_activity_points'
  | 'send_daily_progress_notification'
  | 'send_daily_max_notification'
  | 'send_weekly_max_notification'
  | 'manual_refresh'
  | 'automatic_refresh'
  | 'init'
  | 'error';

export const initTracking = async () => {
  mp = await Mixpanel.init('d625e123dae5dcf1caede4b250983078');
  mp.serverUrl = 'https://api-eu.mixpanel.com';
};

export const trackEvent = (name: Event, data?: any) => {
  if (!mp) {
    throw new Error('tracking not initialised!');
  }
  mp.track(name, data);
};

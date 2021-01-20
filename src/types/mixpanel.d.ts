declare module 'mixpanel-react-native' {
  interface MixpanelClient {
    serverUrl: string;
    track: (name: string, data: any) => void;
  }
  export const Mixpanel: {
    init: (id: string) => Promise<MixpanelClient>;
  };
}

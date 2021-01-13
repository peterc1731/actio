import ReactNative from 'react-native';
import { useTheme } from './styles';

jest.mock('react-native');

describe('useTheme', () => {
  it('should return the light theme when in light mode', () => {
    ReactNative.useColorScheme = jest.fn(() => 'light');
    const theme = useTheme();
    expect(theme.appBackground).toEqual('#FFFFFF');
    expect(theme.brandAccent).toEqual('#CAA6D6');
  });

  it('should return the dark theme when in dark mode', () => {
    ReactNative.useColorScheme = jest.fn(() => 'dark');
    const theme = useTheme();
    expect(theme.appBackground).toEqual('#151515');
    expect(theme.brandAccent).toEqual('#CAA6D6');
  });
});

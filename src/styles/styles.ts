import { useColorScheme } from 'react-native';

const theme = <const>{
  fontStandard: ['#4B5261', '#DADADA'],
  brandPrimary: '#BD1F2E',
  appBackground: ['#FFFFFF', '#151515'],
  brandBackground: ['#FAF7F3', '#252525'],
  brandAccent: '#CAA6D6',
  brandAccentLight: '#CAA6D650',
  error: 'red',
};

type Color = keyof typeof theme;

type Theme = { [key in Color]: string };

export const useTheme = (): Theme => {
  const scheme = useColorScheme();
  const i = scheme === 'light' ? 0 : 1;
  return (Object.keys(theme) as Color[])
    .map((key) =>
      Array.isArray(theme[key]) ? [key, theme[key][i]] : [key, theme[key]],
    )
    .reduce(
      (acc, [key, color]) => ({ ...acc, [key as string]: color }),
      {} as Theme,
    );
};

export const useShadows = () => {
  const scheme = useColorScheme();
  return scheme === 'light'
    ? {
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 2,
        shadowOpacity: 0.1,
      }
    : {};
};

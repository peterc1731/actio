import AsyncStorage from '@react-native-async-storage/async-storage';

export const isSetUp = async () => {
  try {
    const value = await AsyncStorage.getItem('actio-setup');
    return !!value;
  } catch (e) {
    return false;
  }
};

export const setUp = async () => {
  await AsyncStorage.setItem('actio-setup', 'true');
};

import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../styles/styles';

interface Props {
  onPress: () => void;
}

function Start({ onPress }: Props) {
  const { brandPrimary, fontStandard } = useTheme();
  return (
    <View style={styles.centered}>
      <Image
        style={styles.logo}
        source={require('../../assets/bootsplash_logo.png')}
      />
      <Text style={[styles.permText, { color: fontStandard }]}>
        Smart tracking for active people.
      </Text>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.6 : 1, backgroundColor: brandPrimary },
        ]}
        onPress={onPress}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  permText: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 40,
    marginTop: 60,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 12,
  },
  logo: {
    width: 220,
    height: 40,
  },
});

export default Start;

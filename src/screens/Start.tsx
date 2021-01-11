import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { brandPrimary, fontStandard } from '../styles/colors';

interface Props {
  onPress: () => void;
}

function Start({ onPress }: Props) {
  return (
    <View style={styles.centered}>
      <Text style={styles.permText}>
        First, you'll have to grant permissions to access your health data.
      </Text>
      <Pressable
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.6 : 1 }]}
        onPress={onPress}>
        <Text style={styles.buttonText}>Continue</Text>
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
    color: fontStandard,
    fontSize: 21,
    fontWeight: '400',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: brandPrimary,
  },
});

export default Start;

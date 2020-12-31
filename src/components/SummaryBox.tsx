import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { brandBackground, fontStandard } from '../styles/colors';

export default function SummaryBox() {
  return (
    <View style={styles.container}>
      <Text style={styles.h2}>Summary</Text>
      <Text style={styles.h1}>8 points gained by walking</Text>
      <Text style={styles.h3}>You've reached your daily goal.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: brandBackground,
    borderRadius: 10,
    shadowColor: fontStandard,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1,
  },
  h1: {
    color: fontStandard,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  h2: {
    color: fontStandard,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
  h3: {
    color: fontStandard,
    fontSize: 12,
  },
});

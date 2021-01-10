import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { brandBackground, fontStandard } from '../styles/colors';

interface Props {
  workoutPoints: number;
  stepsPoints: number;
  steps: number;
}

export default function SummaryBox({
  workoutPoints,
  stepsPoints,
  steps,
}: Props) {
  const largestPoints =
    stepsPoints > workoutPoints ? stepsPoints : workoutPoints;
  return (
    <View style={styles.container}>
      <Text style={styles.h2}>Today</Text>
      <Text style={styles.h1}>
        {largestPoints} points gained by{' '}
        {stepsPoints > workoutPoints ? 'walking' : 'workout'}
      </Text>
      <Text style={styles.h3}>
        {largestPoints === 8
          ? "You've reached your daily goal."
          : `${12500 - steps} more steps to reach your daily goal`}
      </Text>
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
    marginBottom: 30,
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

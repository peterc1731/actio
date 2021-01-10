import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatSteps } from '../lib/format';
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
  const title =
    largestPoints > 0
      ? `${largestPoints} points gained by ${
          stepsPoints > workoutPoints ? 'walking' : 'workout'
        }`
      : '0 points gained';
  return (
    <View style={styles.container}>
      <Text style={styles.h2}>Today</Text>
      <Text style={styles.h1}>{title}</Text>
      <Text style={styles.h3}>
        {largestPoints === 8
          ? "You've reached your daily goal."
          : `${formatSteps(
              12500 - steps,
            )} more steps or 30 mins of high intensity workout to reach your daily goal`}
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
    shadowRadius: 2,
    shadowOpacity: 0.1,
    marginVertical: 30,
    marginHorizontal: 30,
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

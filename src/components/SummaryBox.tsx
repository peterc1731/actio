import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatSteps } from '../lib/format';
import { useShadows, useTheme } from '../styles/styles';

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
  const { brandBackground, fontStandard } = useTheme();
  const shadow = useShadows();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: brandBackground,
          shadowColor: fontStandard,
          ...shadow,
        },
      ]}>
      <Text style={[styles.h2, { color: fontStandard }]}>Today</Text>
      <Text style={[styles.h1, { color: fontStandard }]}>{title}</Text>
      <Text style={[styles.h3, { color: fontStandard }]}>
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
    borderRadius: 10,
    marginVertical: 30,
    marginHorizontal: 30,
  },
  h1: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  h2: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
  h3: {
    fontSize: 12,
  },
});

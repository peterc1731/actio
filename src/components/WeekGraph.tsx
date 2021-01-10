import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { days, formatWeekRange } from '../lib/format';
import {
  brandAccent,
  brandBackground,
  fontStandard,
  brandAccentLight,
} from '../styles/colors';
import { HealthItem } from '../types/health';

interface Props {
  data: HealthItem[];
}

export default function WeekGraph({ data }: Props) {
  const total = data.reduce(
    (acc, val) =>
      acc +
      (val.stepsPoints > val.workoutPoints
        ? val.stepsPoints
        : val.workoutPoints),
    0,
  );
  const weeklyTotal = total > 40 ? 40 : total;
  return (
    <View style={styles.container}>
      <Text style={styles.h2}>
        {formatWeekRange(data[data.length - 1].date)}
      </Text>
      <Text style={styles.h1}>{weeklyTotal} points</Text>
      <View style={styles.barsContainer}>
        {days.map((day, index) => {
          const val = data[data.length - 1 - index] || {};
          const points =
            val.stepsPoints > val.workoutPoints
              ? val.stepsPoints
              : val.workoutPoints;
          return (
            <View style={styles.barContainer} key={`bar-${day}`}>
              <View
                style={[
                  styles.barBackground,
                  { height: points !== undefined ? 100 : 0 },
                ]}>
                <View
                  style={[
                    styles.bar,
                    { height: points ? (points / 8) * 100 : 2 },
                  ]}
                />
              </View>
              <Text style={styles.day}>{day.charAt(0).toUpperCase()}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
    marginHorizontal: 30,
  },
  h1: {
    color: fontStandard,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
  },
  h2: {
    color: fontStandard,
    fontSize: 14,
    fontWeight: '500',
  },
  day: {
    color: fontStandard,
    fontSize: 16,
    marginTop: 10,
  },
  barsContainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
  barContainer: {
    flex: 1,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: brandAccent,
  },
  barBackground: {
    position: 'relative',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: brandAccentLight,
    width: '100%',
  },
});

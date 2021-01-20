import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { days, formatWeekRange } from '../lib/format';
import { useShadows, useTheme } from '../styles/styles';
import { HealthItem } from '../types/health';

interface Props {
  data: HealthItem[];
}

export default function WeekGraph({ data }: Props) {
  const total = data.reduce(
    (acc, val) => acc + Math.max(val.stepsPoints, val.workoutPoints),
    0,
  );
  const weeklyTotal = total > 40 ? 40 : total;
  const {
    brandAccent,
    brandBackground,
    fontStandard,
    brandAccentLight,
  } = useTheme();
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
      <Text style={[styles.h2, { color: fontStandard }]}>
        {formatWeekRange(data[data.length - 1]?.date)}
      </Text>
      <Text style={[styles.h1, { color: fontStandard }]}>
        {weeklyTotal} points
      </Text>
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
                  {
                    backgroundColor:
                      points !== undefined ? brandAccentLight : 'transparent',
                  },
                ]}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: points ? (points / 8) * 100 : 2,
                      backgroundColor: brandAccent,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.day, { color: fontStandard }]}>
                {day.charAt(0).toUpperCase()}
              </Text>
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
    borderRadius: 10,
    marginHorizontal: 30,
  },
  h1: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
  },
  h2: {
    fontSize: 14,
    fontWeight: '500',
  },
  day: {
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
  },
  barBackground: {
    position: 'relative',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: '100%',
    height: 100,
  },
});

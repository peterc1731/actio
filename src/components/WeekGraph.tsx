import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  brandAccent,
  brandBackground,
  fontStandard,
  brandAccentLight,
} from '../styles/colors';

export default function WeekGraph() {
  const points = [
    { day: 'Monday', points: 8 },
    { day: 'Tuesday', points: 5 },
    { day: 'Wednesday', points: 3 },
    { day: 'Thursday', points: undefined },
    { day: 'Friday', points: undefined },
    { day: 'Saturday', points: undefined },
    { day: 'Sunday', points: undefined },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.h2}>21 - 27 DEC 2020</Text>
      <Text style={styles.h1}>16 points</Text>
      <View style={styles.barsContainer}>
        {points.map((val) => (
          <View style={styles.barContainer} key={`bar-${val.day}`}>
            <View
              style={[
                styles.barBackground,
                { height: val.points !== undefined ? 100 : 0 },
              ]}>
              <View
                style={[
                  styles.bar,
                  { height: val.points ? (val.points / 8) * 100 : 2 },
                ]}
              />
            </View>
            <Text style={styles.day}>{val.day.charAt(0).toUpperCase()}</Text>
          </View>
        ))}
      </View>
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

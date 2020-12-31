import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fontStandard } from '../styles/colors';

export default function TodayList() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TODAY</Text>
      <View style={styles.row}>
        <Text style={styles.body}>14,000 steps</Text>
        <Text style={styles.body}>8 pts</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.body}>30 minutes medium intensity workout</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  heading: {
    fontSize: 12,
    color: fontStandard,
  },
  body: {
    fontSize: 14,
    fontWeight: '500',
    color: fontStandard,
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

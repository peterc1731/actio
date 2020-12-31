import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { fontStandard } from '../styles/colors';

export default function WeekList() {
  const data = [
    { title: 'TODAY', data: [{ text: '6,500 steps', points: 3 }] },
    {
      title: 'YESTERDAY',
      data: [
        { text: '30 minutes medium intensity workout', points: 5 },
        { text: '1,500 steps' },
      ],
    },
    {
      title: '21 DEC 2020',
      data: [
        { text: '30 minutes high intensity workout', points: 8 },
        { text: '1,500 steps' },
      ],
    },
  ];
  return (
    <View style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item) => item.text}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.body}>{item.text}</Text>
            {item.points || item.points === 0 ? (
              <Text style={styles.body}>{item.points} pts</Text>
            ) : null}
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.heading}>{title}</Text>
        )}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 10,
    flex: 1,
  },
  heading: {
    marginTop: 20,
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

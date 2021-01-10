import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { formatDate, formatSteps, getWorkoutText } from '../lib/format';
import { fontStandard } from '../styles/colors';
import { HealthItem } from '../types/health';

interface Props {
  data: HealthItem[];
}

export default function WeekList({ data }: Props) {
  const sections = data.map((item) => {
    const title = formatDate(item.date);
    if (item.workoutPoints === 0) {
      return {
        title,
        data: [
          {
            points: item.stepsPoints,
            text: `${formatSteps(item.steps)} steps`,
          },
        ],
      };
    }
    if (item.workoutPoints >= item.stepsPoints) {
      return {
        title,
        data: [
          {
            points: item.workoutPoints,
            text: getWorkoutText(item.workoutPoints),
          },
          {
            text: `${formatSteps(item.steps)} steps`,
          },
        ],
      };
    }
    return {
      title,
      data: [
        {
          points: item.stepsPoints,
          text: `${formatSteps(item.steps)} steps`,
        },
        {
          text: getWorkoutText(item.workoutPoints),
        },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
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

import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { formatDate, formatSteps, getWorkoutText } from '../lib/format';
import { useTheme } from '../styles/styles';
import { HealthItem } from '../types/health';

interface Props {
  data: HealthItem[];
  header: React.ReactElement;
  refresh: () => void;
  loading: boolean;
}

export default function WeekList({ data, header, refresh, loading }: Props) {
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

  const { fontStandard } = useTheme();
  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.text}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.body, { color: fontStandard }]}>
              {item.text}
            </Text>
            {item.points || item.points === 0 ? (
              <Text style={[styles.body, { color: fontStandard }]}>
                {item.points} pts
              </Text>
            ) : null}
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[styles.heading, { color: fontStandard }]}>{title}</Text>
        )}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={header}
        onRefresh={refresh}
        refreshing={loading}
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
    marginHorizontal: 30,
    fontSize: 12,
  },
  body: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 15,
  },
  row: {
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

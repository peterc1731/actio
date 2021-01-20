import React from 'react';
import { StyleSheet, View } from 'react-native';
import SummaryBox from '../components/SummaryBox';
import WeekGraph from '../components/WeekGraph';
import WeekList from '../components/WeekList';
import { HealthItem } from '../types/health';

interface Props {
  data: HealthItem[];
  refresh: () => void;
  loading: boolean;
}

const Home = ({ data, refresh, loading }: Props) => {
  const today = data[0] || {
    workoutPoints: 0,
    stepsPoints: 0,
    steps: 0,
  };
  return (
    <View style={styles.container}>
      <WeekList
        data={data}
        refresh={refresh}
        loading={loading}
        header={
          <>
            <SummaryBox
              workoutPoints={today.workoutPoints}
              stepsPoints={today.stepsPoints}
              steps={today.steps}
            />
            <WeekGraph data={data} />
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;

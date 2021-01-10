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
  return data.length ? (
    <View style={styles.container}>
      <WeekList
        data={data}
        refresh={refresh}
        loading={loading}
        header={
          <>
            <SummaryBox
              workoutPoints={data[0].workoutPoints}
              stepsPoints={data[0].stepsPoints}
              steps={data[0].steps}
            />
            <WeekGraph data={data} />
          </>
        }
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;

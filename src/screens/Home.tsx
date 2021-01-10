import React from 'react';
import { StyleSheet, View } from 'react-native';
import SummaryBox from '../components/SummaryBox';
import WeekGraph from '../components/WeekGraph';
import WeekList from '../components/WeekList';
import { getWeekData } from '../lib/health';

const Home = () => {
  const data = getWeekData();
  return (
    <View style={styles.container}>
      <SummaryBox
        workoutPoints={data[0].workoutPoints}
        stepsPoints={data[0].stepsPoints}
        steps={data[0].steps}
      />
      <WeekGraph data={data} />
      <WeekList data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 30,
    flex: 1,
  },
});

export default Home;

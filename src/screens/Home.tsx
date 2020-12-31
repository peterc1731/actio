import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SummaryBox from '../components/SummaryBox';
import TimeNav from '../components/TimeNav';
import TodayList from '../components/TodayList';
import WeekGraph from '../components/WeekGraph';
import WeekList from '../components/WeekList';

const Today = () => {
  return (
    <View style={styles.container}>
      <SummaryBox />
      <TodayList />
    </View>
  );
};

const Week = () => {
  return (
    <View style={styles.container}>
      <WeekGraph />
      <WeekList />
    </View>
  );
};

const Home = () => {
  const [selected, setSelected] = useState('Today');
  return (
    <TimeNav
      options={['Today', 'Week']}
      selected={selected}
      onSelect={setSelected}
      screens={[<Today />, <Week />]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    flex: 1,
  },
});

export default Home;

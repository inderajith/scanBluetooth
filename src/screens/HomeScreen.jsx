import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import HomeCard from '../components/HomeCard';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <HomeCard title="Teacher" image={require('../images/teacher.png')} />
      <HomeCard title="Student" image={require('../images/student.png')} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: '40%',
  },
});

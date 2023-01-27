import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import HomeCard from '../components/HomeCard';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../images/bluecheck.png')}
        resizeMode="contain"
        style={styles.img}
      />
      <Text
        style={{
          marginBottom: 20,
        }}>
        <Text style={styles.blue}>BLUE</Text>
        <Text style={styles.check}> CHECK</Text>
      </Text>
      <HomeCard title="Teacher" image={require('../images/teacher.png')} />
      <HomeCard title="Student" image={require('../images/student.png')} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: 'white',
    height: '100%',
  },
  img: {
    width: 300,
    height: 300,
  },
  blue: {
    fontSize: 35,
    color: 'black',
    fontWeight: 'bold',
  },
  check: {
    fontSize: 35,
    color: '#3399ff',
    fontWeight: 'bold',
  },
});

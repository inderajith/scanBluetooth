import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import MyText from './MyText';

const HomeCard = props => {
  const {title, image} = props;
  const {navigate} = useNavigation();
  const isTeacher = title === 'Teacher';
  return (
    <Card
      style={{width: '80%', marginVertical: '5%'}}
      onPress={() => navigate('Login', {title})}>
      <Card.Content
        style={[
          styles.card,
          {backgroundColor: isTeacher ? '#e8fcf4' : '#e6f2ff'},
        ]}>
        <Text
          style={[styles.title, {color: isTeacher ? '#078a56' : '#3399ff'}]}>
          {title}
        </Text>
        <Image source={image} resizeMode="contain" style={styles.image} />
      </Card.Content>
    </Card>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
  },
  image: {
    width: 50,
    height: 50,
  },
});

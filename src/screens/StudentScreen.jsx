import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Card, FAB} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyText from '../components/MyText';
import {useNavigation} from '@react-navigation/native';
import Logout from '../components/Logout';

const StudentScreen = () => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.container}>
      <Logout cb={() => {}} />
      <Card onPress={() => navigate('AttendanceDatesList', {user: 'student'})}>
        <Card.Content style={styles.card}>
          <MyText>View History</MyText>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </Card.Content>
      </Card>
      <Card
        style={{
          backgroundColor: 'white',
          marginTop: 100,
          width: '90%',
          alignSelf: 'center',
        }}>
        <Card.Content>
          <Image
            source={require('../images/bluetoothSearch.png')}
            resizeMode="contain"
            style={{width: 300, height: 250}}
          />
          <MyText style={styles.message}>
            Turn On Bluetooth to mark attendace
          </MyText>
        </Card.Content>
      </Card>
    </View>
  );
};

export default StudentScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: '5%',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  message: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500',
    // marginTop: '50%',
    color: '#3399ff',
  },
});

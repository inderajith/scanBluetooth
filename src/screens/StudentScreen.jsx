import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card, FAB} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyText from '../components/MyText';
import {useNavigation} from '@react-navigation/native';
import Logout from '../components/Logout';

const StudentScreen = () => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.container}>
      <Logout />
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
});

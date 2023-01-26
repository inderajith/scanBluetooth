import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import MyText from '../components/MyText';
import {teacherData, singleStudentHistory} from '../components/initDatas';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const AttendanceDatesListScreen = props => {
  const user = props?.route?.params?.user;
  const isStudent = user === 'student';
  const {navigate} = useNavigation();

  const renderTeacherCard = ({item}) => {
    return (
      <Card
        onPress={() => navigate('StudentList', {date: item.date})}
        style={{
          marginVertical: 8,
        }}>
        <Card.Content style={styles.card}>
          <MyText>{item.date}</MyText>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </Card.Content>
      </Card>
    );
  };

  const renderStudentCard = ({item}) => {
    const {isPresent, date} = item;
    return (
      <Card
        style={{
          marginVertical: 8,
        }}>
        <Card.Content style={styles.card}>
          <MyText>{date}</MyText>
          <MyText
            style={{
              color: isPresent ? '#28a745' : '#dc3545',
              fontWeight: 'bold',
            }}>
            {isPresent ? 'Present' : 'Absent'}
          </MyText>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <MyText style={styles.title}>
        {isStudent ? 'My History' : 'Past Attendace List'}
      </MyText>
      <FlatList
        data={isStudent ? singleStudentHistory : teacherData}
        keyExtractor={i => i.id}
        renderItem={isStudent ? renderStudentCard : renderTeacherCard}
      />
    </View>
  );
};

export default AttendanceDatesListScreen;

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
  title: {
    fontSize: 22,
    marginBottom: 15,
    fontWeight: '500',
  },
});

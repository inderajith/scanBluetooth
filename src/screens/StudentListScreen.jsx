import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import MyText from '../components/MyText';
import {studentAttendanceList} from '../components/initDatas';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const StudentListScreen = props => {
  const date = props?.route?.params?.date;

  const renderTeacherCard = ({item}) => {
    return (
      <Card
        style={{
          marginVertical: 8,
        }}>
        <Card.Content style={styles.card}>
          <MyText>{item.name}</MyText>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <MyText style={styles.title}>{date}</MyText>
      <FlatList
        data={studentAttendanceList}
        keyExtractor={i => i.id}
        renderItem={renderTeacherCard}
      />
    </View>
  );
};

export default StudentListScreen;

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

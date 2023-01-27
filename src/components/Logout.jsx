import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FAB} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const Logout = props => {
  const {navigate} = useNavigation();

  return (
    <FAB
      icon="logout"
      color="white"
      style={styles.fab}
      onPress={() =>
        Alert.alert('Logout', 'Are you sure want to Logout', [
          {
            text: 'No',
            onPress: () => console.log('No pressed'),
          },
          {
            text: 'Yes',
            onPress: () => {
              props.cb();
              navigate('Home');
            },
          },
        ])
      }
    />
  );
};

export default Logout;

const styles = StyleSheet.create({
  fab: {
    alignSelf: 'flex-end',
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#dc3545',
  },
});

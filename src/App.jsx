// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import TeacherScreen from './screens/TeacherScreen';
import StudentScreen from './screens/StudentScreen';
import AttendanceDatesListScreen from './screens/AttendanceDatesListScreen';
import StudentListScreen from './screens/StudentListScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Teacher">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Teacher"
          component={TeacherScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Student"
          component={StudentScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AttendanceDatesList"
          component={AttendanceDatesListScreen}
          options={{headerTitle: ''}}
        />
        <Stack.Screen
          name="StudentList"
          component={StudentListScreen}
          options={{headerTitle: 'Students List'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

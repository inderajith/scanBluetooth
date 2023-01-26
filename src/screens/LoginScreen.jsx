import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Card, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = props => {
  const title = props?.route?.params?.title;

  const {navigate} = useNavigation();
  const [loginDetais, setLoginDetais] = useState({
    email: 'guest123@mailinator.com',
    password: 'guest123',
  });

  const onChange = (key, value) => {
    setLoginDetais(prev => {
      return {...prev, [key]: value};
    });
  };

  const onSubmit = () => {
    console.log(loginDetais);
    if (title === 'Teacher') {
      navigate('Teacher');
    } else if (title === 'Student') {
      navigate('Student');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.cardConatiner}>
        <Card.Content>
          <Text style={styles.title}>{title} Login</Text>
          <TextInput
            mode="outlined"
            label="Email"
            value={loginDetais?.email}
            onChangeText={text => onChange('email', text)}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Password"
            value={loginDetais?.password}
            onChangeText={text => onChange('password', text)}
            secureTextEntry
            style={styles.input}
          />
          <Button mode="contained" onPress={onSubmit} style={styles.button}>
            Login
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: '50%',
  },
  cardConatiner: {
    width: '90%',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  title: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  input: {
    marginVertical: 10,
  },
  button: {
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 15,
  },
});

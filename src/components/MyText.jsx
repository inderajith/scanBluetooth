import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MyText = ({style, children}) => {
  const localStyle = StyleSheet.create({
    container: {
      color: 'black',
      fontSize: 16,
    },
  });

  return <Text style={[localStyle.container, {...style}]}>{children}</Text>;
};

export default MyText;

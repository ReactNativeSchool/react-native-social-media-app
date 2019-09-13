import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { Button } from './Button';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#1ca1f2',
    fontSize: 15,
    marginLeft: 5,
  },
});

export const Header = ({ onLeftPress, leftText, onRightPress, rightText }) => (
  <SafeAreaView style={styles.container}>
    <TouchableOpacity onPress={onLeftPress}>
      <Text style={styles.linkText}>{leftText}</Text>
    </TouchableOpacity>
    <Button onPress={onRightPress} text={rightText} />
  </SafeAreaView>
);

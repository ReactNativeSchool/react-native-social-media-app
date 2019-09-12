import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';

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
  button: {
    backgroundColor: '#1ca1f2',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 5,
  },
  linkText: {
    color: '#1ca1f2',
    fontSize: 15,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
});

export const Button = ({ onPress, text }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

export const Header = ({ onLeftPress, leftText, onRightPress, rightText }) => (
  <SafeAreaView style={styles.container}>
    <TouchableOpacity onPress={onLeftPress}>
      <Text style={styles.linkText}>{leftText}</Text>
    </TouchableOpacity>
    <Button onPress={onRightPress} text={rightText} />
  </SafeAreaView>
);

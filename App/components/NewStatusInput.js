import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  input: {
    flex: 1,
    alignItems: 'center',
    textAlignVertical: 'top',
  },
});

export const NewStatusInput = ({ avatarUri, ...props }) => (
  <View style={styles.container}>
    <Image style={styles.avatar} source={{ uri: avatarUri }} />
    <TextInput style={styles.input} multiline numberOfLines={6} {...props} />
  </View>
);

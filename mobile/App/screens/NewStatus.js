import React from 'react';
import { ScrollView } from 'react-native';

import { NewStatusInput } from '../components/NewStatusInput';
import { Header } from '../components/Header';

export default ({ navigation }) => {
  return (
    <React.Fragment>
      <Header
        onLeftPress={() => navigation.pop()}
        leftText="Cancel"
        onRightPress={() => alert('todo!')}
        rightText="Post"
      />

      <ScrollView
        style={{ backgroundColor: 'rgba(27,31,35,.05)' }}
        contentContainerStyle={{
          flex: 1,
          backgroundColor: 'rgba(27,31,35,.05)',
        }}
      >
        <NewStatusInput placeholder="What's the latest?" />
      </ScrollView>
    </React.Fragment>
  );
};

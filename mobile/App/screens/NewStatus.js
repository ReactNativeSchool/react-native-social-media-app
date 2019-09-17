import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useMutation } from '@apollo/react-hooks';

import { NewStatusInput } from '../components/NewStatusInput';
import { Header } from '../components/Header';
import { createStatus } from '../graphql/mutations';

export default ({ navigation }) => {
  const parentStatus = navigation.getParam('parent', {});
  const [status, setStatus] = useState();
  const [createStatusFn] = useMutation(createStatus);

  return (
    <React.Fragment>
      <Header
        onLeftPress={() => navigation.pop()}
        leftText="Cancel"
        onRightPress={() => {
          createStatusFn({
            variables: { status, parentPostId: parentStatus._id },
          }).then(() => navigation.pop());
        }}
        rightText="Post"
      />

      <ScrollView
        style={{ backgroundColor: 'rgba(27,31,35,.05)' }}
        contentContainerStyle={{
          flex: 1,
          backgroundColor: 'rgba(27,31,35,.05)',
        }}
      >
        <NewStatusInput
          placeholder="What's the latest?"
          onChangeText={text => setStatus(text)}
        />
      </ScrollView>
    </React.Fragment>
  );
};

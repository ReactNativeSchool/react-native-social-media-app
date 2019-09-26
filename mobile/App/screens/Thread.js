import React from 'react';
import { FlatList, View } from 'react-native';

import { Status, Separator } from '../components/Status';
import { Button } from '../components/Button';

const Thread = ({ navigation }) => {
  const originalStatus = navigation.getParam('status', {});

  return (
    <FlatList
      data={[]}
      renderItem={({ item }) => (
        <Status
          {...item}
          onHeartPress={() => alert('todo!')}
          indent={item._id !== originalStatus._id}
        />
      )}
      ItemSeparatorComponent={() => <Separator />}
      keyExtractor={item => item._id}
      ListFooterComponent={
        <View
          style={{
            flex: 1,
            marginBottom: 60,
            marginHorizontal: 30,
            marginTop: 10,
          }}
        >
          <Button
            text="New Reply"
            onPress={() =>
              navigation.navigate('NewStatus', { parent: originalStatus })
            }
          />
        </View>
      }
    />
  );
};

export default Thread;

import React from 'react';
import { FlatList, View } from 'react-native';

import { Status, Separator } from '../components/Status';

const Feed = ({ navigation }) => {
  return (
    <FlatList
      data={[]}
      renderItem={({ item }) => (
        <Status
          {...item}
          onRowPress={() => navigation.push('Thread', { status: item })}
          onHeartPress={() => alert('todo!')}
        />
      )}
      ItemSeparatorComponent={() => <Separator />}
      keyExtractor={item => item._id}
      ListFooterComponent={<View style={{ flex: 1, marginBottom: 60 }} />}
    />
  );
};

export default Feed;

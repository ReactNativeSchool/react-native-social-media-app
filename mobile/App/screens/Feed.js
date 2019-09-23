import React from 'react';
import { FlatList, View } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import { exampleQuery } from '../graphql/queries';

import { Status, Separator } from '../components/Status';

const Feed = ({ navigation }) => {
  const { data, loading } = useQuery(exampleQuery);

  if (loading) {
    return null;
  }

  console.log(data);

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

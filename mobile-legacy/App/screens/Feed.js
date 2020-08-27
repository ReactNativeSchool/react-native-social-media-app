import React from 'react';
import { FlatList, View } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { requestFeed } from '../graphql/queries';
import { likeStatus } from '../graphql/mutations';

import { Status, Separator } from '../components/Status';

const Feed = ({ navigation }) => {
  const { loading, data } = useQuery(requestFeed);
  const [likeStatusFn] = useMutation(likeStatus);

  if (loading) {
    return null;
  }

  return (
    <FlatList
      data={data.feed}
      renderItem={({ item }) => (
        <Status
          {...item}
          onRowPress={() => navigation.push('Thread', { status: item })}
          onHeartPress={() =>
            likeStatusFn({ variables: { statusId: item._id } })
          }
        />
      )}
      ItemSeparatorComponent={() => <Separator />}
      keyExtractor={item => item._id}
      ListFooterComponent={<View style={{ flex: 1, marginBottom: 60 }} />}
    />
  );
};

export default Feed;

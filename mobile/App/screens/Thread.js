import React from 'react';
import { FlatList, View } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Status, Separator } from '../components/Status';
import { Button } from '../components/Button';
import { requestResponses } from '../graphql/queries';
import { likeStatus } from '../graphql/mutations';

const Thread = ({ navigation }) => {
  const originalStatus = navigation.getParam('status', {});
  const { data, loading } = useQuery(requestResponses, {
    variables: { _id: originalStatus._id },
  });
  const [likeStatusFn] = useMutation(likeStatus);

  if (loading) {
    return null;
  }

  return (
    <FlatList
      data={[{ ...originalStatus, originalStatus: true }, ...data.responses]}
      renderItem={({ item }) => (
        <Status
          {...item}
          onHeartPress={() =>
            likeStatusFn({
              variables: { statusId: item._id, userId: item.userId },
            })
          }
          indent={!item.originalStatus}
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

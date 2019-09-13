import React from 'react';
import { FlatList, View } from 'react-native';

import { Status, Separator } from '../components/Status';
import { Button } from '../components/Button';

const DATA = [
  {
    _id: 't-1',
    avatarUri: 'https://picsum.photos/id/238/200',
    name: 'John Doe',
    username: '@john_doe',
    status:
      "This is an example response, which is really just a status with a parent. Isn't it great?!",
    isLiked: false,
    publishedAt: '2019-09-12T15:52:01.169Z',
  },
  {
    _id: 't-2',
    avatarUri: 'https://picsum.photos/id/239/200',
    name: 'John Doe',
    username: '@john_doe',
    status:
      "This is an example response, which is really just a status with a parent. Isn't it great?!",
    isLiked: false,
    publishedAt: '2019-09-12T15:52:01.169Z',
  },
  {
    _id: 't-3',
    avatarUri: 'https://picsum.photos/id/240/200',
    name: 'John Doe',
    username: '@john_doe',
    status:
      "This is an example response, which is really just a status with a parent. Isn't it great?!",
    isLiked: false,
    publishedAt: '2019-09-12T15:52:01.169Z',
  },
];

export default ({ navigation }) => {
  const originalStatus = navigation.getParam('status', {});
  return (
    <FlatList
      data={[{ ...originalStatus, originalStatus: true }, ...DATA]}
      renderItem={({ item }) => (
        <Status
          {...item}
          onHeartPress={() => alert('todo: like!')}
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

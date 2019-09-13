import React from 'react';
import { FlatList, View } from 'react-native';

import { Status, Separator } from '../components/Status';

const DATA = [
  {
    _id: '1',
    avatarUri: 'https://picsum.photos/id/237/200',
    name: 'Spencer Carli',
    username: '@spencer_carli',
    status: "This is an example status. Isn't it great?!",
    // mediaUri: 'https://picsum.photos/400',
    isLiked: false,
    publishedAt: '2019-09-12T15:52:01.169Z',
  },
  {
    _id: '2',
    avatarUri: 'https://picsum.photos/id/237/200',
    name: 'Spencer Carli',
    username: '@spencer_carli',
    status: "This is an example status. Isn't it great?!",
    mediaUri: 'https://picsum.photos/400',
    isLiked: true,
    publishedAt: '2019-09-11T15:52:01.169Z',
  },
  {
    _id: '3',
    avatarUri: 'https://picsum.photos/id/237/200',
    name: 'Spencer Carli',
    username: '@spencer_carli',
    status: "This is an example status. Isn't it great?!",
    mediaUri: 'https://picsum.photos/400',
    isLiked: false,
    publishedAt: '2019-09-10T15:52:01.169Z',
  },
  {
    _id: '4',
    avatarUri: 'https://picsum.photos/id/237/200',
    name: 'Spencer Carli',
    username: '@spencer_carli',
    status: "This is an example status. Isn't it great?!",
    mediaUri: 'https://picsum.photos/400',
    isLiked: false,
    publishedAt: '2019-09-09T15:52:01.169Z',
  },
];

export default ({ navigation }) => (
  <FlatList
    data={DATA}
    renderItem={({ item }) => (
      <Status
        {...item}
        onRowPress={() => navigation.push('Thread', { status: item })}
        onHeartPress={() => alert('todo: like!')}
      />
    )}
    ItemSeparatorComponent={() => <Separator />}
    keyExtractor={item => item._id}
    ListFooterComponent={<View style={{ flex: 1, marginBottom: 60 }} />}
  />
);

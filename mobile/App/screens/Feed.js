import React from 'react';
import { FlatList, View } from 'react-native';

import { Status, Separator } from '../components/Status';
import { requestFeed } from '../graphql/queries';
import { client } from '../graphql/client';

class Feed extends React.Component {
  state = {
    feed: [],
  };

  componentDidMount() {
    client.query({ query: requestFeed }).then(res => {
      this.setState({ feed: res.data.feed });
    });
  }

  render() {
    return (
      <FlatList
        data={this.state.feed}
        renderItem={({ item }) => (
          <Status
            {...item}
            onRowPress={() =>
              this.props.navigation.push('Thread', { status: item })
            }
            onHeartPress={() => alert('todo: like!')}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
        keyExtractor={item => item._id}
        ListFooterComponent={<View style={{ flex: 1, marginBottom: 60 }} />}
      />
    );
  }
}

export default Feed;

import React from 'react';
import { FlatList, View } from 'react-native';

import { Status, Separator } from '../components/Status';
import { Button } from '../components/Button';
import { client } from '../graphql/client';
import { requestResponses } from '../graphql/queries';

class Thread extends React.Component {
  state = {
    responses: [],
  };

  componentDidMount() {
    const originalStatus = this.props.navigation.getParam('status', {});
    client
      .query({
        query: requestResponses,
        variables: { _id: originalStatus._id },
      })
      .then(res => {
        this.setState({
          responses: res.data.responses,
        });
      });
  }

  render() {
    const { navigation } = this.props;
    const originalStatus = navigation.getParam('status', {});

    return (
      <FlatList
        data={[
          { ...originalStatus, originalStatus: true },
          ...this.state.responses,
        ]}
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
  }
}

export default Thread;

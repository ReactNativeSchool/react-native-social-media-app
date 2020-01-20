import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Feed from './screens/Feed';
import Thread from './screens/Thread';
import NewStatus from './screens/NewStatus';

import { Button } from './components/Button';

const AppNavigator = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Home',
      headerRight: () => (
        <Button
          text="New Status"
          onPress={() => navigation.navigate('NewStatus')}
        />
      ),
    }),
  },
  Thread: {
    screen: Thread,
  },
});

const ModalNavigator = createStackNavigator(
  {
    App: AppNavigator,
    NewStatus: {
      screen: NewStatus,
      navigationOptions: {
        headerTitle: 'New Status',
      },
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const App = createAppContainer(ModalNavigator);

export default () => <App />;

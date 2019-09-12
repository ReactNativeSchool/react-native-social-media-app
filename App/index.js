import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Feed from './screens/Feed';
import Thread from './screens/Thread';

const AppNavigator = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  Thread: {
    screen: Thread,
  },
});

export default createAppContainer(AppNavigator);

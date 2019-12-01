import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import mainTab from '../components/tabNav/main';
import Employees from '../screens/employees';
import Profile from '../screens/profile';
import Favorites from '../screens/favorites';
import Me from '../screens/user';
import Options from '../screens/options';
import Messages from '../screens/messages';
import Repository from '../screens/repository';
import { routeNames } from '../utils/navigation';

const screens = createStackNavigator(
  {
    Employees,
    Profile,
    Favorites,
    Me,
    Options,
    Messages,
    Repository,
  },
  { initialRouteName: routeNames.Employees, headerMode: 'none' }
);

const mainStackNavigator = createMaterialTopTabNavigator(
  {
    screens,
  },
  {
    backBehavior: 'history',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarComponent: mainTab,
    lazy: true,
  }
);

export default createAppContainer(mainStackNavigator);
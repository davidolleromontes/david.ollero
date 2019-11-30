import React from 'react';
import { Transition } from 'react-native-reanimated';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { createStackNavigator } from 'react-navigation-stack';

import Main from '../navigation/main';
import Splash from '../screens/splash';

// TODO add here necesary modals
const RootStack = createAnimatedSwitchNavigator(
  {
    Splash,
    Main,
  },
  {
    transition: (
      <Transition.Together>
        <Transition.Out type="fade" durationMs={400} interpolation="easeIn" />
        <Transition.In type="slide-bottom" durationMs={500} />
      </Transition.Together>
    ),
  }
);

// TODO add here necesary modals
const rootModalStack = createStackNavigator(
  {
    RootStack,
  },
  {
    headerMode: 'none',
    mode: 'modal',
    transparentCard: true,
    cardStyle: {
      // makes transparentCard work for android
      opacity: 1.0,
    },
  }
);

export default rootModalStack;

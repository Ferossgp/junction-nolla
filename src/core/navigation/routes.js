import React from 'react';
import {enableScreens} from 'react-native-screens';
import {
  createAppContainer,
  NavigationContainer,
  NavigationRouteConfigMap,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Main from '../../views/Main';
import Products from '../../views/Products';
import Product from '../../views/Main';

const AppNavigator = createStackNavigator(
  {
    ['Home']: Main,
    ['Products']: Products,
    ['Product']: Product,
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const createAppRouter = container => {
  enableScreens();
  return createAppContainer(container);
};

export const Router = createAppRouter(AppNavigator);

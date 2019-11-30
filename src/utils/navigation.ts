// external navigation actions
import { Color } from 'csstype';
import { StatusBar, StatusBarStyle } from 'react-native';
import { NavigationActions, NavigationProp, StackActions } from 'react-navigation';

// import { NavigationProp } from 'react-navigation';
// import { printLog } from './config';
// https://github.com/react-navigation/react-navigation/issues/1439#issuecomment-340293063

export const routeNames = {
  Employees: 'Employees',
  Favorites: 'Favorites',
  Me: 'Me',
  Profile: 'Profile',
  Options: 'Options',
  Messages: 'Messages',
  Repository: 'Repository'
  // Resume: 'Resume',
  // LogIn: 'LogIn',
  // SignUpCheckEmail: 'SignUpCheckEmail',
  // Profile: 'Profile',
  // Confirmation: 'Confirmation',
  // Notifications: 'Notifications',
  // MainProfile: 'MainProfile',
  // planning: 'Planning',
  // planningChat: 'PlanningChat',
  // planningNotifications: 'PlanningNotifications',
  // planningNotificationDetail: 'PlanningNotificationDetail',
  // planningConfiguration: 'PlanningConfiguration',
  // planningOptions: 'PlanningOptions',
};

export const modalNames = {
  DefaultModal: 'DefaultModal',
};

interface INavigation {
  navigation: NavigationProp<{}>;
  setTopBarStyle: (color: Color, barStyle: StatusBarStyle) => void;
  initNavigator: (navigatorRef: any) => void;
  navigate: (routeName: string, params?: object) => void;
  push: (routeName: string, params?: object) => void;
  goBack: () => void;
  goBackTo: (key: string) => void;
  resetStack: (routeList: string[], index?: number, params?: {}) => void;
  resetStackTo: (routeName: string) => void;
  pop: (n?: number) => void;
  popToTop: () => void;
  openDefaultModal: (params?: object) => void;
  openModal: (routeName: string, params?: object) => void;
}

let current: string | number | undefined = '';

const Navigator: INavigation = {
  navigation: { state: { nav: { routes: '' } }, dispatch: () => false },

  setTopBarStyle: (color, barStyle = 'default') => {
    StatusBar.setBarStyle(barStyle);
    StatusBar.setBackgroundColor(color);
  },

  initNavigator: (navigatorRef: any) => {
    Navigator.navigation = navigatorRef;
  },

  navigate: (routeName: string, params?: object) => {
    console.log('navigate', routeName, { params });
    if (current === routeName) return;
    current = routeName;
    Navigator.navigation.dispatch(NavigationActions.navigate({ routeName, params }));
  },

  // if screen is reused
  push: (routeName: string, params?: object) => {
    console.log('navigate', routeName, { params });

    Navigator.navigation.dispatch(StackActions.push({ routeName, params }));
  },

  goBack: () => {
    console.log('goBack');
    current = '';
    Navigator.navigation.dispatch(NavigationActions.back());
  },

  goBackTo: (key: string) => {
    console.log('goBackTo', key);
    if (current === `goBackTo${key}`) return;
    current = key;
    Navigator.navigation.dispatch(NavigationActions.back({ key }));
  },

  resetStack: (routeList: string[], index?: number, params?: {}) => {
    console.log('reset', { routeList, index });
    console.log(routeList.map(route => route));
    if (current === index) return;
    current = index;
    Navigator.navigation.dispatch(
      StackActions.reset({
        index: index || 0,
        actions: routeList.map(routeName => NavigationActions.navigate({ routeName, params })),
      })
    );
  },

  resetStackTo: (routeName: string) => {
    console.log('resetTo', routeName);
    if (current === routeName) return;
    current = routeName;
    Navigator.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName })],
      })
    );
  },

  pop: (n?: number) => {
    console.log('pop', n);
    if (current === `pop${n}`) return;
    current = `pop${n}`;
    Navigator.navigation.dispatch(StackActions.pop({ n }));
  },

  popToTop: () => {
    console.log('PopToTop');
    if (current === 'popToTop') return;
    current = 'popToTop';
    Navigator.navigation.dispatch(StackActions.popToTop({}));
  },

  openDefaultModal: (params?: object) => {
    console.log('openModal', { params });
    if (current === 'modal') return;
    current = 'modal';
    Navigator.navigation.dispatch(NavigationActions.navigate({ params, routeName: modalNames.DefaultModal }));
  },

  openModal: (routeName: string, params?: object) => {
    console.log('openModal', { params });
    if (current === 'modal-routeName') return;
    current = 'modal-routeName';
    Navigator.navigation.dispatch(NavigationActions.navigate({ params, routeName }));
  },
};

// TODO modify to acces only to some properties
export default Navigator;

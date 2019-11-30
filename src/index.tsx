import React, { Reducer, useReducer, useState } from 'react';
import { YellowBox } from 'react-native';
import { useScreens } from 'react-native-screens';

import Router from './navigation/index';
import { langType } from './types/context';
// import { RootContext } from 'src/types/form';
// import { IUser } from 'src/types/services';
// import { initFormSignUp } from 'src/utils/array';
// import { printLog } from 'src/utils/config';
import { RootContext } from './utils/context';
import { init } from './utils/language';
import Navigator from './utils/navigation';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
init();
useScreens();

// const updateReducerSignUp = (state: ISignUpState, newState: Partial<ISignUpState>) => ({ ...state, ...newState });
// const updateReducerFormSignUp = (state: IFormSignUp, newState: Partial<IFormSignUp>) => ({ ...state, ...newState });
// const updateReducerUser = (state: IUser, newState: Partial<IUser>) => ({ ...state, ...newState });

const App = () => {
  const langState = useState<langType>('es');
  // if (printLog) console.log('render root');

  // const signUpState = useReducer<Reducer<ISignUpState, Partial<ISignUpState>>>(updateReducerSignUp, { tile: '' });
  // const formSignUp = useReducer<Reducer<IFormSignUp, Partial<IFormSignUp>>>(updateReducerFormSignUp, initFormSignUp);
  // const user = useReducer<Reducer<IUser, Partial<IUser>>>(updateReducerUser, { id: -1, email: '' });
  return (
    <RootContext.Provider value={{ langState }}>
      <Router ref={(nav: any) => Navigator.initNavigator(nav)} />
    </RootContext.Provider>
  );
};

export default App;

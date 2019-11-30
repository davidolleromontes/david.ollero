import React, { useContext } from 'react';
import { NavigationContext } from 'react-navigation';

import { IGlobalContextType } from '../types/context';

const defContextInterface = {} as IGlobalContextType;

// {Provicer, Consumer}
export const RootContext = React.createContext<IGlobalContextType>(defContextInterface);

export const getNavigationContext = () => useContext(NavigationContext);

// get object with all useState
export const getRootContext = (): IGlobalContextType => useContext(RootContext);

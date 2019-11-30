import { Dispatch, SetStateAction } from 'react';

export interface IGlobalContextType {
  langState: [langType, Dispatch<SetStateAction<langType>>];
};

export type langType = 'es';

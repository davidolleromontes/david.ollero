import uuidv4 from 'uuid/v4';

import { MessageShape } from '../assets/enums';

export const createTextMessage = (text: string) => {
  return {
    type: MessageShape.text,
    id: uuidv4(),
    text,
  };
}

export const createImageMessage = (uri: string) => {
  return {
    type: MessageShape.image,
    id: uuidv4(),
    uri,
  };
}
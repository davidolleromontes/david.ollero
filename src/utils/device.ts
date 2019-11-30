import { Dimensions, NativeModules, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const deviceSize = { width, height };

/* if is an ios device */
export const isIOS: boolean = Platform.OS === 'ios';

/* if is an android device */
export const isAndroid: boolean = Platform.OS === 'android';

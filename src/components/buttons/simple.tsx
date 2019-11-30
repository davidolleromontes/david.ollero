import { Color } from 'csstype';
import React, { FC } from 'react';
import {
  ActivityIndicator,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

import { ImageType } from 'src/types/components';
import colors from '../../assets/colors';
import dimensions from '../../assets/dimensions';
import Icon from './icon';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: dimensions.buttonHeight,
    borderRadius: dimensions.radius,
    borderColor: colors.green,
  },
  activeButton: {
    backgroundColor: colors.green,
  },
  inactiveButton: {
    backgroundColor: colors.disabled,
  },
  text: {
    textShadowColor: colors.transparent,
    textTransform: 'uppercase',
  },
  activeText: {
    color: colors.white,
  },
  inactiveText: {
    color: colors.greyMedium,
  },
  icon: {
    marginHorizontal: 11,
  },
});

export interface IProps extends TouchableOpacityProps {
  onPress: () => void;
  children: string;
  style?: ViewStyle | ViewStyle[];
  fontStyles?: TextStyle | TextStyle[];
  iconStyle?: ImageStyle | ImageStyle[];
  activeOpacity?: number;
  loading?: boolean;
  color?: Color; // text/indicator color
  backgroundColor?: Color; // button color
  inactive?: boolean;
  source?: ImageType;
  iconPosition?: 'left' | 'right';
}

const SimpleButton: FC<IProps> = props => {
  const {
    onPress,
    children,
    style = {},
    fontStyles = {},
    loading = false,
    backgroundColor = colors.green,
    color = colors.white,
    inactive = false,
    activeOpacity = 0.8,
    source,
    iconStyle = {},
    iconPosition = 'left',
  } = props;

  const iconComponent = !loading && !!source && <Icon style={[styles.icon, iconStyle]} source={source} />;
  const textComponent = loading ? (
    <ActivityIndicator size="large" color={color} />
  ) : (
    <Text
      style={[
        { color: !inactive ? color : inactive ? colors.greyMedium : colors.blueDark },
        fontStyles,
      ]}
    >
      {children}
    </Text>
  );
  if (inactive || loading) {
    return (
      <View style={[styles.button, inactive ? styles.inactiveButton : styles.activeButton, style]}>
        {iconPosition === 'left' && iconComponent}
        {textComponent}
        {iconPosition === 'right' && iconComponent}
      </View>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      style={[styles.button, styles.activeButton, inactive ? styles.inactiveButton : { backgroundColor }, style]}
      onPress={onPress}
    >
      <View>
        {iconPosition === 'left' && iconComponent}
        {textComponent}
        {iconPosition === 'right' && iconComponent}
      </View>
    </TouchableOpacity>
  );
};

export default SimpleButton;
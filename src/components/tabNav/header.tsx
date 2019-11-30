import { Color } from 'csstype';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../../assets/colors';
import dimensions from '../../assets/dimensions';
import Navigation, { routeNames } from '../../utils/navigation';

interface IProps {
  color?: Color;
  backgroundColor?: Color;
  title: string;
  isVisibleIcons?: boolean;
  isVisibleBackIcon?: boolean;
}

const Header: FC<IProps> = props => {
  const { title, isVisibleIcons = false, isVisibleBackIcon = false } = props;

  let { color = colors.black, backgroundColor = colors.white } = props;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.vertical}>
        {isVisibleBackIcon && (<Icon name="arrow-back" size={22} color={color} onPress={() => Navigation.goBack()} />)}
      </View>
      <View style={styles.vertical}>
        <Text>{title}</Text>
      </View>
      <View style={styles.vertical}>
        {isVisibleIcons && (<Icon name="settings" size={22} color={color} onPress={() => Navigation.navigate(routeNames.Options)} />)}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: dimensions.mediumSpace,
    paddingHorizontal: dimensions.horizontal,
    backgroundColor: colors.white,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1
  },
  vertical: { alignItems: 'center' },
  dot: { marginTop: dimensions.miniSpace, height: 12, width: 12 },
});

export default Header;
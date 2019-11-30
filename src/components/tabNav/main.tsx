import { Color } from 'csstype';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../../assets/colors';
import dimensions from '../../assets/dimensions';
import { mainTabNavigation } from '../../assets/enums';
import { getNavigationContext } from '../../utils/context';
import Navigation, { routeNames } from '../../utils/navigation';
import Dot from '../dots/dot';

interface IProps {
  color?: Color;
  backgroundColor?: Color;
  navigationState: any;
}

const Profile: FC<IProps> = props => {
  const { navigationState } = props;

  let { color = colors.black, backgroundColor = colors.white } = props;

  const { routes } = navigationState;
  const route = routes[0];
  const routeName = route.routes[route.index].routeName;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.vertical}>
        <Icon name="list" size={22} color={color} onPress={() => Navigation.navigate(routeNames.Employees)} />
        {routeName === mainTabNavigation.employees && <Dot style={[styles.dot, { backgroundColor: color }]} />}
      </View>
      <View style={styles.vertical}>
        <Icon name="star" size={22} color={color} onPress={() => Navigation.navigate(routeNames.Favorites)} />
        {routeName === mainTabNavigation.favorites && <Dot style={[styles.dot, { backgroundColor: color }]} />}
      </View>
      <View style={styles.vertical}>
        <Icon name="person" size={22} color={color} onPress={() => Navigation.navigate(routeNames.Me)} />
        {routeName === mainTabNavigation.me && <Dot style={[styles.dot, { backgroundColor: color }]} />}
      </View>
      <View style={styles.vertical}>
        <Icon name="message" size={22} color={color} onPress={() => Navigation.navigate(routeNames.Messages)} />
        {routeName === mainTabNavigation.messages && <Dot style={[styles.dot, { backgroundColor: color }]} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 76,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: dimensions.mediumSpace,
    paddingHorizontal: dimensions.horizontal,
    backgroundColor: colors.white,
    borderTopColor: colors.greyLight,
    borderTopWidth: 1
  },
  vertical: { alignItems: 'center' },
  dot: { marginTop: dimensions.miniSpace, height: 12, width: 12 },
});

export default Profile;
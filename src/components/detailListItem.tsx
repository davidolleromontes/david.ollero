import React, { FC } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../assets/colors';
import dimensions from '../assets/dimensions';

interface IProps {
  icon: string;
  title: string;
  subtitle: string;
}

const DetailListItem: FC<IProps> = props => {
  const { icon, title, subtitle } = props;

  return (<View style={styles.borderContainer}>
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {icon && (
          <Icon
            name={icon}
            size={24}
            style={{
              color: colors.black,
              marginRight: 20,
            }}
          />
        )}
        <View style={styles.contentContainer}>
          {title !== '' && (<Text style={[styles.title]}>{title}</Text>)}

          {subtitle !== '' && (
            <Text style={styles.subtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
    </View>
  </View>);

};

const styles = StyleSheet.create({
  borderContainer: {
    paddingLeft: dimensions.space,
  },
  wrapper: {
    flexDirection: 'row',
    paddingTop: dimensions.spaceBig / 2,
    paddingBottom: dimensions.spaceBig / 2,
    paddingRight: dimensions.space,
    borderBottomColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: dimensions.spaceBig / 2,
  },
  subtitle: {
    color: colors.blue,
    fontSize: 15,
    marginTop: dimensions.miniSpace,
  },
});

export default DetailListItem;
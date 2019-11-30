import { Color } from 'csstype';
import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../assets/colors';
import dimensions from '../assets/dimensions';
import { IEmployee } from '../types/services';

export interface IEmployeeProps extends IEmployee {
  textColor?: Color;
  onPress?: () => void;
}

const EmployeeThumbnail: FC<IEmployeeProps> = props => {
  const { name, phone, avatar, textColor = colors.white, onPress } = props;

  const colorStyle = { color: textColor };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{
            uri: avatar,
          }}
          style={styles.avatar}
        />
      </TouchableOpacity>
      {name !== '' && (
        <Text style={[styles.name, colorStyle]}>{name}</Text>
      )}

      {phone !== '' && (
        <View style={styles.phoneSection}>
          <Icon name="phone" size={16} style={{ color: textColor }} />
          <Text style={[styles.phone, colorStyle]}>{phone}</Text>
        </View>
      )}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 30,
    marginHorizontal: dimensions.horizontal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: 'white',
    borderWidth: 2,
  },
  name: {
    fontSize: dimensions.horizontal,
    marginTop: dimensions.space,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  phoneSection: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phone: {
    marginLeft: 4,
    fontSize: dimensions.spaceBig / 2,
    fontWeight: 'bold',
  },
});

export default EmployeeThumbnail;
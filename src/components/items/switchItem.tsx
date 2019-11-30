import React, { FC } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Switch from '../buttons/switch';
import colors from '../../assets/colors'
import dimensions from '../../assets/dimensions';

interface IProps {
  title: string;
  info?: string;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  componentStyle?: ViewStyle | ViewStyle[];
}

const SwitchItem: FC<IProps> = props => {
  const { title, info, selected = false, disabled = false, onPress, componentStyle } = props;
  return (
    <View style={[styles.container, componentStyle]}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Switch selected={selected} onPress={onPress} disabled={disabled} />
      </View>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: dimensions.miniSpace,
  },
  title: { color: colors.blueDark },
  info: { color: colors.greyDark },
});

export default SwitchItem;
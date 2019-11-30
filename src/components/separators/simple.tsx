import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import colors from '../../assets/colors'

const styles = StyleSheet.create({
  slash: {
    width: '100%',
    height: 1,
    backgroundColor: colors.greyMedium,
  },
});

const Separator = ({ style }: { style?: ViewStyle } = {}) => <View style={[styles.slash, style]} />;

export default Separator;
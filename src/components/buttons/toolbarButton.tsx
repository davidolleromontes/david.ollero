import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../../assets/colors';
import dimensions from '../../assets/dimensions';

interface IProps {
    name: string;
    onPress: () => void;
}

const ToolbarButton: FC<IProps> = (props) => {
    const { name, onPress } = props;

    return (
        <Icon style={styles.button} name={name} size={22} onPress={onPress} />

    );
};

const styles = StyleSheet.create({
    button: {
        top: -2,
        marginRight: dimensions.space / 2,
        fontSize: dimensions.horizontal,
        color: colors.black,
    },
});

export default ToolbarButton;
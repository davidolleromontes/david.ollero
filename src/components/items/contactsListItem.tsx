import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import colors from '../../assets/colors';
import dimensions from '../../assets/dimensions';
import { IContact } from '../../types/services';

interface IProps extends IContact {
    onPress: () => void;
}

const ContactsListItem: FC<IProps> = props => {
    const { name, avatar, phone, onPress } = props;

    return (<TouchableHighlight
        underlayColor={colors.grey}
        style={styles.container}
        onPress={onPress}
    >
        <View style={styles.contactInfo}>
            <Image
                style={styles.avatar}
                source={{ uri: avatar }}
            />

            <View style={styles.details}>
                <Text style={[styles.title]}>{name}</Text>
                <Text style={styles.subtitle}>{phone}</Text>
            </View>
        </View>
    </TouchableHighlight>);

};

const styles = StyleSheet.create({
    container: {
        paddingLeft: dimensions.space,
    },
    contactInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: dimensions.mediumSpace,
        paddingBottom: dimensions.mediumSpace,
        paddingRight: dimensions.space,
        borderBottomColor: colors.grey,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    avatar: {
        borderRadius: 22,
        width: 44,
        height: 44,
    },
    details: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: dimensions.horizontal,
    },
    title: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 16,
    },
    subtitle: {
        color: colors.blue,
        fontSize: 15,
        marginTop: dimensions.miniSpace,
    },
});

export default ContactsListItem;
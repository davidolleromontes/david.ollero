// import EmptyContent from '../../components/empty/simple';
// import Navigator from '../../utils/navigation';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import colors from '../assets/colors';
import dimensions from '../assets/dimensions';
import Button from '../components/buttons/simple';
import Container from '../components/container';
import SwitchItem from '../components/items/switchItem';
import Separator from '../components/separators/simple';
import Header from '../components/tabNav/header';
import { getNavigationContext } from '../utils/context';
import sleep from '../utils/sleep';

interface IField {
    value: boolean;
    isError: boolean;
    message: string;
}

interface IForm {
    pushNotifications: IField;

    chatMessage: IField;
    groupMessage: IField;
    exclusiveActivityMessage: IField;

    newActivity: IField;
    activityDeleted: IField;
    activityChanges: IField;

    newDiverInActivity: IField;
    bookingCancelled: IField;

    activityConfirmed: IField;
    activityDone: IField;
    activityFinished: IField;

    staffConfirmed: IField;
    staffRejected: IField;
}

const Options: FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [fields, setFields] = useState<any>({
        pushNotifications: { value: false, isError: false, message: '' },
        chatMessage: { value: false, isError: false, message: '' },
        groupMessage: { value: true, isError: false, message: '' },
        exclusiveActivityMessage: { value: false, isError: false, message: '' },
        newActivity: { value: true, isError: false, message: '' },
        activityDeleted: {
            value: false,
            isError: false,
            message: '',
        },
        activityChanges: {
            value: true,
            isError: false,
            message: '',
        },
        newDiverInActivity: {
            value: true,
            isError: false,
            message: '',
        },
        bookingCancelled: {
            value: false,
            isError: false,
            message: '',
        },
        activityConfirmed: {
            value: false,
            isError: false,
            message: '',
        },
        activityDone: {
            value: true,
            isError: false,
            message: '',
        },
        activityFinished: {
            value: false,
            isError: false,
            message: '',
        },
        staffConfirmed: {
            value: false,
            isError: false,
            message: '',
        },
        staffRejected: {
            value: true,
            isError: false,
            message: '',
        },
    });

    const [t] = useTranslation();

    const navigation = getNavigationContext();
    // const parent = navigation.dangerouslyGetParent();
    // const tabNav = parent ? parent.dangerouslyGetParent() : undefined;

    // useEffect(() => {
    //     if (tabNav) {
    //         tabNav.setParams({ color: colors.black });
    //         tabNav.setParams({ backgroundColor: colors.white });
    //     }
    // }, []);

    const onPressSwitch = (key: string) => {
        const obj = fields[key];
        setFields({ ...fields, [key]: { ...obj, value: !obj.value } });
    };

    const onSave = async () => { setLoading(true); await sleep(500); setLoading(false) };

    return (
        <Container style={styles.container}>
            <Header title={t('options')} isVisibleBackIcon={true} />
            <View style={styles.containerScrollView}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={styles.title}>{t('options.notifications')}</Text>
                        <SwitchItem
                            title={t('options.pauseNotifications')}
                            selected={fields.pushNotifications.value}
                            onPress={() => onPressSwitch('pushNotifications')}
                        />
                    </View>
                    <View style={styles.containerSection}>
                        <Text style={styles.titleSection}>{t('options.messages')}</Text>
                        <Separator style={styles.separator} />
                        <SwitchItem
                            componentStyle={styles.switchItem}
                            title={t('options.chatMessage')}
                            info={t('options.chatMessageInfo')}
                            selected={fields.chatMessage.value}
                            onPress={() => onPressSwitch('chatMessage')}
                        />
                        <SwitchItem
                            componentStyle={styles.switchItem}
                            title={t('options.groupMessage')}
                            info={t('options.groupMessageInfo')}
                            selected={fields.groupMessage.value}
                            onPress={() => onPressSwitch('groupMessage')}
                        />
                        <SwitchItem
                            title={t('options.exclusiveActivityMessage')}
                            info={t('options.exclusiveActivityMessageInfo')}
                            selected={fields.exclusiveActivityMessage.value}
                            onPress={() => onPressSwitch('exclusiveActivityMessage')}
                        />
                    </View>
                    <View style={styles.containerSection}>
                        <Text style={styles.titleSection}>{t('options.activities')}</Text>
                        <Separator style={styles.separator} />
                        <SwitchItem
                            componentStyle={styles.switchItem}
                            title={t('options.newActivity')}
                            info={t('options.newActivityInfo')}
                            selected={fields.newActivity.value}
                            onPress={() => onPressSwitch('newActivity')}
                        />
                        <SwitchItem
                            componentStyle={styles.switchItem}
                            title={t('options.activityDeleted')}
                            info={t('options.activityDeletedInfo')}
                            selected={fields.activityDeleted.value}
                            onPress={() => onPressSwitch('activityDeleted')}
                        />
                        <SwitchItem
                            title={t('options.activityChanges')}
                            info={t('options.activityChangesInfo')}
                            selected={fields.activityChanges.value}
                            onPress={() => onPressSwitch('activityChanges')}
                        />
                    </View>
                    <View style={styles.containerSection}>
                        <Text style={styles.titleSection}>{t('options.diver')}</Text>
                        <Separator style={styles.separator} />
                        <SwitchItem
                            componentStyle={styles.switchItem}
                            title={t('options.newDiverInActivity')}
                            info={t('options.newDiverInActivityInfo')}
                            selected={fields.newDiverInActivity.value}
                            onPress={() => onPressSwitch('newDiverInActivity')}
                        />
                        <SwitchItem
                            title={t('options.bookingCancelled')}
                            info={t('options.bookingCancelledInfo')}
                            selected={fields.bookingCancelled.value}
                            onPress={() => onPressSwitch('bookingCancelled')}
                        />
                    </View>
                    <View style={styles.containerSection}>
                        <Text style={styles.titleSection}>{t('options.stateChange')}</Text>
                        <Separator style={styles.separator} />
                        <SwitchItem
                            componentStyle={styles.switchItem}
                            title={t('options.activityConfirmed')}
                            info={t('options.activityConfirmedInfo')}
                            selected={fields.activityConfirmed.value}
                            onPress={() => onPressSwitch('activityConfirmed')}
                        />
                        <SwitchItem
                            componentStyle={styles.switchItem}
                            title={t('options.activityDone')}
                            info={t('options.activityDoneInfo')}
                            selected={fields.activityDone.value}
                            onPress={() => onPressSwitch('activityDone')}
                        />
                        <SwitchItem
                            title={t('options.activityFinished')}
                            info={t('options.activityFinishedInfo')}
                            selected={fields.activityFinished.value}
                            onPress={() => onPressSwitch('activityFinished')}
                        />
                    </View>
                    <View style={styles.containerSection}>
                        <Text style={styles.titleSection}>{t('options.instructors')}</Text>
                        <Separator style={styles.separator} />
                        <SwitchItem
                            componentStyle={styles.switchItem}
                            title={t('options.staffConfirmed')}
                            info={t('options.staffConfirmedInfo')}
                            selected={fields.staffConfirmed.value}
                            onPress={() => onPressSwitch('staffConfirmed')}
                        />
                        <SwitchItem
                            title={t('options.staffRejected')}
                            info={t('options.staffRejectedInfo')}
                            selected={fields.staffRejected.value}
                            onPress={() => onPressSwitch('staffRejected')}
                        />
                    </View>

                    <View style={styles.containerBottom}>
                        <Button
                            onPress={onSave}
                            style={styles.button}
                            loading={isLoading}
                        >
                            {t('saveChanges')}
                        </Button>
                    </View>
                </ScrollView>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 88,
    },
    containerScrollView: { paddingHorizontal: dimensions.horizontal, marginBottom: dimensions.horizontal * 2 },
    title: {
        color: colors.black,
        marginTop: dimensions.vertical,
        marginBottom: dimensions.horizontal,
    },
    containerSection: { marginTop: dimensions.horizontalBig },
    titleSection: {
        color: colors.black,
        textTransform: 'uppercase',
    },
    switchItem: { marginBottom: dimensions.space },
    separator: { marginTop: dimensions.miniSpace * 2, marginBottom: dimensions.horizontal },
    containerBottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: dimensions.verticalExtraBig,
        marginBottom: dimensions.spaceBig,
    },
    button: { marginTop: dimensions.space },
});

export default Options;
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import colors from '../assets/colors';
import Container from '../components/container';
import DetailListItem from '../components/detailListItem';
import EmployeeThumbnail from '../components/employeeThumbnail';
import Header from '../components/tabNav/header';
import { IEmployee } from '../types/services';
import { getNavigationContext } from '../utils/context';

const employeeDefault = { id: "", name: "", avatar: "", phone: "", cell: "", email: "", favorite: false };

const Profile: FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [employee, setEmployee] = useState<IEmployee>(employeeDefault);

    const { id, avatar, name, email = "", phone = "", cell = "" } = employee;

    const [t] = useTranslation();

    const navigation = getNavigationContext();
    const parent = navigation.dangerouslyGetParent();
    const tabNav = parent ? parent.dangerouslyGetParent() : undefined;

    useEffect(() => {
        if (tabNav) {
            tabNav.setParams({ color: colors.black });
            tabNav.setParams({ backgroundColor: colors.white });
        }
    }, []);

    const load = async () => {
        setLoading(false);
        const id = navigation.getParam('id');
        const employees: IEmployee[] = navigation.getParam('employees');

        const employee = employees.find(e => e.id === id);
        if (employee) setEmployee({ ...employee });

        setLoading(true);
    };

    useEffect(() => {
        load()
    }, []);


    return (
        <Container style={styles.container}>
            <Header title={t('profile')} isVisibleBackIcon={true} />
            <View style={styles.avatarSection}>
                <EmployeeThumbnail
                    id={id}
                    avatar={avatar}
                    name={name}
                    phone={phone}
                />
            </View>
            <View style={styles.detailsSection}>
                <DetailListItem
                    icon="mail"
                    title={t("email")}
                    subtitle={email}
                />
                <DetailListItem
                    icon="phone"
                    title={t("work")}
                    subtitle={phone}
                />
                <DetailListItem
                    icon="smartphone"
                    title={t("personal")}
                    subtitle={cell}
                />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue,
    },
    detailsSection: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default Profile;
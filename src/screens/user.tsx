import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';

import colors from '../assets/colors';
import Container from '../components/container';
import EmployeeThumbnail from '../components/employeeThumbnail';
import Loader from '../components/loader';
import Header from '../components/tabNav/header';
import { IEmployee } from '../types/services';
import { fetchUserContact } from '../utils/api';
import { getNavigationContext } from '../utils/context';

const employeeDefault = { id: "", name: "", avatar: "", phone: "", cell: "", email: "", favorite: false };


const User: FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<IEmployee>(employeeDefault);

    const { id, avatar, name, phone } = user;

    const [t] = useTranslation();

    const load = async () => {
        setLoading(true);
        const u = await fetchUserContact();
        setUser({ ...u });
        setLoading(false);
    };

    useEffect(() => {
        load()
    }, []);

    return (
        <Container style={styles.container}>
            <Header title={t('me')} isVisibleIcons={true} />
            <View style={styles.container}>
                {isLoading ? (
                    <Loader color={colors.white} />
                ) : (
                        <EmployeeThumbnail
                            id={id}
                            avatar={avatar}
                            name={name}
                            phone={phone}
                        />
                    )}
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue,
    },
});

export default User;
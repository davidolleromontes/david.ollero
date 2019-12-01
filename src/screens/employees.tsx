import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';

import Container from '../components/container';
import EmployeesListItem from '../components/items/employeesListItem';
import Loader from '../components/loader';
import Header from '../components/tabNav/header';
import { IEmployee } from '../types/services';
import { fetchContacts } from '../utils/api';
import Navigation, { routeNames } from '../utils/navigation';

const Employees: FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isReloading] = useState<boolean>(false);
    const [employeesList, setEmployeesList] = useState<IEmployee[]>([]);

    const [t] = useTranslation();

    const load = async () => {
        setLoading(true);
        const employees = await fetchContacts();
        setEmployeesList([...employees]);
        setLoading(false);
    };

    useEffect(() => {
        load()
    }, []);

    const onPressEmployeeItem = (id: string) => { Navigation.navigate(routeNames.Profile, { id, employees: employeesList }); };

    const renderEmployee = (item: IEmployee) => {
        const { id, name, avatar, phone } = item;
        return (
            <EmployeesListItem id={id} name={name} avatar={avatar} phone={phone} onPress={() => onPressEmployeeItem(id)} />
        );
    };

    return (
        <Container style={styles.container}>
            <Header title={t('employees')} />
            <View style={{ flex: 1 }}>
                {isLoading ? (
                    <Loader />
                ) : (
                        <View>
                            <FlatList
                                style={{ opacity: !isReloading ? 1 : 0.5 }}
                                data={employeesList}
                                renderItem={({ item }) => renderEmployee(item)}
                                // onEndReached={() => onLoadMore()}
                                keyExtractor={({ id }) => id}
                            // ListEmptyComponent={() => <EmptyContent content="" />}
                            />
                            {isReloading && <Loader />}
                        </View>
                    )}
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: dimensions.horizontal,
        // marginTop: 88,
    },
});

export default Employees;
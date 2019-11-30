import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';

import colors from '../assets/colors';
import Container from '../components/container';
import ContactsListItem from '../components/items/contactsListItem';
import Loader from '../components/loader';
import Header from '../components/tabNav/header';
import { IContact } from '../types/services';
import { fetchContacts } from '../utils/api';
import Navigation, { routeNames } from '../utils/navigation';

const Contacts: FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isReloading] = useState<boolean>(false);
    const [contactsList, setContactsList] = useState<IContact[]>([]);

    const [t] = useTranslation();

    const load = async () => {
        setLoading(true);
        const contacts = await fetchContacts();
        setContactsList([...contacts]);
        setLoading(false);
    };

    useEffect(() => {
        load()
    }, []);

    const onPressContactItem = (id: string) => { Navigation.navigate(routeNames.Profile, { id, employees: contactsList }); };

    const renderContact = (item: IContact) => {
        const { id = "", name, avatar, phone } = item;
        return (
            <ContactsListItem name={name} avatar={avatar} phone={phone} onPress={() => onPressContactItem(id)} />
        );
    };

    return (
        <Container style={styles.container}>
            <Header title={t('Employees')} />
            <View style={{ flex: 1 }}>
                {isLoading ? (
                    <Loader />
                ) : (
                        <View>
                            <FlatList
                                style={{ opacity: !isReloading ? 1 : 0.5 }}
                                data={contactsList}
                                renderItem={({ item }) => renderContact(item)}
                                // onEndReached={() => onLoadMore()}
                                keyExtractor={({ phone }) => phone}
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

export default Contacts;
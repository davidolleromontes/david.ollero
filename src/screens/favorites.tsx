import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';

import Container from '../components/container';
import EmployeeThumbnail from '../components/employeeThumbnail';
import Loader from '../components/loader';
import Header from '../components/tabNav/header';
import { IEmployee } from '../types/services';
import { fetchContacts } from '../utils/api';
import Navigation, { routeNames } from '../utils/navigation';

const Favorites: FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isReloading] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<IEmployee[]>([]);

    const [t] = useTranslation();

    const load = async () => {
        setLoading(true);
        const favoritesList = await fetchContacts();
        console.log('favoritesList', favoritesList);
        setFavorites([...favoritesList]);
        setLoading(false);
    };

    useEffect(() => {
        load()
    }, []);

    const onPressFavoriteThumbnail = (id: string) => { Navigation.navigate(routeNames.Profile, { id, employees: favorites }); };

    const renderFavoriteThumbnail = (item: IEmployee) => {
        const { id, avatar } = item;
        return (
            <EmployeeThumbnail
                id={id}
                avatar={avatar}
                onPress={() => onPressFavoriteThumbnail(id)}
            />);
    };

    return (
        <Container style={styles.container}>
            <Header title={t('Favorites')} />
            <View style={{ flex: 1 }}>
                {isLoading ? (
                    <Loader />
                ) : (
                        <View>
                            <FlatList
                                style={{ opacity: !isReloading ? 1 : 0.5 }}
                                data={favorites}
                                numColumns={3}
                                renderItem={({ item }) => renderFavoriteThumbnail(item)}
                                contentContainerStyle={styles.list}
                                keyExtractor={({ id }) => id}
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
    },
    list: {
        alignItems: 'center',
    },
});

export default Favorites;
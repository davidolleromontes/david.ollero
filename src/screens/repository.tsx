import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, TextInput, ScrollView, Alert } from 'react-native';

import colors from '../assets/colors';
import Container from '../components/container';
import Loader from '../components/loader';
import Header from '../components/tabNav/header';
import dimensions from '../assets/dimensions';
import Button from '../components/buttons/simple';
import { getUserRepos } from '../services/services';


const Repository: FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string>();
    const [repository, setRepository] = useState<any[]>([]);

    const [t] = useTranslation();

    const handleInputChange = (text: string) => { setUsername(text); }

    const handleInputSubmit = () => {
        setLoading(true);
        getUserRepos(username)
            .then((res: string[]) => {
                console.log(res);
                setRepository([...res]);
                setLoading(false)
            }).catch((e) => { setLoading(false); setRepository([]); Alert.alert(t('repository.noRepositoryFound')) });
    }

    const renderRepository = () => {
        return (
            <ScrollView style={styles.scrollview}>
                {
                    repository.map((repo, i) => {
                        return (
                            <View key={i}>
                                <Text>{i}, {JSON.stringify(repo.full_name)}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
        )
    }

    return (
        <Container style={styles.container}>
            <Header title={t('repository')} />
            <View style={styles.body}>
                <Text style={styles.label}>{t('repository.username')}</Text>
                <TextInput
                    placeholder={t('repository.usernamePlaceholder')}
                    style={styles.input}
                    onChangeText={handleInputChange}
                />
                <Button
                    onPress={handleInputSubmit}
                    style={styles.button}
                    fontStyles={styles.fontStyleButton}
                    inactive={!username}
                >
                    {t('view')}
                </Button>

                <View style={{ flex: 1 }}>
                    {isLoading ? (
                        <Loader />
                    ) : (
                            renderRepository()
                        )}
                </View>
            </View>
        </Container >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: { flex: 1, paddingHorizontal: dimensions.horizontal, paddingTop: dimensions.horizontal },
    label: {
        fontSize: 12,
        marginBottom: 6,
    },
    input: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.04)',
        borderRadius: dimensions.radius,
        paddingVertical: dimensions.miniSpace,
        paddingHorizontal: dimensions.space / 2,
        backgroundColor: 'rgba(0,0,0,0.02)',
    },
    button: { marginTop: dimensions.horizontal / 2, height: dimensions.buttonHeight / 2 },
    fontStyleButton: {
        textTransform: 'uppercase',
    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
        alignSelf: 'center',
    },
    scrollview: { marginTop: dimensions.horizontal }
});

export default Repository;
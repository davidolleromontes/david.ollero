import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, BackHandler, Image, StyleSheet, TouchableHighlight, View } from 'react-native';

import colors from '../assets/colors';
import Container from '../components/container';
import MessageList from '../components/messageList';
import Toolbar from '../components/toolbar/toolbar';
import { IMessageShape } from '../types/types';
import { createImageMessage, createTextMessage } from '../utils/messageUtils';

const messagesDefault = [createImageMessage('https://unsplash.it/300/300'),
createTextMessage('World'),
createTextMessage('Hello'),]

const Messages: FC = () => {
    const [messages, setMessages] = useState<IMessageShape[]>(messagesDefault)
    const [fullScreenImageId, setFullScreenImageId] = useState<String | null>();
    const [isInputFocused, setInputFocused] = useState<boolean>(false);

    const [t] = useTranslation();

    // With the BackHandler we want to handle the back button 
    useEffect(() => {
        const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                if (fullScreenImageId) {
                    dismissFullScreenImage();
                    return true;
                }
                return false;
            },
        );

        return () => { subscription.remove() }
    })

    const handlePressMessage = ({ id, type }: IMessageShape) => {
        switch (type) {
            case 'text':
                Alert.alert(
                    t('messages.deleteMessage'),
                    t('messages.infoDeleteMessage'),
                    [
                        {
                            text: t('cancel'),
                            style: 'cancel',
                        },
                        {
                            text: t('delete'),
                            style: 'destructive',
                            onPress: () => {
                                setMessages(messages.filter(message => message.id !== id))
                            },
                        },
                    ],
                );
                break;
            case 'image':
                setFullScreenImageId(id);
                setInputFocused(false);
                break;
            default:
                break;
        }
    };

    const dismissFullScreenImage = () => {
        setFullScreenImageId(null);
    }

    const handlePressToolbarCamera = () => {

    }

    const handleChangeFocus = (isFocused: boolean) => {
        setInputFocused(isFocused);
    }

    const handleSubmit = (text: string) => {
        setMessages([createTextMessage(text), ...messages]);
    };

    const renderFullScreenImage = () => {
        if (!fullScreenImageId) return null;
        const image = messages.find(
            message => message.id === fullScreenImageId,
        );
        if (!image) return null;
        const { uri } = image;
        return (
            <TouchableHighlight
                style={styles.fullscreenOverlay}
                onPress={dismissFullScreenImage}
            >
                <Image style={styles.fullscreenImage} source={{ uri }} />
            </TouchableHighlight>
        );
    }

    const renderMessageList = () => {
        return (
            <View style={styles.content}>
                <MessageList
                    messages={messages}
                    onPressMessage={handlePressMessage}
                />
            </View>
        );
    }
    const renderInputMethodEditor = () => {
        return (
            <View style={styles.inputMethodEditor}></View>
        );
    }
    const renderToolbar = () => {
        return (
            <View style={styles.toolbar}>
                <Toolbar
                    isFocused={isInputFocused}
                    onSubmit={handleSubmit}
                    onChangeFocus={handleChangeFocus}
                    onPressCamera={handlePressToolbarCamera}
                />
            </View>
        );
    }


    return (
        <Container style={styles.container}>
            {renderMessageList()}
            {renderToolbar()}
            {renderInputMethodEditor()}
            {renderFullScreenImage()}
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: colors.white,
    },
    inputMethodEditor: {
        // flex: 1,
        backgroundColor: colors.white,
    },
    toolbar: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.04)',
        backgroundColor: colors.white,
    },
    fullscreenOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
        zIndex: 2,
    },
    fullscreenImage: {
        flex: 1,
        resizeMode: 'contain',
    },
});

export default Messages;
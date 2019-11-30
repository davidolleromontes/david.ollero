import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';


import colors from '../assets/colors';
import dimensions from '../assets/dimensions';
import { IMessageShape } from '../types/types';

export interface IProps {
    messages: IMessageShape[];
    onPressMessage: (item: IMessageShape) => void;
}

const MessageList: FC<IProps> = props => {
    const { messages, onPressMessage } = props;

    const renderMessageBody = ({ type, text, uri }: IMessageShape) => {
        switch (type) {
            case 'text':
                return (
                    <View style={styles.messageBubble}>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                );
            case 'image':
                return <Image style={styles.image} source={{ uri }} />;
            default:
                return null;
        }
    };

    const renderMessageItem = (item: IMessageShape) => {
        return (
            <View key={item.id} style={styles.messageRow}>
                <TouchableOpacity onPress={() => onPressMessage(item)}>
                    {renderMessageBody(item)}
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <FlatList
            style={styles.container}
            inverted
            data={messages}
            renderItem={({ item }) => renderMessageItem(item)}

            keyExtractor={({ id }) => id}
            keyboardShouldPersistTaps={'handled'}
        />
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'visible',
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: dimensions.miniSpace,
        marginRight: dimensions.horizontal / 2,
        marginLeft: dimensions.horizontal * 3,
    },
    messageBubble: {
        paddingVertical: dimensions.horizontal / 4,
        paddingHorizontal: dimensions.horizontal / 2,
        backgroundColor: 'rgb(16,135,255)',
        borderRadius: dimensions.radius * 4,
    },
    text: {
        fontSize: 18,
        color: colors.white,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: dimensions.radius * 2,
    },
    map: {
        width: 250,
        height: 250,
        borderRadius: dimensions.radius * 2,
    },
});

export default MessageList;
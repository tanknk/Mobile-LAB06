import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { MessageShape } from '../utils/MessageUtils';
import MapView from 'react-native-maps';


const keyExtractor = item => item.id.toString();
export default class MessageList extends React.Component {
    static propTypes = {
        messages: PropTypes.number.isRequired,
        onPressMessage: PropTypes.number.isRequired,
    };
    state = {
        messages: this.props.messages,
    }
    deleteAlert = (id) =>
        Alert.alert(
            "Delete message?",
            "Are you sure you want to permanently delete this message?",
            [
                {
                    text: "CANCEL",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "DELETE", onPress: () => {
                        this.setState({
                            messages: this.state.messages.filter(obj => obj.id != id)
                        })
                    }
                }
            ],
            { cancelable: false }
        );


    render() {
        const TextMessage = ({ text }) => {
            return (
                <View style={styles.messageBubble}>
                    <Text style={styles.textMessage}>{text}</Text>
                </View>
            );
        }
        const ImageMessage = ({ uri }) => (
            <Image
                style={styles.imageMessage}
                source={{
                    uri: uri
                }}
            />
        );
        const MapMessage = ({ coordinate }) => (
            <Image
                style={styles.mapMessage}
                source={require("../assets/map.jpg")}
            />
            /* เนื่องจากโจทย์ในเอกสารประกอบแลป ระบุว่าให้เขียนโปรแกรมเพื่อรับส่งข้อความและรูปภาพ จึงเข้าใจได้ว่าส่วนของแผนที่ไว้ทำในแลปชั่วโมงหน้าครับ 
            ตอนนี้ผมเลยเอารูปแผนที่ที่ได้เตรียมไว้มาใส่แทนที่ไว้ก่อนครับ*/
        );
        const renderItem = ({ item }) => {
            let itemBlock;
            if (item.type === 'text') {
                itemBlock = (<TextMessage text={item.text} />)
            }
            else if (item.type === 'image') {
                itemBlock = (<ImageMessage uri={item.uri} />)
            } else {
                itemBlock = (<MapMessage coordinate={item.coordinate} />)
            }
            return (
                <TouchableOpacity onPress={() => { this.deleteAlert(item.id) }}>
                    <View style={styles.message}>
                        {itemBlock}
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <FlatList
                data={this.state.messages}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        );
    }
}

const styles = StyleSheet.create({
    message: {
        marginTop: 8,
        marginRight: 10,
        marginLeft: 10,
        paddingHorizontal: 10,
        paddingVertical: 0,
    },
    imageMessage: {
        width: "50%",
        resizeMode: "contain",
        height: undefined,
        aspectRatio: 1,
        alignSelf: 'flex-end',
    },
    textMessage: {
        borderRadius: 5,
        flexDirection: 'row',
        flex: 1,
        color: "white",
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 20
    },
    messageBubble: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'rgb(16,135,255)',
        borderRadius: 20,
        width: '30%',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    mapMessage: {
        width: "80%",
        resizeMode: "contain",
        height: undefined,
        aspectRatio: 1,
        alignSelf: 'flex-end',
    }
});
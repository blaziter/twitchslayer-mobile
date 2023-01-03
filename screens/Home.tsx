import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, Pressable, View, TouchableWithoutFeedback } from 'react-native';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { increment, incrementByAmount } from '../redux/reducers/goldsReducer';

const Home = () => {
    const golds = useAppSelector(state => state.golds.value);
    const gps = useAppSelector(state => state.golds.gps);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(incrementByAmount(gps))
        }, 1000)
        return () => clearInterval(interval)
    })

    return (
        <View nativeID='container' style={styles.container}>
            <View nativeID='golds-container' style={styles.goldContainer}>
                <View nativeID='golds' style={styles.golds}>
                    <Text nativeID='counter' style={styles.counter}>Golds {golds}</Text>
                    <Text nativeID='gps' style={styles.gps}>Golds per second: 0</Text>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={() => dispatch(increment())}>
                <Image source={require('../assets/skins/Twitch_0.jpg')} style={styles.twitch} />
            </TouchableWithoutFeedback>
            <View nativeID='items-spells' style={styles.itemsSpells}>
                <View nativeID='items'>
                    <Text nativeID='items-text' style={styles.itemsText}>Items</Text>
                    <View nativeID='items-container' style={styles.itemsContainer}>
                        <View nativeID='item-row' style={styles.itemRow}>
                            <View nativeID='item' style={styles.item}>
                                <Image style={styles.icon} source={require('../assets/item/7050.png')} />
                            </View>
                            <View nativeID='item' style={styles.item}>
                                <Image style={styles.icon} source={require('../assets/item/7050.png')} />
                            </View>
                            <View nativeID='item' style={styles.item}>
                                <Image style={styles.icon} source={require('../assets/item/7050.png')} />
                            </View>
                        </View>
                        <View nativeID='item-row' style={styles.itemRow}>
                            <View nativeID='item' style={styles.item}>
                                <Image style={styles.icon} source={require('../assets/item/7050.png')} />
                            </View>
                            <View nativeID='item' style={styles.item}>
                                <Image style={styles.icon} source={require('../assets/item/7050.png')} />
                            </View>
                            <View nativeID='item' style={styles.item}>
                                <Image style={styles.icon} source={require('../assets/item/7050.png')} />
                            </View>
                        </View>
                    </View>
                </View>
                <View nativeID='spells'>
                    <Text nativeID='spells-text' style={styles.spellsText}>Spells</Text>
                    <View nativeID='spells-container' style={styles.spellsContainer}>
                        <View nativeID='spell' style={styles.spell}>
                            <Image style={styles.icon} source={require('../assets/item/7050.png')} />
                        </View>
                        <View nativeID='spell' style={styles.spell}>
                            <Image style={styles.icon} source={require('../assets/item/7050.png')} />
                        </View>
                        <View nativeID='spell' style={styles.spell}>
                            <Image style={styles.icon} source={require('../assets/item/7050.png')} />
                        </View>
                        <View nativeID='spell' style={styles.spell}>
                            <Image style={styles.icon} source={require('../assets/item/7050.png')} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 64,
        height: 64
    },
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        alignItems: 'center',
        justifyContent: 'center',
    },
    goldContainer: {
        width: '100%',
        marginBottom: 125,
    },
    golds: {
        backgroundColor: '#1E1E1E',
        marginRight: 10,
        marginLeft: 10,
        padding: 10
    },
    twitch: {
        minWidth: 256,
        width: 256,
        minHeight: 256,
        height: 256,
    },
    counter: {
        color: '#fff',
        fontFamily: 'Spiegel-Regular',
        textAlign: 'center'
    },
    gps: {
        color: '#fff',
        fontFamily: 'Spiegel-Regular-Italic',
        textAlign: 'center'
    },
    itemsSpells: {
        display: 'flex',
        marginTop: 125,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    itemsText: {
        color: '#fff',
        textAlign: 'center',
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    itemRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    item: {
        width: 66,
        height: 66,
        borderColor: '#fff',
        borderWidth: 1
    },
    spellsText: {
        color: '#fff',
        textAlign: 'center',
    },
    spellsContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    spell: {
        width: 66,
        height: 66,
        borderColor: '#fff',
        borderWidth: 1
    }
});

export default Home;
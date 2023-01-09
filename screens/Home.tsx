import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableWithoutFeedback, ImageEditor } from 'react-native';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { increment, incrementByAmount, incrementByGps } from '../redux/reducers/goldsReducer';
import { formatNumber } from '../hooks/numberFormatter';

const Home = () => {
    const golds = useAppSelector(state => state.golds.value);
    const gps = useAppSelector(state => state.golds.gps);
    const click = useAppSelector(state => state.golds.click);
    const inventory = useAppSelector(state => state.golds.inventory);
    const AH = useAppSelector(state => state.golds.AH);
    const crit = useAppSelector(state => state.golds.crit);
    const [showGolds, setShowGolds] = useState('');
    const [showGps, setShowGps] = useState('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(`adding ${gps} golds`)
            gps ? dispatch(incrementByGps(gps)) : null
            setShowGolds(formatNumber(golds))
            setShowGps(formatNumber(gps))
        }, 1000)
        return () => clearInterval(interval)
    })

    const handleClick = () => {
        Math.random() < crit ? dispatch(incrementByAmount(click * 2)) : dispatch(incrementByAmount(click))
    }

    return (
        <View nativeID='container' style={styles.container}>
            <View nativeID='golds-container' style={styles.goldContainer}>
                <View nativeID='golds' style={styles.golds}>
                    <Text nativeID='counter' style={styles.counter}>Golds {golds < 1000 ? golds : showGolds}</Text>
                    <Text nativeID='gps' style={styles.gps}>Golds per second: {gps < 1000 ? gps : showGps}</Text>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={() => click > 1 ? handleClick() : dispatch(increment())}>
                <Image source={require('../assets/skins/Twitch_0.jpg')} style={styles.twitch} />
            </TouchableWithoutFeedback>
            <View nativeID='items-spells' style={styles.itemsSpells}>
                <View nativeID='items'>
                    <Text nativeID='items-text' style={styles.itemsText}>Items</Text>
                    <View nativeID='items-container' style={styles.itemsContainer}>
                        <View nativeID='item-row' style={styles.itemRow}>
                            {
                                inventory.slice(0, 3).map(item => {
                                    return (
                                        <View nativeID='item' style={styles.item}>
                                            <Image style={styles.icon} source={item.image} />
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View nativeID='item-row' style={styles.itemRow}>
                            {
                                inventory.slice(3, 6).map(item => {
                                    return (
                                        <View nativeID='item' style={styles.item}>
                                            <Image style={styles.icon} source={item.image} />
                                        </View>
                                    )
                                })
                            }
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
        marginBottom: 50,
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
        marginTop: 100,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
        marginTop: 25
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
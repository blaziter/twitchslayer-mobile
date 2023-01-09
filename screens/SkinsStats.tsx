import React, { useEffect } from 'react';
import { Image, ImageSourcePropType, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View, VirtualizedList } from 'react-native';
import { formatNumber } from '../hooks/numberFormatter';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
//@ts-ignore
import * as skins from '../assets/skins/';
import { currentSkin, decrementByAmount } from '../redux/reducers/goldsReducer';
import { add, useSkin } from '../redux/reducers/skinsReducer';

interface SkinProps {
    name: string,
    image: ImageSourcePropType,
    price: number,
    buy: boolean,
    use: boolean,
}

const SkinsStats = () => {
    const golds = useAppSelector(state => state.golds.value);
    const gps = useAppSelector(state => state.golds.gps);
    const click = useAppSelector(state => state.golds.click);
    const AD = useAppSelector(state => state.golds.AD);
    const AP = useAppSelector(state => state.golds.AP);
    const AH = useAppSelector(state => state.golds.AH);
    const crit = useAppSelector(state => state.golds.crit);
    const useSkins = useAppSelector(state => state.useSkins);
    const dispatch = useAppDispatch();

    const DATA = useSkins

    interface renderProps {
        item: {
            name: string,
            image: ImageSourcePropType,
            price: number,
            buy: boolean,
            use: boolean,
        }
    }

    const Champion = ({ name, image, price, use, buy }: SkinProps) => (
        <SafeAreaView style={styles.championsContainer}>
            <View style={styles.champion}>
                <TouchableWithoutFeedback onPress={() => {
                    if (golds >= price) {
                        dispatch(decrementByAmount(price))
                        dispatch(add(name))
                    }
                }}>
                    <Image source={skins[image]} style={styles.icon} />
                </TouchableWithoutFeedback>
                <View style={styles.championData}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.price}>{formatNumber(price)} golds</Text>
                </View>
            </View>
            {
                buy ?
                    use ?
                        <View style={styles.equippedButton}>
                            <Text style={{ color: '#fff', textAlign: 'center' }}>Equipped</Text>
                        </View>
                        :
                        <TouchableWithoutFeedback onPress={() => {
                            dispatch(useSkin(name))
                            dispatch(currentSkin(image.toString()))
                        }}>
                            <View style={styles.buyButton}>
                                <Text style={{ color: '#fff', textAlign: 'center' }}>Equip</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    :
                    <TouchableWithoutFeedback onPress={() => {
                        if (golds >= price) {
                            dispatch(decrementByAmount(price))
                            dispatch(add(name))
                        }
                    }}>
                        <View style={styles.buyButton}>
                            <Text style={{ color: '#fff', textAlign: 'center' }}>Buy {name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
            }
        </SafeAreaView>
    );

    const renderChampion = ({ item }: renderProps) => (
        <Champion name={item.name} image={item.image} price={item.price} use={item.use} buy={item.buy} />
    );

    useEffect(() => {
        console.log(skins)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View nativeID='stats-container' style={styles.statsContainer}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>Skins & Stats!</Text>
                <View style={styles.statsItem}>
                    <View>
                        <Text style={{ color: '#fff', minWidth: 128, textAlign: 'center' }}>Golds: {formatNumber(golds)}</Text>
                        <Text style={{ color: '#fff', minWidth: 128, textAlign: 'center' }}>Golds per second: {formatNumber(gps)}</Text>
                        <Text style={{ color: '#fff', minWidth: 128, textAlign: 'center' }}>Click: {formatNumber(click)}</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#fff', minWidth: 128, textAlign: 'center' }}>AD: {AD}</Text>
                        <Text style={{ color: '#fff', minWidth: 128, textAlign: 'center' }}>AP: {AP}</Text>
                        <Text style={{ color: '#fff', minWidth: 128, textAlign: 'center' }}>AH: {AH}</Text>
                    </View>
                </View>
                <Text style={{ color: '#fff', textAlign: 'center' }}>Crit: {crit}</Text>
            </View>
            <VirtualizedList
                data={DATA.skins}
                renderItem={renderChampion}
                windowSize={5}
                maxToRenderPerBatch={10}
                getItem={(data, index) => data[index]}
                getItemCount={() => DATA.skins.length}
                style={styles.championContainer}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statsContainer: {
        backgroundColor: '#1E1E1E',
        display: 'flex',
        padding: 25,
    },
    statsItem: {
        display: 'flex',
        flexDirection: 'row',
    },
    goldsContainer: {
        backgroundColor: '#1E1E1E',
        width: '95%',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    championsContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1E1E1E',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    golds: {
        marginLeft: 10,
        marginRight: 10,
        color: '#fff',
        textAlign: 'center',
        marginTop: 10
    },
    championContainer: {
        width: '100%',
        height: 100,
    },
    icon: {
        width: 64,
        height: 64,
        minHeight: 64,
        minWidth: 64,
    },
    champion: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    championData: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 25,
        marginRight: 10,
    },
    buyButton: {
        color: '#fff',
        backgroundColor: '#D93644',
        padding: 10,
        minWidth: 125,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    price: {
        color: '#fff',
    },
    name: {
        color: '#fff',
    },
    gps: {
        color: '#fff',
        fontFamily: 'Spiegel-Regular-Italic',
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    equippedButton: {
        backgroundColor: '#6B1A22',
        padding: 10,
        minWidth: 125,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    }
});

export default SkinsStats;
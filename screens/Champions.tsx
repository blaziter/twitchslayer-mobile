import React, { useEffect, useState } from 'react';
import { Image, ImageSourcePropType, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View, VirtualizedList } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { add } from '../redux/reducers/championsReducer';
import { addGps, decrementByAmount, incrementAD, incrementAP, incrementClick } from '../redux/reducers/goldsReducer';
//@ts-ignore
import * as images from '../assets/champion/';
import { formatNumber } from '../hooks/numberFormatter';

interface ChampionProps {
    title: string,
    price: number,
    count: number,
    type: string,
    image: ImageSourcePropType,
    gps: number,
    baseGps: number
}

const Champions = () => {
    const dispatch = useAppDispatch();
    const champions = useAppSelector(state => state.champions);
    const golds = useAppSelector(state => state.golds.value);
    const gps = useAppSelector(state => state.golds.gps);
    const [showGolds, setShowGolds] = useState('');
    const [showGps, setShowGps] = useState('');
    
    const DATA = champions.champions.map(champion => {
        return {
            id: champion.id,
            name: champion.name,
            price: champion.price,
            count: champion.count,
            type: champion.type,
            image: champion.image,
            gps: champion.gps,
            baseGps: champion.baseGps
        }
    })

    interface renderProps {
        item: {
            id: number,
            name: string,
            price: number,
            count: number,
            type: string,
            image: string,
            gps: number,
            baseGps: number
        }
    }

    const Champion = ({ title, price, count, type, image, gps, baseGps }: ChampionProps) => (
        <SafeAreaView style={styles.championsContainer}>
            <View style={styles.champion}>
            <TouchableWithoutFeedback onPress={() => {
                if (golds >= price) {
                    dispatch(decrementByAmount(price))
                    type == 'AD' ? dispatch(incrementClick()) : null
                    type == 'AD' ? dispatch(incrementAD()) : dispatch(incrementAP())
                    dispatch(addGps(baseGps))
                    dispatch(add(title))
                }
            }}>
                <Image source={image} style={styles.icon} />
            </TouchableWithoutFeedback>
            <View style={styles.championData}>
                <Text style={styles.name}>{title}, {type}</Text>
                <Text style={styles.price}>{formatNumber(price)} golds</Text>
                <Text style={styles.price}>{count} owned</Text>
            </View>
</View>
            <TouchableWithoutFeedback onPress={() => {
                if (golds >= price) {
                    dispatch(decrementByAmount(price))
                    type == 'AD' ? dispatch(incrementClick()) : null
                    type == 'AD' ? dispatch(incrementAD()) : dispatch(incrementAP())
                    dispatch(addGps(baseGps))
                    dispatch(add(title))
                }
            }}>
                <View style={styles.buyButton}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Buy {title}</Text>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );

    const renderChampion = ({ item }: renderProps) => (
        <Champion title={item.name} price={item.price} count={item.count} type={item.type} image={images[item.image.charAt(0).toLowerCase().concat(item.image.slice(1))]} gps={item.gps} baseGps={item.baseGps} />
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setShowGolds(formatNumber(golds))
            setShowGps(formatNumber(gps))
        }, 1000)
        return () => clearInterval(interval)
    })

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.goldsContainer}>
                <Text style={styles.golds}>
                    Golds: {golds < 1000 ? golds : showGolds}
                </Text>
                <Text style={styles.gps}>
                    Golds per second: {gps < 1000 ? gps : showGps}
                </Text>
            </View>
            <VirtualizedList
                data={DATA}
                renderItem={renderChampion}
                windowSize={5}
                maxToRenderPerBatch={10}
                getItem={(data, index) => data[index]}
                getItemCount={() => DATA.length}
                style={styles.championContainer}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        alignItems: 'center',
        justifyContent: 'center',
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
    }
});

export default Champions;
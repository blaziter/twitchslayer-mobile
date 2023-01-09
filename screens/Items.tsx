import React, { useEffect, useState } from 'react';
import { Image, ImageSourcePropType, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View, VirtualizedList } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addInventory, decrementByAmount, incrementByAD, incrementByAH, incrementByAP, incrementByCrit, incrementClick, incrementInv, removeInventory } from '../redux/reducers/goldsReducer';
//@ts-ignore
import * as images from '../assets/item/';
import { formatNumber } from '../hooks/numberFormatter';
import { add, remove } from '../redux/reducers/itemsReducer';

interface ItemProps {
    id: number,
    name: string,
    price: number,
    type: string,
    image: ImageSourcePropType,
    dmg: number,
    AH: number,
    crit: number,
    purchased: boolean,
    count: number
}

const Items = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.items);
    const gps = useAppSelector(state => state.golds.gps);
    const golds = useAppSelector(state => state.golds.value);
    const inventory = useAppSelector(state => state.golds.inventory);
    const inventoryCount = useAppSelector(state => state.golds.inventoryCount);
    const [showGolds, setShowGolds] = useState('');
    const [showGps, setShowGps] = useState('');


    const DATA = items.items.map(item => {
        return {
            id: item.id,
            name: item.name,
            price: item.price,
            type: item.type,
            image: item.image,
            dmg: item.dmg,
            AH: item.AH,
            crit: item.crit,
            purchased: item.purchased,
            count: item.count,
        }
    })

    interface renderProps {
        item: {
            id: number,
            name: string,
            price: number,
            type: string,
            image: ImageSourcePropType,
            dmg: number,
            AH: number,
            crit: number,
            purchased: boolean,
            count: number
        }
    }

    const Item = ({ id, name, price, type, image, dmg, AH, crit, count }: ItemProps) => (
        <SafeAreaView style={styles.itemsContainer}>
            <View style={styles.item}>
                <TouchableWithoutFeedback onPress={() => {
                    if (golds >= price) {
                        dispatch(decrementByAmount(price))
                        type == 'AD' ? dispatch(incrementClick()) : null
                        type == 'AD' ? dispatch(incrementByAD(dmg)) : dispatch(incrementByAP(dmg))
                        if (inventoryCount < 7) {
                            dispatch(addInventory({ id, image }))
                            dispatch(decrementByAmount(price))
                            dispatch(incrementByCrit(crit))
                            dispatch(incrementByAH(AH))
                            dispatch(incrementInv())
                            dispatch(add(name))
                        }
                    }
                }}>
                    <Image source={image} style={styles.icon} />
                </TouchableWithoutFeedback>
                <View style={styles.itemData}>
                    <Text style={styles.name}>{name}, {type}</Text>
                    <Text style={styles.price}>{formatNumber(price)} golds</Text>
                    <Text style={styles.price}>{count} owned</Text>
                </View>
            </View>

            <TouchableWithoutFeedback onPress={() => {
                if (golds >= price) {
                    dispatch(decrementByAmount(price))
                    type == 'AD' ? dispatch(incrementClick()) : null
                    type == 'AD' ? dispatch(incrementByAD(dmg)) : dispatch(incrementByAP(dmg))
                    if (inventoryCount < 7) {
                        dispatch(addInventory({ id, image }))
                        dispatch(decrementByAmount(price))
                        dispatch(incrementByCrit(crit))
                        dispatch(incrementByAH(AH))
                        dispatch(incrementInv())
                        dispatch(add(name))
                    }
                }
            }}>
                <View style={styles.buyButton}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Buy {name}</Text>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );

    const renderItem = ({ item }: renderProps) => (
        <Item key={item.id} id={item.id} name={item.name} price={item.price} type={item.type} image={images[item.image]} dmg={item.dmg} AH={item.AH} crit={item.crit} purchased={item.purchased} count={item.count} />
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
                <TouchableWithoutFeedback onPress={() => {
                    dispatch(remove())
                    dispatch(removeInventory())
                    console.log('yes')
                }}>
                    <View style={styles.buyButton}>
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Sell all items</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <VirtualizedList
                data={DATA}
                renderItem={renderItem}
                windowSize={5}
                maxToRenderPerBatch={10}
                getItem={(data, index) => data[index]}
                getItemCount={() => DATA.length}
                style={styles.itemContainer}
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
    goldsContainer: {
        backgroundColor: '#1E1E1E',
        width: '95%',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    itemsContainer: {
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
    itemContainer: {
        width: '100%',
        height: 100,
    },
    icon: {
        width: 64,
        height: 64,
        minHeight: 64,
        minWidth: 64,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    itemData: {
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

export default Items;
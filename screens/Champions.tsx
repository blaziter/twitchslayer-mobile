import React, { useEffect } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { add } from '../redux/reducers/championsReducer';
import { decrementByAmount } from '../redux/reducers/goldsReducer';

interface ChampionProps {
    title: string,
    price: number,
    count: number,
    type: string,
    image: string
}

const Champions = () => {
    const dispatch = useAppDispatch();
    const champions = useAppSelector(state => state.champions);
    const golds = useAppSelector(state => state.golds.value);

    const DATA = champions.champions.map(champion => {
        return {
            id: champion.id,
            name: champion.name,
            price: champion.price,
            count: champion.count,
            type: champion.type,
            image: champion.image
        }
    })

    interface renderProps {
        item: {
            id: number,
            name: string,
            price: number,
            count: number,
            type: string,
            image: string
        }
    }

    const Champion = ({ title, price, count, type, image }: ChampionProps) => (
        <SafeAreaView style={styles.champion}>
            <TouchableWithoutFeedback onPress={() => {
                if (golds >= price) {
                    dispatch(decrementByAmount(price))
                    dispatch(add(title))
                }
            }}>
                <Image source={require(`../assets/champion/${image}`)} style={styles.icon} />
            </TouchableWithoutFeedback>
            <View style={styles.championData}>
                <Text style={styles.name}>{title}, {type}</Text>
                <Text style={styles.price}>{price} golds</Text>
                <Text style={styles.price}>{count} owned</Text>
            </View>

            <TouchableWithoutFeedback onPress={() => {
                if (golds >= price) {
                    dispatch(decrementByAmount(price))
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
        <Champion title={item.name} price={item.price} count={item.count} type={item.type} image={item.image} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.goldsContainer}>
                <Text style={styles.golds}>
                    Golds: {golds}
                </Text>
            </View>
            <FlatList
                data={DATA}
                renderItem={renderChampion}
                windowSize={5}
                maxToRenderPerBatch={10}
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
        width: '100%',
        marginBottom: 10,
        marginTop: 10
    },
    golds: {
        backgroundColor: '#1E1E1E',
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        color: '#fff',
        textAlign: 'center'
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
        backgroundColor: '#1E1E1E',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20
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
        marginLeft: 'auto',
        minWidth: 125
    },
    price: {
        color: '#fff',
    },
    name: {
        color: '#fff',
    }
});

export default Champions;
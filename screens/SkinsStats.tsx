import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatNumber } from '../hooks/numberFormatter';
import { useAppSelector } from '../redux/hooks';

const SkinsStats = () => {
    const golds = useAppSelector(state => state.golds.value);
    const gps = useAppSelector(state => state.golds.gps);
    const click = useAppSelector(state => state.golds.click);
    const AD = useAppSelector(state => state.golds.AD);
    const AP = useAppSelector(state => state.golds.AP);
    const AH = useAppSelector(state => state.golds.AH);
    const crit = useAppSelector(state => state.golds.crit);

    return (
        <View style={styles.container}>
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
        </View>
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
});

export default SkinsStats;
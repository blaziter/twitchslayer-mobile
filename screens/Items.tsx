import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Items = () => {
    return (
        <View style={styles.container}>
            <Text style={{ color: '#fff' }}>Items</Text>
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
});

export default Items;
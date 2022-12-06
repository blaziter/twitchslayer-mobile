import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, Pressable, View, TouchableWithoutFeedback } from 'react-native';

const Home = () => {
    const [golds, setGolds] = useState(0);

    const handleAdd = () => {
        setGolds(1+golds);
    }

    return (
        <View nativeID='container' style={styles.container}>
             <TouchableWithoutFeedback onPress={handleAdd}>
                <Image source={require('../assets/twitch.png')} style={{ minWidth: '256px', minHeight: '256px'}}/>
             </TouchableWithoutFeedback>
            <Text style={{ color: 'white' }}>Golds {golds}</Text>
            <Text nativeID='counter' style={{ color: '#fff' }}></Text>
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
    twitch: {
        
    },
});

export default Home;
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, Pressable, View } from 'react-native';

const Home = () => {
    return (
        <View nativeID='container' style={styles.container}>
            <ImageBackground source={require('../assets/twitch.png')} >
                <Pressable onPress={() => {}} style={styles.twitch}>
                </Pressable>    
            </ImageBackground>
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
import * as Font from 'expo-font'

export const useFonts = async () =>
    await Font.loadAsync({
        'Spiegel-Regular': require('../assets/fonts/Spiegel_TT_Regular.ttf'),
        'Spiegel-Bold': require('../assets/fonts/Spiegel_TT_Bold.ttf'),
        'Spiegel-Regular-Italic': require('../assets/fonts/Spiegel_TT_Regular_Italic.ttf'),
    });
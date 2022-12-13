import React from 'react';
import Loading from './screens/Loading';
import AppContainer from './AppContainer';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import {} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { useFonts } from 'expo-font'

const App = () => {
  let persistor = persistStore(store);
  const [fontsLoaded] = useFonts({
    'Spiegel-Regular': require('./assets/fonts/Spiegel_TT_Regular.ttf'),
    'Spiegel-Bold': require('./assets/fonts/Spiegel_TT_Bold.ttf'),
    'Spiegel-Regular-Italic': require('./assets/fonts/Spiegel_TT_Regular_Italic.ttf'),
  });

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
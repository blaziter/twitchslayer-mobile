import React, { useEffect, useState } from 'react';
import Loading from './screens/Loading';
import AppContainer from './AppContainer';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import {} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { useFonts } from './hooks/useFonts';

const App = () => {
  let persistor = persistStore(store);
  const [loaded, setLoaded] = useState(false);

  const LoadFonts = async () => {
    await useFonts()
    setLoaded(true)
  }

  useEffect(() => {
    LoadFonts()
  })

  if (loaded) return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );

  return <></>
}

export default App;
import React, { useState } from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers';
import Navigator from './navigation/Navigator';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools());

const fetchFonts = async () => {
  await Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

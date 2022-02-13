import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import store from './configureStore';
import { AppRoot } from './views/AppRoot';

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <AppRoot />
    </Provider>
  );
}

export default App;

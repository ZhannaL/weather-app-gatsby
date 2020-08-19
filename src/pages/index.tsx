import React from 'react';
import App from 'src/Components/App';
import { Provider } from 'react-redux';
import { store } from 'src/Reducers';

const IndexPage = (): JSX.Element => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default IndexPage;

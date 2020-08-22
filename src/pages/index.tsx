import React from 'react';
import App from 'src/Components/App';
import { Provider } from 'react-redux';
import { store } from 'src/Reducers';
import { StylesProvider, ThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from 'src/styles/theme-MUI';

const IndexPage = (): JSX.Element => (
  <StylesProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StylesProvider>
);

export default IndexPage;

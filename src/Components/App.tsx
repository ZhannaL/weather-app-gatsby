import React from 'react';
import { StylesProvider, ThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from 'src/styles/theme-MUI';
import style from './app.module.css';
import { Wrapper } from './Wrapper';
import { Controls } from './Controls';

const App = (): JSX.Element => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={style.appWrapper}>
          <Wrapper>
            <Controls />
          </Wrapper>
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;

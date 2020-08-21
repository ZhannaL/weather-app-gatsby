import React from 'react';
import { StylesProvider, ThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from 'src/styles/theme-MUI';
import style from './app.module.css';
import { Controls } from './Controls';
import { Search } from './Search';
import { Location } from './Location';
import { Time } from './Time';
import { MapBlock } from './Map';
import { WeatherMain } from './WeatherMain';
import { WeatherForecast } from './WeatherForecast';

const App = (): JSX.Element => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={style.appWrapper}>
          <Controls />
          <Search />
          <Location />
          <Time />
          <MapBlock />
          <WeatherMain />
          <WeatherForecast />
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;

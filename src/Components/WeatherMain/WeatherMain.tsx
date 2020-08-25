import React from 'react';
import { Typography } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';
import {
  getTepmByType,
  getWetherDescrByCode,
  getIconClassNameWeatherByCode,
  getWeatherInfo,
  getWindSPD,
} from 'src/Translations/helpers';
import icons from 'src/styles/icons.module.css';
import { State } from 'src/Reducers/rootReducer';
import { updateWeather } from './WeatherActions';
import style from './weatherMain.module.css';
import { Wrapper } from '../Wrapper';

const mapStateToProps = (state: State) => ({
  engCity: state.location.engCity,
  lang: state.controls.lang,
  tempType: state.controls.tempType,
  weatherCode: state.weather.weatherToday.weatherCode,
  appTemp: state.weather.weatherToday.appTemp,
  wind: state.weather.weatherToday.wind,
  humidity: state.weather.weatherToday.humidity,
  temp: state.weather.weatherToday.temp,
});

const mapDispatchToProps = {
  updateCurrWeather: updateWeather,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

class WeatherMain extends React.PureComponent<Props> {
  componentDidUpdate(oldProps: Props) {
    const { updateCurrWeather, engCity } = this.props;
    if (engCity && oldProps.engCity !== engCity) {
      updateCurrWeather();
    }
  }

  render(): JSX.Element {
    const {
      lang,
      tempType,
      weatherCode,
      temp,
      appTemp,
      wind,
      humidity,
    } = this.props;
    return (
      <Wrapper className={style.weatherMain}>
        <Typography color="inherit" variant="h2" className={style.tempNow}>
          {getTepmByType(temp, tempType)} {tempType === 'celsius' ? '°C' : '°F'}
        </Typography>
        <img
          alt="weather icon today"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          className={classnames(
            icons[getIconClassNameWeatherByCode(weatherCode)],
            style.icon
          )}
        />
        <div className={style.weatherInfoLines}>
          <Typography color="inherit" variant="h6">
            {getWetherDescrByCode(weatherCode)(lang)}
          </Typography>
          <Typography color="inherit" variant="h6">
            {getWeatherInfo('feels')(lang)}: {getTepmByType(appTemp, tempType)}{' '}
            {tempType === 'celsius' ? '°C' : '°F'}
          </Typography>
          <Typography color="inherit" variant="h6">
            {getWeatherInfo('wind')(lang)}: {Math.ceil(wind)} {getWindSPD(lang)}
          </Typography>
          <Typography color="inherit" variant="h6">
            {getWeatherInfo('rh')(lang)}: {Math.ceil(humidity)} %
          </Typography>
        </div>
      </Wrapper>
    );
  }
}

export default connector(WeatherMain);

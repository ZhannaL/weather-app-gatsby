import React from 'react';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { State } from 'src/Reducers/reducers';
import classnames from 'classnames';
import { updateWeather } from 'src/Reducers/actions';
import {
  getTepmByType,
  getWetherDescrByCode,
  getIconClassNameWeatherByCode,
  getWeatherInfo,
  getWindSPD,
} from 'src/Translations/helpers';
import icons from 'src/styles/icons.module.css';
import style from './weatherMain.module.css';
import { Wrapper } from '../Wrapper';

type Props = Readonly<{
  engCity: string;
  state: string;
  updateCurrWeather: typeof updateWeather;
  lang: 'en' | 'ru' | 'pl';
  tempType: string;
  weatherCode: number;
  appTemp: number;
  wind: number;
  humidity: number;
  temp: number;
}>;

class WeatherMain extends React.PureComponent<Props> {
  componentDidUpdate(oldProps: Props) {
    const { updateCurrWeather, engCity, state } = this.props;
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
    // console.log(this.props);
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

const mapStateToProps = (state: State) => ({
  engCity: state.engCity,
  state: state.state,
  lang: state.lang,
  tempType: state.tempType,
  weatherCode: state.weatherToday.weatherCode,
  appTemp: state.weatherToday.appTemp,
  wind: state.weatherToday.wind,
  humidity: state.weatherToday.humidity,
  temp: state.weatherToday.temp,
});

const mapDispatchToProps = {
  updateCurrWeather: updateWeather,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherMain);

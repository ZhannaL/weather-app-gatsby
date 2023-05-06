import React from 'react';
import { Typography } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import classnames from 'classnames';
import {
  getTepmByType,
  getIconClassNameWeatherByCode,
  get3DaysWeekName,
} from 'src/Translations/helpers';
import * as icons from 'src/styles/icons.module.css';
import { State } from 'src/Reducers/rootReducer';
import * as style from './weatherForecast.module.css';
import { Wrapper } from '../Wrapper';

type ForecastDayProps = Readonly<{
  lang: 'en' | 'ru' | 'pl';
  tempType: string;
  timeZone: string;
  day: number;
  dayCode: number;
  indDayWeek: number;
}>;

function ForecastDay({
  day,
  dayCode,
  lang,
  tempType,
  timeZone,
  indDayWeek,
}: ForecastDayProps) {
  return (
    <div className={style.day}>
      <Typography color="inherit" variant="h4" className={style.weekDay}>
        {get3DaysWeekName(lang, timeZone)[indDayWeek]}
      </Typography>
      <img
        alt="weather icon day"
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        className={classnames(
          icons[getIconClassNameWeatherByCode(dayCode)],
          style.icon
        )}
      />

      <Typography color="inherit" variant="h4" className={style.temp}>
        {getTepmByType(day, tempType)}
        {tempType === 'celsius' ? '°C' : '°F'}
      </Typography>
    </div>
  );
}

const mapStateToProps = (state: State) => ({
  city: state.location.city,
  lang: state.controls.lang,
  tempType: state.controls.tempType,
  timeZone: state.location.timeZone,
  day1: state.weather.weatherDays.day1,
  day2: state.weather.weatherDays.day2,
  day3: state.weather.weatherDays.day3,
  day1Code: state.weather.weatherDays.day1WeatherCode,
  day2Code: state.weather.weatherDays.day2WeatherCode,
  day3Code: state.weather.weatherDays.day3WeatherCode,
});

const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

class WeatherForecast extends React.PureComponent<Props> {
  render(): JSX.Element {
    const {
      lang,
      tempType,
      timeZone,
      day1,
      day2,
      day3,
      day1Code,
      day2Code,
      day3Code,
    } = this.props;
    return (
      <Wrapper className={style.weatherForecast}>
        <ForecastDay
          indDayWeek={0}
          day={day1}
          dayCode={day1Code}
          lang={lang}
          tempType={tempType}
          timeZone={timeZone}
        />
        <ForecastDay
          indDayWeek={1}
          day={day2}
          dayCode={day2Code}
          lang={lang}
          tempType={tempType}
          timeZone={timeZone}
        />
        <ForecastDay
          indDayWeek={2}
          day={day3}
          dayCode={day3Code}
          lang={lang}
          tempType={tempType}
          timeZone={timeZone}
        />
      </Wrapper>
    );
  }
}

export default connector(WeatherForecast);

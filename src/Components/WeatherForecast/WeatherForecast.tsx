import React from 'react';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { State } from 'src/Reducers/reducers';
import classnames from 'classnames';
import {
  getTepmByType,
  getIconClassNameWeatherByCode,
  get3DaysWeekName,
} from 'src/Translations/helpers';
import icons from 'src/styles/icons.module.css';
import style from './weatherForecast.module.css';
import { Wrapper } from '../Wrapper';

type ForecastDayProps = Readonly<{
  lang: 'en' | 'ru' | 'pl';
  tempType: string;
  timeZone: string;
  day: number;
  dayCode: number;
  indDayWeek: number;
}>;

const ForecastDay = ({
  day,
  dayCode,
  lang,
  tempType,
  timeZone,
  indDayWeek,
}: ForecastDayProps) => (
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

type Props = Readonly<{
  city: string;
  lang: 'en' | 'ru' | 'pl';
  tempType: string;
  timeZone: string;
  day1: number;
  day2: number;
  day3: number;
  day1Code: number;
  day2Code: number;
  day3Code: number;
}>;

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

const mapStateToProps = (state: State) => ({
  city: state.city,
  lang: state.lang,
  tempType: state.tempType,
  timeZone: state.timeZone,
  day1: state.weatherDays.day1,
  day2: state.weatherDays.day2,
  day3: state.weatherDays.day3,
  day1Code: state.weatherDays.day1WeatherCode,
  day2Code: state.weatherDays.day2WeatherCode,
  day3Code: state.weatherDays.day3WeatherCode,
});

export default connect(mapStateToProps, null)(WeatherForecast);

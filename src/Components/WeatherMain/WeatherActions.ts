import { getWeather } from 'src/Translations/queries';
import { ThunkAction } from 'src/Reducers/actionTypes';

export const updateWeather = (): ThunkAction => (dispatch, getState) => {
  const { engCity, countryCode, state, city } = getState().location;
  const queryWeather = city !== undefined ? engCity : state;
  getWeather(queryWeather, countryCode).then((result) => {
    dispatch({
      type: 'UPDATE_WEATHER',
      payload: {
        weatherToday: {
          temp: result.data[0].temp,
          appTemp: result.data[0].app_min_temp,
          wind: result.data[0].wind_spd,
          humidity: result.data[0].rh,
          weatherCode: result.data[0].weather.code,
        },
        weatherDays: {
          day1: result.data[1].max_temp,
          day1WeatherCode: result.data[1].weather.code,
          day2: result.data[2].max_temp,
          day2WeatherCode: result.data[2].weather.code,
          day3: result.data[3].max_temp,
          day3WeatherCode: result.data[3].weather.code,
        },
      },
    });
  });
};

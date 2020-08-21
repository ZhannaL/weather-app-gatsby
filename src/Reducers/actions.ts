import { getLocation, getWeather } from 'src/Translations/queries';
import type { Action, ThunkAction } from './reducers';

export const changelang = (lang: string): Action => {
  return { type: 'CHANGE_LANG', payload: lang };
};

export const changeTempType = (tempType: string): Action => {
  return { type: 'CHANGE_TEMP_TYPE', payload: tempType };
};

export const updateLocation = (lang: string, city = ''): ThunkAction => {
  return (dispatch) => {
    getLocation(lang, city).then((data) => {
      if (data.results[0]) {
        dispatch({
          type: 'UPDATE_LOCATION',
          payload: {
            country: data.results[0].components.country,
            city: data.results[0].components.city,
            state: data.results[0].components.state,
            lat: data.results[0].annotations.DMS.lat,
            lng: data.results[0].annotations.DMS.lng,
            latMap: data.results[0].geometry.lat,
            lngMap: data.results[0].geometry.lng,
            timeZone: data.results[0].annotations.timezone.name,
            countryCode: data.results[0].components.country_code,
          },
        });
      } else {
        dispatch({
          type: 'UPDATE_LOCATION',
          payload: {
            country: 'false',
            city: 'false',
            state: 'false',
            lat: 'false',
            lng: 'false',
            latMap: 0,
            lngMap: 0,
            timeZone: 'false',
            countryCode: 'false',
          },
        });
      }
    });
  };
};

export const updateWeather = (): ThunkAction => {
  return (dispatch, getState) => {
    const { city, countryCode } = getState();
    getWeather(city, countryCode)
      .then((result) =>
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
        })
      )
      .catch((err) => console.log(err));
  };
};

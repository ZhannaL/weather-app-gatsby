import { ThunkAction } from 'src/Reducers/actionTypes';
import { getLocation, getLinkToImage } from 'src/Translations/queries';

export const updateLocation =
  (lang: 'en' | 'ru' | 'pl', city = ''): ThunkAction =>
  (dispatch) => {
    console.log('updateLocation', city);
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
            wrongSearch: false,
          },
        });
      } else {
        dispatch({
          type: 'WRONG_UPDATE_LOCATION',
          payload: {
            wrongSearch: true,
          },
        });
      }
    });
  };

export const getCityEngName =
  (city = ''): ThunkAction =>
  (dispatch) => {
    getLocation('en', city).then((data) => {
      if (data.results[0]) {
        dispatch({
          type: 'GET_CITY_ENG_NAME',
          payload: {
            engCity:
              data.results[0].components.city ??
              data.results[0].components.state,
          },
        });
        getLinkToImage(data.results[0].components.city).then((urlLink) =>
          dispatch({
            type: 'UPDATE_URL_IMAGE',
            payload: {
              url: urlLink,
              loading: false,
            },
          })
        );
      } else {
        dispatch({
          type: 'WRONG_UPDATE_LOCATION',
          payload: {
            wrongSearch: true,
          },
        });
      }
    });
  };

import { State } from './rootReducer';

export type Action =
  | Readonly<{ type: 'CHANGE_LANG'; payload: 'en' | 'ru' | 'pl' }>
  | Readonly<{ type: 'CHANGE_TEMP_TYPE'; payload: string }>
  | Readonly<{
      type: 'WRONG_UPDATE_LOCATION';
      payload: {
        wrongSearch: boolean;
      };
    }>
  | Readonly<{
      type: 'UPDATE_LOCATION';
      payload: {
        country: string;
        city: string;
        state: string;
        lat: string;
        lng: string;
        latMap: number;
        lngMap: number;
        timeZone: string;
        countryCode: string;
        wrongSearch: boolean;
      };
    }>
  | Readonly<{
      type: 'UPDATE_WEATHER';
      payload: {
        weatherToday: {
          temp: number;
          appTemp: number;
          wind: number;
          humidity: number;
          weatherCode: number;
        };
        weatherDays: {
          day1: number;
          day1WeatherCode: number;
          day2: number;
          day2WeatherCode: number;
          day3: number;
          day3WeatherCode: number;
        };
      };
    }>
  | Readonly<{ type: 'LOADING_BACKGROUND'; payload: boolean }>
  | Readonly<{
      type: 'UPDATE_URL_IMAGE';
      payload: { url: string; loading: boolean };
    }>
  | Readonly<{
      type: 'GET_CITY_ENG_NAME';
      payload: { engCity: string };
    }>;

export type ThunkAction = (
  dispatch: (action: Action) => unknown,
  getState: () => State
) => void;

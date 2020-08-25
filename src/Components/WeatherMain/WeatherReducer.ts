import { Action } from 'src/Reducers/actionTypes';

type WeatherState = {
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

const defaultWeatherState = {
  weatherToday: {
    temp: 0,
    appTemp: 0,
    wind: 0,
    humidity: 0,
    weatherCode: 0,
  },
  weatherDays: {
    day1: 0,
    day1WeatherCode: 0,
    day2: 0,
    day2WeatherCode: 0,
    day3: 0,
    day3WeatherCode: 0,
  },
} as const;

export function WeatherReducers(
  state: WeatherState = defaultWeatherState,
  action: Action
): WeatherState {
  switch (action.type) {
    case 'UPDATE_WEATHER': {
      return {
        ...state,
        weatherToday: {
          temp: action.payload.weatherToday.temp,
          appTemp: action.payload.weatherToday.appTemp,
          wind: action.payload.weatherToday.wind,
          humidity: action.payload.weatherToday.humidity,
          weatherCode: action.payload.weatherToday.weatherCode,
        },
        weatherDays: {
          day1: action.payload.weatherDays.day1,
          day1WeatherCode: action.payload.weatherDays.day1WeatherCode,
          day2: action.payload.weatherDays.day2,
          day2WeatherCode: action.payload.weatherDays.day2WeatherCode,
          day3: action.payload.weatherDays.day3,
          day3WeatherCode: action.payload.weatherDays.day3WeatherCode,
        },
      };
    }

    default:
      return state;
  }
}

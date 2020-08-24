export type Action =
  | Readonly<{ type: 'CHANGE_LANG'; payload: string }>
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

const defaultState = {
  lang: 'en',
  tempType: 'celsius',
  country: '',
  city: '',
  engCity: '',
  state: '',
  lat: '',
  lng: '',
  latMap: 0,
  lngMap: 0,
  timeZone: '',
  countryCode: '',
  url: '',
  loadingBackround: false,
  wrongSearch: false,
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
};

export type State = Readonly<{
  lang: string;
  tempType: string;
  country: string;
  city: string;
  engCity: string;
  state: string;
  lat: string;
  lng: string;
  latMap: number;
  lngMap: number;
  timeZone: string;
  countryCode: string;
  url: string;
  loadingBackround: boolean;
  wrongSearch: boolean;
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
}>;

function reducers(state: State = defaultState, action: Action): State {
  switch (action.type) {
    case 'CHANGE_LANG': {
      return {
        ...state,
        lang: action.payload,
      };
    }

    case 'CHANGE_TEMP_TYPE': {
      return {
        ...state,
        tempType: action.payload,
      };
    }

    case 'GET_CITY_ENG_NAME': {
      return {
        ...state,
        engCity: action.payload.engCity,
      };
    }

    case 'UPDATE_LOCATION': {
      return {
        ...state,
        country: action.payload.country,
        city: action.payload.city,
        state: action.payload.state,
        lat: action.payload.lat,
        lng: action.payload.lng,
        latMap: action.payload.latMap,
        lngMap: action.payload.lngMap,
        timeZone: action.payload.timeZone,
        countryCode: action.payload.countryCode,
        wrongSearch: action.payload.wrongSearch,
      };
    }

    case 'WRONG_UPDATE_LOCATION': {
      return {
        ...state,
        wrongSearch: action.payload.wrongSearch,
      };
    }

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

    case 'LOADING_BACKGROUND': {
      return {
        ...state,
        loadingBackround: action.payload,
      };
    }

    case 'UPDATE_URL_IMAGE': {
      return {
        ...state,
        url: action.payload.url,
        loadingBackround: action.payload.loading,
      };
    }

    default:
      return state;
  }
}

export default reducers;

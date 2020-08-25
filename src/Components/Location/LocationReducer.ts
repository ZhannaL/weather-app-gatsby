import { Action } from 'src/Reducers/actionTypes';

type LocationState = {
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
  wrongSearch: boolean;
};

const defaultLocationState = {
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
  wrongSearch: false,
} as const;

export function LocationReducers(
  state: LocationState = defaultLocationState,
  action: Action
): LocationState {
  switch (action.type) {
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

    default:
      return state;
  }
}

import { Action } from 'src/Reducers/actionTypes';

type ControlsState = {
  lang: 'en' | 'ru' | 'pl';
  tempType: string;
  url: string;
  loadingBackround: boolean;
};

const defaultControlsState = {
  lang: 'en',
  tempType: 'celsius',
  url: '',
  loadingBackround: false,
} as const;

export function ControlsReducers(
  state: ControlsState = defaultControlsState,
  action: Action
): ControlsState {
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

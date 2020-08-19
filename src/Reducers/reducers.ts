export type Action =
  | Readonly<{ type: 'CHANGE_LANG'; payload: string }>
  | Readonly<{ type: 'CHANGE_TEMP'; payload: string }>;

const defaultState = {
  lang: 'en',
  temp: 'celsius',
};

export type State = Readonly<{ lang: string; temp: string }>;

function reducers(state: State = defaultState, action: Action): State {
  switch (action.type) {
    case 'CHANGE_LANG': {
      return {
        ...state,
        lang: action.payload,
      };
    }

    case 'CHANGE_TEMP': {
      return {
        ...state,
        temp: action.payload,
      };
    }

    default:
      return state;
  }
}

export default reducers;

import { combineReducers, StateFromReducersMapObject } from 'redux';
import { ControlsReducers } from 'src/Components/Controls/ControlsReducer';
import { LocationReducers } from 'src/Components/Location/LocationReducer';
import { WeatherReducers } from 'src/Components/WeatherMain/WeatherReducer';

const reducers = {
  location: LocationReducers,
  controls: ControlsReducers,
  weather: WeatherReducers,
};

const combinedReducer = combineReducers(reducers);

export const rootReducer = combinedReducer;
export type State = StateFromReducersMapObject<typeof reducers>;

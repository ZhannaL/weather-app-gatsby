import { createStore } from 'redux';
import weatherApp from './reducers';

export const store = createStore(weatherApp);

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import weatherApp from './reducers';

export const store = createStore(weatherApp, applyMiddleware(thunk));

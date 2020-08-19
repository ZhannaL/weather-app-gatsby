import type { Action } from './reducers';

export const changelang = (lang: string): Action => {
  return { type: 'CHANGE_LANG', payload: lang };
};

export const changeTemp = (temp: string): Action => {
  return { type: 'CHANGE_TEMP', payload: temp };
};

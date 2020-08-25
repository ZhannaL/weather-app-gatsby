import { Action, ThunkAction } from 'src/Reducers/actionTypes';
import { getLinkToImage } from 'src/Translations/queries';

export const changelang = (lang: 'en' | 'ru' | 'pl'): Action => {
  return { type: 'CHANGE_LANG', payload: lang };
};

export const changeTempType = (tempType: string): Action => {
  return { type: 'CHANGE_TEMP_TYPE', payload: tempType };
};

export const loadingBackground = (): Action => {
  return { type: 'LOADING_BACKGROUND', payload: true };
};

export const updateURLBackground = (query: string): ThunkAction => {
  return (dispatch) => {
    getLinkToImage(query).then((urlLink) =>
      dispatch({
        type: 'UPDATE_URL_IMAGE',
        payload: {
          url: urlLink,
          loading: false,
        },
      })
    );
  };
};

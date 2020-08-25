import { weatherDMS, weatherInfo, WeatherAPICodes } from './translations';

export const getPlaceholder = (language: string): string => {
  switch (language) {
    case 'en':
      return 'search city';
    case 'ru':
      return 'поиск города';
    case 'pl':
      return 'szukaj miasta';
    default:
      throw new Error('Sorry, we dont know this language.');
  }
};

export const getTextButtonSearch = (language: string): string => {
  switch (language) {
    case 'en':
      return 'search';
    case 'ru':
      return 'поиск';
    case 'pl':
      return 'szukaj';
    default:
      throw Error('Sorry, we dont know this language.');
  }
};

export const getTextlatitudelongitude = (dms: 'lat' | 'lng') => (
  language: 'en' | 'ru' | 'pl'
): string => weatherDMS[dms][language];

export const getTepmByType = (temp: number, tempType?: string): number => {
  if (tempType === 'celsius') {
    return Math.ceil(temp);
  }
  return Math.ceil(temp * 1.8 + 32);
};

export const getWindSPD = (language: string): string => {
  switch (language) {
    case 'en':
      return 'm/s';
    case 'ru':
      return 'м/с';
    case 'pl':
      return 'm/s';
    default:
      throw Error('Sorry, we dont know this language.');
  }
};

export const getWeatherInfo = (type: 'feels' | 'wind' | 'rh') => (
  language: 'en' | 'ru' | 'pl'
): string => weatherInfo[type][language];

export const getLocal = (language: string): string => {
  switch (language) {
    case 'en':
      return 'en-GB';
    case 'ru':
      return 'ru-RU';
    case 'pl':
      return 'pl-PL';
    default:
      throw Error('Sorry, we dont know this language.');
  }
};

export const get3DaysWeekName = (
  language: string,
  timeZone: string
): [string, string, string] => {
  const day1 = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const day2 = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  const day3 = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const local = getLocal(language);
  return [
    day1.toLocaleString(local, {
      weekday: 'long',
      ...(timeZone ? { timeZone } : null),
    }),
    day2.toLocaleString(local, {
      weekday: 'long',
      ...(timeZone ? { timeZone } : null),
    }),
    day3.toLocaleString(local, {
      weekday: 'long',
      ...(timeZone ? { timeZone } : null),
    }),
  ];
};

export const getWetherDescrByCode = (code: number) => (
  language: 'en' | 'ru' | 'pl'
): string => WeatherAPICodes[code || 900][language];

export const WeatherAPICodesIcon: Record<number, string> = {
  200: 'thunder',
  201: 'thunder',
  202: 'thunder',
  230: 'thunder',
  231: 'thunder',
  232: 'thunder',
  233: 'thunder',
  300: 'rainy1',
  301: 'rainy2',
  302: 'rainy3',
  500: 'rainy4',
  501: 'rainy5',
  502: 'rainy6',
  511: 'rainy7',
  520: 'rainy2',
  521: 'rainy6',
  522: 'rainy7',
  600: 'snowy1',
  601: 'snowy2',
  602: 'snowy3',
  610: 'rainy7',
  611: 'rainy7',
  612: 'snowy6',
  621: 'snowy5',
  622: 'snowy4',
  623: 'hail',
  700: 'mist',
  711: 'mist',
  721: 'mist',
  731: 'mist',
  741: 'mist',
  751: 'mist',
  800: 'daySun',
  801: 'cloudyDay1',
  802: 'cloudyDay2',
  803: 'cloudyDay3',
  804: 'cloudyDay1',
  900: 'weatherAll',
};
export const getIconClassNameWeatherByCode = (code: number): string =>
  WeatherAPICodesIcon[code || 900];

export const getShortWeatherByCode = (code: number | string): string => {
  if (code >= 200 && code < 300) {
    return 'thunder';
  }
  if (code >= 300 && code < 400) {
    return 'drizzle';
  }
  if (code >= 500 && code < 600) {
    return 'rain';
  }
  if (code >= 600 && code < 700) {
    return 'snow';
  }
  if (code >= 700 && code < 800) {
    return 'haze';
  }
  if (code >= 800 && code < 900) {
    return 'clouds';
  }

  return 'weather';
};

export const getDataToPicUrl = (
  timeZone: string,
  weatherCode: number
): string => {
  const hour = new Date()
    .toLocaleString('en-GB', {
      // @ts-ignore
      timeStyle: 'short',
      ...(timeZone ? { timeZone } : null),
    })
    .split(':')[0];
  const month = new Date().toLocaleString('en-GB', {
    month: 'numeric',
    ...(timeZone ? { timeZone } : null),
  });
  const dayTime = Number(hour) > 6 && Number(hour) < 22 ? 'day' : 'night';
  let season;
  switch (Number(month)) {
    case 12:
    case 1:
    case 2:
      season = 'winter';
      break;
    case 3:
    case 4:
    case 5:
      season = 'spring';
      break;
    case 6:
    case 7:
    case 8:
      season = 'summer';
      break;
    case 9:
    case 10:
    case 11:
      season = 'autumn';
      break;
    default:
      season = 'summer';
  }

  return `${season},${dayTime},${getShortWeatherByCode(weatherCode)}`;
};

export const getMsgToSpeak = (
  city: string,
  weatherCode: number,
  temp: number,
  tempType: string
): string => {
  const msgToSpeak = `The weather in ${city} is ${getWetherDescrByCode(
    weatherCode
  )('en')}. 
    Temperature is ${getTepmByType(temp, tempType)} degrees ${tempType}`;

  return msgToSpeak;
};

export const getLinkToImage = (country: string): Promise<string> => {
  const query = country || 'weather';
  const url = `https://api.unsplash.com/photos/random?query=nature,${query}&client_id=${process.env.GATSBY_ID_IMAGES_API}`;
  // console.log(url);
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.urls.regular)
    .catch(() => '');
};
export const getLocation = (language: string, city = '') => {
  if (city) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${process.env.GATSBY_KEY_LOCATION_API}&language=${language}&pretty=1`;
    return fetch(url)
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.log(err));
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  }).then((pos) => {
    const crd = pos.coords;
    const lat = crd.latitude;
    const lng = crd.longitude;
    const q = `${lat},${lng}`;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${q}&key=${process.env.GATSBY_KEY_LOCATION_API}&language=${language}&pretty=1`;
    return fetch(url)
      .then((res) => res.json())
      .then((res) => res);
  });
};

export const getWeather = (city: string, country: string): Promise<any> => {
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=${country}&days=4&key=${process.env.GATSBY_KEY_WEATHER_API}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res);
};

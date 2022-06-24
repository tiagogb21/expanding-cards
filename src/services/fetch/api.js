import { createApi } from 'unsplash-js';

console.log(process.env.REACT_APP_BASE_URL);

const api = createApi({
  accessKey: process.env.REACT_APP_BASE_URL,
});

const getInfoApi = (search) =>
  api.search
    .getPhotos({
      query: `${search}`,
      orientation: 'landscape',
    })
    .then((result) => result)
    .catch(() => console.log('something went wrong'));

export default getInfoApi;

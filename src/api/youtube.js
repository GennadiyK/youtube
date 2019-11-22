import axios from 'axios';

const ENV_ENDPOINT = 'https://www.googleapis.com/youtube/v3/search';
const ENV_API_KEY = 'AIzaSyBorD70976EHemelW3zXkn0TsF3otGczxE';

export default function (params, options = {}) {
  return axios({
    ...options,
    url: ENV_ENDPOINT,
    method: 'GET',
    params: {
      key: ENV_API_KEY,
      format: 'json',
      ...params,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

import axios from 'axios';

export default function (params, options = {}) {
  return axios({
    ...options,
    url: process.env.REACT_APP_Y_ENDPOINT,
    method: 'GET',
    params: {
      key: process.env.REACT_APP_Y_API_KEY,
      format: 'json',
      ...params,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

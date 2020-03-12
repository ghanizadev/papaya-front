import axios from 'axios';

export const fetchTables = (token) => {
  const headers = new Headers();
  headers.append('authorization', `Bearer ${token}`);
  headers.append('content-type', 'application/json');

  const init = {
    method: 'GET',
    cors: 'no-cors',
    headers,
  };

  return fetch(`${process.env.REACT_APP_API}/api/v1/table`, init);
};

export const login = (username = '', password = '', handler = () => {}) => {
  const body = new URLSearchParams();
  body.append('username', username);
  body.append('password', password);
  body.append('grant_type', 'password');

  axios.post(`${process.env.REACT_APP_API}/oauth/token`,
    body,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: process.env.REACT_APP_ID,
        password: process.env.REACT_APP_SECRET,
      },
      validateStatus: (status) => status < 500,
    })
    .then((responseToken) => handler({
      status: responseToken.status,
      load: responseToken.data,
      user: { email: username },
      isLoading: false,
    })).catch((error) => handler({
      status: error.response.status || 500,
      isLoading: false,
    }));
};

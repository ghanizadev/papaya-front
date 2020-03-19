
import axios from 'axios';

export const getTables = (token) => axios.get(`${process.env.REACT_APP_API}/api/v1/table`,
  {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    validateStatus: (status) => status < 500,
  });

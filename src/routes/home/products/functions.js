import axios from 'axios';

export const find = (token) =>
	axios.get(`${process.env.REACT_APP_API}/api/v1/product`,
		{
			headers: { 'Authorization': `Bearer ${token}` }
		}
	);

export const save = (token, body) =>
	axios.post(`${process.env.REACT_APP_API}/api/v1/product`, body,
		{
			headers: { 'Authorization': `Bearer ${token}` },
			'Content-Type': 'application/json'
		}
	);
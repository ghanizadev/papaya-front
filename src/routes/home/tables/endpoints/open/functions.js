import axios from 'axios';

export const openTable = (token, body) =>
	axios.post(`${process.env.REACT_APP_API}/api/v1/order`, body,
		{
			headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
			validateStatus: status => status < 500
		}
	);
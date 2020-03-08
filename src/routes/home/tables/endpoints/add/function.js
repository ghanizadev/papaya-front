import axios from 'axios';

export const getFlavor = (token, text) =>
	axios.get(process.env.REACT_APP_API + '/api/v1/flavor?q=' + text,
		{
			headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
			validateStatus: status => status < 500
		}
	);

export const getPizzaSizes = token =>
axios.get(process.env.REACT_APP_API + '/api/v1/pizza',
	{
		headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
		validateStatus: status => status < 500
	}
);

export const getTables = token =>
axios.get(process.env.REACT_APP_API + '/api/v1/table',
	{
		headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
		validateStatus: status => status < 500
	}
);
import axios from 'axios';

export const findAllTables = (token) =>
	axios.get(`${process.env.REACT_APP_API}/api/v1/table`,
		{
			headers: { 'Authorization': `Bearer ${token}` }
		}
	);

export const addProduct = (token, orderId, body) =>
	axios.put(`${process.env.REACT_APP_API}/api/v1/order/${orderId}/add`,
		body,
		{
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		}
	);

export const findFlavor = (token, name = ' ') =>
	axios.get(`${process.env.REACT_APP_API}/api/v1/flavor?q=${name}`,
		{
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		}
	);

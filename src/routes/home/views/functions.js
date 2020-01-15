import axios from 'axios';

export const findAllProducts = (token) =>
	axios.get(`${process.env.REACT_APP_API}/api/v1/product`,
		{
			headers: {'Authorization': `Bearer ${token}`}
		}
	);
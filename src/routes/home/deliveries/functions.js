export const fetchDeliveries = token => {
	const headers = new Headers();
	headers.append('authorization', 'Bearer ' + token);
	headers.append('content-type', 'application/json');
    
	const init = {
		method: 'GET',
		cors: 'no-cors',
		headers
	};
	return fetch(process.env.REACT_APP_API+'/api/v1/delivery', init);

};
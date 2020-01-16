import Axios from 'axios';

export const getUserData = (email, token) => {
	console.log(email, token) ; 
	const headers = {
		'Authorization': `Bearer ${token}`,
		'Content-Type': 'application/json'
	};

	return Axios.get(`${process.env.REACT_APP_API}/api/v1/user?email=${email}`, {
		headers,
		withCredentials: true
	});
};

export default (username = '', password = '', handler = () => {}) => {
	const body = new URLSearchParams();
	body.append('username', username);
	body.append('password', password);
	body.append('grant_type', 'password');
        
	Axios.post(`${process.env.REACT_APP_API}/oauth/token`,
		body,
		{
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			auth: {
				username: process.env.REACT_APP_ID,
				password: process.env.REACT_APP_SECRET
			}
		})
		.then((responseToken, deny) => {
			if(responseToken.status === 200){ 
				global.token = responseToken.data.access_token;
				   
				return handler({
					status: responseToken.status,
					load: responseToken.data,
					user: {email: username}
				});
			}else if(deny) {
				return handler({
					status: responseToken.status,
					isLoading: false,
				});
			}
		}).catch((error) => {
			return handler({
				status: error.response && error.response.status ? error.response.status : 500,
				isLoading: false,
			});
		});
};

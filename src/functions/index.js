import Axios from 'axios';

export const getUserData = (email, token) => {
	return Axios.get(`${process.env.REACT_APP_DATABASE}/api/v1/user?email=${email}`, {
		headers:{
			'Authorization': 'Bearer ' + token
		}
	});
};

export default (username = '', password = '', handler = () => {}) => {
	const body = new URLSearchParams();
	body.append('username', username);
	body.append('password', password);
	body.append('grant_type', 'password');
        
	Axios.post(`${process.env.REACT_APP_DATABASE}/oauth/token`,
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
		.then(async (responseToken, deny) => {
			if(responseToken.status === 200){                
				getUserData(username, responseToken.data.access_token).then(responseUser =>{
					global.load = responseToken.data;

					return handler({
						status: responseUser.status,
						load: responseToken.data,
						user: responseUser.data
					});
				});
			}else if(deny) {
				return handler({
					status: responseToken.status,
					isLoading: false,
				});
			}
		}).catch((error) => {
			return handler({
				status: error.response.status,
				isLoading: false,
			});
		})
}

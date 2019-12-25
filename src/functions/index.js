import Axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router';

export const login = (username = 'jf.melo6@gmail.com', password = 'tr4df2g5wp', handler =() => {}) => {
	const body = new URLSearchParams();
	body.append('username', username);
	body.append('password', password);
	body.append('grant_type', 'password');
    
	console.log('Variaveis: ', process.env.REACT_APP_ID, process.env.REACT_APP_SECRET);
        
	Axios.post('http://localhost:3000/oauth/token',
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
		.then(async response => {
			if(response.status === 200){
				global.token = response.data.access_token;
                
				getUserData(username).then(response =>{
					handler({
						message: `Bem vindo(a) ${response.data[0].name}!`,
						isLoading: false,
						callback: () => <Redirect to={{pathname: '/login' }} />
					});
				});
			}
		}).catch(() => {
			handler({
				message: 'Usuário ou senha incorretos',
				isLoading: false,
			});
		});
};

export const getUserData = (email) => {
	return Axios.get(`http://localhost:3000/api/v1/user?email=${email}`, {
		headers:{
			'Authorization': 'Bearer ' + global.token
		}
	});
};
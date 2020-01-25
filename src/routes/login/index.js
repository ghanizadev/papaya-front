import React, {useRef, useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import PropTypes from 'prop-types';

import logo from '../../assets/logo.png';
import login from '../../functions';
import { LoginHolder, Input, Button} from '../components';

const {dialog} = window.require('electron').remote;


const notAuthorized = {
	type: 'warning',
	buttons: ['Ok'],
	title: 'Atenção',
	message: 'Falha no login.',
	detail: 'Seu usuário e/ou senha estão incorretos',
};

const error = {
	type: 'error',
	buttons: ['Ok'],
	title: 'Erro',
	message: 'Erro desconhecido.',
	detail: 'O servidor retornou um status desconhecido, por favor, entre em contato com o administrador',
};


const Home = props =>{
	const { history } = props;
	const [, setCookie] = useCookies('authorization');

	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const closeButton = useRef();
  
	const [handler, setHandler] = useState({});


	useEffect(() => {
		if(handler.status){
			switch(handler.status){
			case 200:
				setCookie('authorization', handler.load, { path: '/'});
				global.auth = handler.load;
				history.push('/home');
				break;
			case 403:
				dialog.showMessageBox(notAuthorized);
				break;
			default: 
				closeButton.current.focus();
				dialog.showMessageBox(error);
				break;
			}
		}
	}, [handler, history, setCookie]);

	return (
		<div style={{
			height: '100vh',
			width: '100vw',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
			<LoginHolder>
				<img src={logo} alt="La Solana Logo" style={{maxWidth: '75%', margin: 15}}/>
				<div style={{width: '60%'}}>
					<Input label="Email" type="email" onChange={e => setUsername(e.target.value)} placeholder="e-mail" />
					<Input label="Senha" type="password" onChange={e => setPassword(e.target.value)} placeholder="senha" onKeyPress={e=>{
						if (e.key === 'Enter') {
							e.preventDefault();
							login(username, password, e => {
								setHandler(e);
							});
						}
					}}/>
				</div>

				<Button onClick={(e) => {
					e.preventDefault();
					login(username, password, e => {
						setHandler(e);
					});
				}}>Entrar</Button>
			</LoginHolder>
		</div>);
};

Home.propTypes = {
	history: PropTypes.any.isRequired
};

export default withRouter(Home);

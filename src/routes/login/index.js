import React, {useRef, useState, useEffect, useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import PropTypes from 'prop-types';

import logo from '../../assets/logo.png';
import login from '../../functions';
import loading from '../../assets/loading.gif';
import { Context } from '../../context';
import { LoginHolder, Loading, MessageBox, Input, LoadingMessage, LoadingTitle, Button} from '../components';
import { fetchTables} from './functions';
import io from 'socket.io-client';


const Home = props =>{
	const { history } = props;
	const [, setCookie] = useCookies('authorization');

	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const closeButton = useRef();
  
	const [message, setMessage] = useState({title: '', description: ''});
	const [isLoading, setIsLoading] = useState(false);
	const [isShowing, setIsShowing] = useState(false);
	const [handler, setHandler] = useState({});

	const state = useContext(Context);

	const [cookies] = useCookies();

	const ioConnection = () => {
		const socket = io.connect(process.env.REACT_APP_API);
		socket.on('update', () => {
			fetchTables(cookies.authorization.access_token)
				.then(result => {
					if(result.status === 200)
						result.json().then(json => {
							state.setContext({...state.context, tables: json });
						});
				})
				.catch(error => {
					console.log(error);
				});
		});
	};


	useEffect(() => {
		setIsLoading(false);
		if(handler.status){
			switch(handler.status){
			case 200:
				setCookie('authorization', handler.load, { path: '/'});
				global.auth = handler.load;
				setIsShowing(false);
				history.push('/home');
				break;
			case 403:
				setMessage({title: 'Autenticação', description: 'Usuário ou senha incorretos, por favor, tente novamente'});
				console.log(username, password);
				break;
			default: 
				closeButton.current.focus();
				setMessage({title: 'Erro desconhecido', description:'por favor, entre em contato com o administrador'});
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
				<Input label="Email" type="email" onChange={e => setUsername(e.target.value)} placeholder="e-mail" />
				<Input label="Senha" type="password" onChange={e => setPassword(e.target.value)} placeholder="senha" onKeyPress={e=>{
					if (e.key === 'Enter') {
						e.preventDefault();
						login(username, password, e => {
							setHandler(e);
						});
						setIsShowing(true);
						setIsLoading(true);
					}
				}}/>
				<Button onClick={(e) => {
					e.preventDefault();
					login(username, password, e => {
						setHandler(e);
					});
					setIsShowing(true);
					setIsLoading(true);
				}}>Entrar</Button>
			</LoginHolder>
			<Loading style={{display: isShowing ? 'flex' : 'none'}}>
				<MessageBox>
					<LoadingTitle>{message.title}</LoadingTitle>
					<LoadingMessage>{message.description}</LoadingMessage>
					<img id="loading-gif" alt="Loading gif" src={loading} height={40} width={40} style={{marginTop: 10, display: isLoading ? 'block' : 'none'}} />
					<input ref={closeButton} style={{display: isLoading ? 'none' : 'block', height: 25, width: 'min-content'}} type="button" value="Fechar" onClick={
						(e)=>{
							e.preventDefault();
							setIsShowing(false);
						}
					}/>
				</MessageBox>
			</Loading>
		</div>);
};

Home.propTypes = {
	history: PropTypes.any.isRequired
};

export default withRouter(Home);

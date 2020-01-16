import React, {useRef, useState, useEffect} from 'react';
import './style.css';
import {withRouter} from 'react-router-dom';
import {useCookies} from 'react-cookie';

import logo from '../../assets/logo.png';
import login from '../../functions';
import loading from '../../assets/loading.gif';

const Home = props =>{
	const {history} = props;
	const [cookies, setCookie] = useCookies('authorization');

	const username = useRef();
	const password = useRef();
	const closeButton = useRef();
  
	const [message, setMessage] = useState('Carregando...');
	const [isLoading, setIsLoading] = useState(false);
	const [isShowing, setIsShowing] = useState(false);
	const [handler, setHandler] = useState({});

	useEffect(() => {
		setIsLoading(false);
		if(handler.status){
			switch(handler.status){
			case 200:
				setCookie('authorization', handler.load, { path: '/', maxAge: handler.load.exp /1000 });
				global.auth = handler.load;
				setIsShowing(false);
				history.push('/home');
				break;
			case 403:
				closeButton.current.focus();
				setMessage('Usuário ou senha incorretos, por favor, tente novamente');
				break;
			default: 
				closeButton.current.focus();
				setMessage('Erro desconhecido, por favor, entre em contato com o administrador');
				break;
			}
		}
	}, [handler, history, setCookie]);

	return (
		<div className="App">
			<form id="login-holder">
				<img src={logo} alt="La Solana Logo" style={{maxWidth: '75%', margin: 15}}/>
				<input defaultValue="jf.melo6@gmail.com" type="email" ref={username} placeholder="e-mail" onKeyPress={e=>{
					if (e.key === 'Enter') password.current.focus();
				}}/>
				<input defaultValue="tr4df2g5wp" type="password" ref={password} placeholder="senha" onKeyPress={e=>{
					if (e.key === 'Enter') {
						e.preventDefault();
						login(username.current.value, password.current.value, e => {
							setHandler(e);
						});
						setIsShowing(true);
						setIsLoading(true);
					}
				}}/>
				<input type="submit" value="Entrar" onClick={(e) => {
					e.preventDefault();
					login(username.current.value, password.current.value, e => {
						setHandler(e);
					});
					setIsShowing(true);
					setIsLoading(true);
				}}/>
			</form>
			<div id="loading" style={{display: isShowing ? 'flex' : 'none'}}>
				<div id="message-box">
					<span id="loading-message">{message}</span>
					<img id="loading-gif" alt="Loading gif" src={loading} height={40} width={40} style={{marginTop: 10, display: isLoading ? 'block' : 'none'}} />
					<input ref={closeButton} style={{display: isLoading ? 'none' : 'block', height: 25, width: 'min-content'}} type="button" value="Fechar" onClick={
						(e)=>{
							e.preventDefault();
							setIsShowing(false);
						}
					}/>
				</div>
			</div>
		</div>);
};

export default withRouter(Home);

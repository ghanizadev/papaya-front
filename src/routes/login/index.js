import React, {useRef, useState, useEffect} from 'react';
import './style.css';

import logo from '../../assets/logo.png';
import * as functions from '../../functions';
import loading from '../../assets/loading.gif';

const Home = () =>{
	const username = useRef();
	const password = useRef();
	const closeButton = useRef();
  
	const [message, setMessage] = useState(['Carregando...']);
	const [isLoading, setIsLoading] = useState(false);
	const [isShowing, setIsShowing] = useState(false);
	const [handler, setHandler] = useState({});

	useEffect(() => {
		if(handler.message != null) setMessage(handler.message);
		if(handler.isLoading != null) setIsLoading(handler.isLoading);
		if(handler.callback != null) closeButton.current.onClick = e =>{
			e.preventDefault();
			setIsShowing(false);
			handler.callback(); //TODO arrumar callback: com Promise talvez
		};
	}, [handler]);


	return (
		<div className="App">
			<div id="login-holder">
				<img src={logo} style={{maxWidth: '75%', margin: 15}}/>
				<input type="email" ref={username} placeholder="e-mail" />
				<input type="password" ref={password} placeholder="senha"/>
				<input type="button" value="Entrar" onClick={(e) => {
					e.preventDefault();
					functions.login(username.current.value, password.current.value, setHandler);
					setIsShowing(true);
					setIsLoading(true);
				}}/>
			</div>
			<div id="loading" style={{display: isShowing ? 'flex' : 'none'}}>
				<div id="message-box">
					<span id="loading-message">{message}</span>
					<img id="loading-gif" src={loading} height={40} width={40} style={{marginTop: 10, display: isLoading ? 'block' : 'none'}} />
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

export default Home;

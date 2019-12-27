import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './routes/login';
import Home from './routes/home';
import {BrowserRouter, Switch, Route, useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';

const ProtectedHome = () => {
	const [cookies, setCookie] = useCookies('authorization');
	let history = useHistory();

	if(cookies.authorization){
		const now = new Date().getTime();
		const jwt = cookies.authorization.iat + cookies.authorization.exp;

		return now < jwt ? <Home /> : <Login />
	}
	if(global.load){
		const now = new Date().getTime();
		const jwt = global.load.iat + global.load.exp;

		return now < jwt ? <Home /> : <Login />
	}
	history.push('/')
	return <Login />
}

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={()=><Login/>} />
			<Route path="/home" exact component={()=><ProtectedHome />} />
		</Switch>
	</BrowserRouter>
	, document.getElementById('root'));

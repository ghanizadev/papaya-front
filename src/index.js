import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './routes/login';
import Home from './routes/home';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/login" exact component={()=><Login/>} />
			<Route path="/home" exact component={()=><Home />} />
		</Switch>
	</BrowserRouter>
	, document.getElementById('root'));

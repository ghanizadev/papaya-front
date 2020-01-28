import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './routes/login';
import Home from './routes/home';
import WaitingListEndpoint from './routes/home/tables/endpoints/waitinglist';
import OpenTableEndpoint from './routes/home/tables/endpoints/open';
import AddEndpoint from './routes/home/tables/endpoints/add';
import {Checkout} from './routes/components/overlay';
import {BrowserRouter, Switch, Route, useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import { Provider } from './context';


const ProtectedHome = () => {
	const [cookies] = useCookies('authorization');
	let history = useHistory();

	if(cookies.authorization && cookies.authorization.access_token){
		return <Home />;
	}
	else if(global.load && global.access_token){
		return <Home />;
	}
	history.push('/');
	return <Login />;
};

ReactDOM.render(
	<div onKeyDown={e => {/*window.alert(e.target.value);*/}} tabIndex='0'>
		<BrowserRouter>
			<Switch>
				<Provider>
					<Route path="/" exact component={()=><Login/>} />
					<Route path="/home" exact component={()=><ProtectedHome />} />
					<Route path="/test" exact component={()=><Checkout />} />
					<Route path="/home/tables/list" component={()=><WaitingListEndpoint />} />
					<Route path="/home/tables/open" component={()=><OpenTableEndpoint />} />
					<Route path="/home/tables/add" component={()=><AddEndpoint />} />
				</Provider>
			</Switch>
		</BrowserRouter>
	</div>
	, document.getElementById('root'));

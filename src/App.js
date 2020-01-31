import React from 'react';
import Login from './routes/login';
import Home from './routes/home';
import WaitingListEndpoint from './routes/home/tables/endpoints/waitinglist';
import OpenTableEndpoint from './routes/home/tables/endpoints/open';
import AddEndpoint from './routes/home/tables/endpoints/add';
import {Checkout} from './routes/components/overlay';
import { Router, createMemorySource, createHistory, LocationProvider } from '@reach/router';
import {createHashSource} from 'reach-router-hash-history'
import {useCookies, CookiesProvider} from 'react-cookie';
import { Provider } from './context';

import '../src/assets/style.css';

let source = createHashSource()
let history = createHistory(source)

const ProtectedHome = () => {
	const [cookies] = useCookies('authorization');

	if(cookies.authorization && cookies.authorization.access_token){
		return <Home />;
	}
	else if(global.load && global.access_token){
		return <Home />;
	}
	return <Login />;
};

const App = () => (
	<div>
		<CookiesProvider>
			<Provider>
				<LocationProvider history={history}>
					<Router>
						<Login path="/" />
						<Home path="home" />
						<WaitingListEndpoint path="list" />
						<OpenTableEndpoint path="open" />
						<AddEndpoint path="add" />
						<Checkout path="test" />
					</Router>
				</LocationProvider>
			</Provider>
		</CookiesProvider>
	</div>
);

export default App;

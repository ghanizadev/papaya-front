import React from 'react';
import { Router, createHistory, LocationProvider } from '@reach/router';
import { createHashSource } from 'reach-router-hash-history';
import Login from './routes/login';
import Home from './routes/home';
import WaitingListEndpoint from './routes/home/tables/endpoints/waitinglist';
import OpenTableEndpoint from './routes/home/tables/endpoints/open';
import AddEndpoint from './routes/home/tables/endpoints/add';
import { Checkout } from './routes/components/overlay';
import { Provider } from './context';

import './assets/style.css';

const source = createHashSource();
const history = createHistory(source);


const App = () => (
  <div>
    <Provider>
      <LocationProvider history={history}>
        <Router>
          <Login path="/" />
          <Home path="/home" />
          <WaitingListEndpoint path="/list" />
          <OpenTableEndpoint path="/open" />
          <AddEndpoint path="/add" />
          <Checkout path="/test" />
        </Router>
      </LocationProvider>
    </Provider>
  </div>
);

export default App;

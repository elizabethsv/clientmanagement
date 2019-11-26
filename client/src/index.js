import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import { setAuthenticationHeader } from './utlities/authenticate';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MaterialUIPickers from './components/pt/add_appts/AddAppt';
import Login from './components/users/Login';
import BaseLayout from './components/dashboard/BaseLayout';
import SchedulePage from './components/pt/schedule/SchedulePage';
import Register from './components/users/Register';
import requireAuth from './requireAuth';
import RouteWithLayout from './RouteWithLayout';
import PublicLayout from './PublicLayout';
import AddClient from './components/pt/clients/AddClients';
import Client from './components/pt/clients/Clients';
import ClientInfo from './components/pt/clients/ClientInfo';
const store = createStore(reducer);

const token = localStorage.getItem('jsonwebtoken');
setAuthenticationHeader(token);
//requireAuth()
console.log(token);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <RouteWithLayout layout={BaseLayout} exact path="/" component={App} />
        <RouteWithLayout
          layout={BaseLayout}
          path="/schedule"
          component={SchedulePage}
        />
        <RouteWithLayout
          layout={BaseLayout}
          path="/addappt"
          component={MaterialUIPickers}
        />
        <RouteWithLayout
          layout={BaseLayout}
          path="/clients"
          component={requireAuth(Client)}
        />
        <RouteWithLayout
          layout={BaseLayout}
          path="/addclient"
          component={requireAuth(AddClient)}
        />
        <RouteWithLayout
          layout={BaseLayout}
          path="/clientinfo/:id"
          component={ClientInfo}
        />
        <RouteWithLayout
          layout={PublicLayout}
          path="/login"
          component={Login}
        />
        <RouteWithLayout
          layout={PublicLayout}
          path="/register"
          component={Register}
        />
      </Switch>
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
